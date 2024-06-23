import { Module } from '@nestjs/common';
import { SrcapService } from './srcap.service';
import { SrcapController } from './srcap.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [SrcapController],
  providers: [SrcapService, PrismaService],
})
export class SrcapModule {}
