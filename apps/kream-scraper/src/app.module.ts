import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SchedulerService } from './scheduler/scheduler.service';
import { ScraperService } from './scraper/scraper.service';
import { StoreService } from './store/store.service';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    SchedulerService,
    ScraperService,
    StoreService,
  ],
})
export class AppModule {}
