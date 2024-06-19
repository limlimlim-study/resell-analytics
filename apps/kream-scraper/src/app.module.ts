import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SchedulerService } from './scheduler/scheduler.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, SchedulerService],
})
export class AppModule {}
