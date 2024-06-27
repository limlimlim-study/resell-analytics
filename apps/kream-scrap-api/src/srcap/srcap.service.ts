import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SrcapService {
  constructor(private prisma: PrismaService) {}

  async findScrapedDataByDateRange(category: string, start: Date, end: Date) {
    const result = await this.prisma.kreamProduct.findMany({
      where: {
        scrapedAt: {
          gte: start.toISOString(),
          lte: end.toISOString(),
        },
        category,
      },
      orderBy: {
        scrapedAt: 'asc',
      },
    });
    return result;
  }
}
