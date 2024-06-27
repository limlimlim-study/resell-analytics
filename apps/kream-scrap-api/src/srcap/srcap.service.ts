import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SrcapService {
  constructor(private prisma: PrismaService) {}

  async findScrapedDataByDateRange(
    category: string,
    start: string,
    end: string,
  ) {
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
}
