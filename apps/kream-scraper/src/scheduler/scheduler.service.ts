import { Injectable, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import PageEvaluator from 'src/scraper/classes/page_evaluator';
import ProductParser from 'src/scraper/classes/product_Parser';
import { ScraperService } from 'src/scraper/scraper.service';

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
      'https://kream.co.kr/exhibitions/2487',
      new ProductParser(new PageEvaluator(), 'm_shoes', now),
    );
  }
}
