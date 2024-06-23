import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SrcapService {
  constructor(private prisma: PrismaService) {}

  async findScrapedDataByDateRange(category: string, start: Date, end: Date) {
    const result = await this.prisma.kreamProduct.findMany({
      where: {
        scrapedAt: {
          gte: start,
          lte: end,
        },
        category,
      },
      orderBy: {
        scrapedAt: 'asc',
      },
    });
    return result;
  }

  async migratioTimeToScrapedAt() {
    try {
      const products = await this.prisma.kreamProduct.findMany();
      for (const product of products) {
        console.log(Number(product.time));
        const scrapedAtDate = dayjs(Number(product.time)).toDate();
        await this.prisma.kreamProduct.update({
          where: { id: product.id },
          data: {
            scrapedAt: scrapedAtDate,
          },
        });
      }
      console.log('Migration completed successfully.');
    } catch (error) {
      console.error('Error migrating data:', error);
    }
  }
}
