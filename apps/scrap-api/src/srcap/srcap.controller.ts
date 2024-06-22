import {
  BadRequestException,
  Controller,
  Get,
  Logger,
  Query,
} from '@nestjs/common';
import { SrcapService } from './srcap.service';
import * as dayjs from 'dayjs';

@Controller('scrap')
export class SrcapController {
  private logger = new Logger();
  constructor(private readonly srcapService: SrcapService) {}

  @Get()
  findScrapedDataByDateRange(
    @Query('startTime') startTime: string,
    @Query('endTime') endTime: string,
  ) {
    const start = dayjs(startTime).startOf('day');
    const end = dayjs(endTime).endOf('day');
    const diffInDays = end.diff(start, 'day');
    if (diffInDays > 30) {
      throw new BadRequestException(
        'The date range should not exceed 30 days.',
      );
    }

    this.logger.debug(`Find by date range : ${startTime} ~ ${endTime}`);
    return this.srcapService.findScrapedDataByDateRange(
      start.toDate(),
      end.toDate(),
    );
  }

  @Get('migrate')
  migrateTimeToScrapedAt() {
    return this.srcapService.migratioTimeToScrapedAt();
  }
}
