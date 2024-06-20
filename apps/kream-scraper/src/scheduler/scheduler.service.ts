import { Injectable, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import PageEvaluator from 'src/scraper/classes/page_evaluator';
import ProductParser from 'src/scraper/classes/product_Parser';
import { ScraperService } from 'src/scraper/scraper.service';
import { Category, CategoryCode } from 'src/types';

@Injectable()
export class SchedulerService implements OnModuleInit {
  constructor(private scraper: ScraperService) {}
  onModuleInit() {
    this.handleScrapCron();
  }
  @Cron(CronExpression.EVERY_30_MINUTES)
  async handleScrapCron() {
    const now = Date.now();

    await this.scraper.scrap(
      `https://kream.co.kr/exhibitions/${CategoryCode.MAN_SHOES}`,
      new ProductParser(new PageEvaluator(), Category.MAN_SHOES, now),
    );
  }
}
