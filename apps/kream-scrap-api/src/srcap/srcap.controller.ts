import {
  BadRequestException,
  Controller,
  Get,
  Logger,
  Param,
  Query,
} from '@nestjs/common';
import { SrcapService } from './srcap.service';
import * as dayjs from 'dayjs';

@Controller('scrap')
export class SrcapController {
  private logger = new Logger(SrcapController.name);
  constructor(private readonly srcapService: SrcapService) {}

  @Get(':category')
  findScrapedDataByDateRange(
    @Param('category') category: string,
    @Query('startTime') startTime: string,
    @Query('endTime') endTime: string,
  ) {
    const start = dayjs(startTime).startOf('day');
    const end = dayjs(endTime).endOf('day');
    const diffInDays = end.diff(start, 'day');
    if (diffInDays > 3) {
      throw new BadRequestException('The date range should not exceed 3 days.');
    }

    this.logger.debug(
      `[ ${category} ] Find by date range : ${startTime} ~ ${endTime}`,
    );
    return this.srcapService.findScrapedDataByDateRange(
      category,
      startTime,
      endTime,
    );
  }
}
