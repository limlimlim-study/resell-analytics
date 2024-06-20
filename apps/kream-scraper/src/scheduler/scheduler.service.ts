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
    console.time('Complete all scrapes');
    const now = Date.now();

    await this.scraper.scrap(
      `https://kream.co.kr/exhibitions/${CategoryCode.MAN_SHOES}`,
      new ProductParser(new PageEvaluator(), Category.MAN_SHOES, now),
    );

    await this.scraper.scrap(
      `https://kream.co.kr/exhibitions/${CategoryCode.MAN_CLOTHES}`,
      new ProductParser(new PageEvaluator(), Category.MAN_CLOTHES, now),
    );

    await this.scraper.scrap(
      `https://kream.co.kr/exhibitions/${CategoryCode.WOMEN_SHOES}`,
      new ProductParser(new PageEvaluator(), Category.WOMEN_SHOES, now),
    );

    await this.scraper.scrap(
      `https://kream.co.kr/exhibitions/${CategoryCode.WOMEN_CLOTHES}`,
      new ProductParser(new PageEvaluator(), Category.WOMEN_CLOTHES, now),
    );

    await this.scraper.scrap(
      `https://kream.co.kr/exhibitions/${CategoryCode.WOMEN_SANDALS}`,
      new ProductParser(new PageEvaluator(), Category.WOMEN_SANDALS, now),
    );

    await this.scraper.scrap(
      `https://kream.co.kr/exhibitions/${CategoryCode.WISHS}`,
      new ProductParser(new PageEvaluator(), Category.WISHS, now),
    );

    await this.scraper.scrap(
      `https://kream.co.kr/exhibitions/${CategoryCode.HOT_STYLE}`,
      new ProductParser(new PageEvaluator(), Category.HOT_STYLE, now),
    );

    await this.scraper.scrap(
      `https://kream.co.kr/exhibitions/${CategoryCode.ACCESSORIES}`,
      new ProductParser(new PageEvaluator(), Category.ACCESSORIES, now),
    );

    await this.scraper.scrap(
      `https://kream.co.kr/exhibitions/${CategoryCode.BAGS}`,
      new ProductParser(new PageEvaluator(), Category.BAGS, now),
    );

    await this.scraper.scrap(
      `https://kream.co.kr/exhibitions/${CategoryCode.MAN_SANDALS}`,
      new ProductParser(new PageEvaluator(), Category.MAN_SANDALS, now),
    );

    await this.scraper.scrap(
      `https://kream.co.kr/exhibitions/${CategoryCode.WOMEN_SANDALS}`,
      new ProductParser(new PageEvaluator(), Category.WOMEN_SANDALS, now),
    );

    console.timeEnd('Complete all scrapes');
  }
}
