import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Product } from 'src/types';

@Injectable()
export class StoreService {
  constructor(private prisma: PrismaService) {}
  async insert(products: Product[]) {
    await this.prisma.kreamProduct.createMany({ data: products });
  }
}
