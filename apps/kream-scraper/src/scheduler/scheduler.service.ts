import { Injectable, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import LazyPageEvaluator from 'src/scraper/classes/evaluator/lazy_page_evaluator';
import PageEvaluator from 'src/scraper/classes/evaluator/page_evaluator';
import ProductParser from 'src/scraper/classes/parser/product_parser';
import RisingSaleProductParser from 'src/scraper/classes/parser/rising_sale_product_parser';
import { ScraperService } from 'src/scraper/scraper.service';
import { StoreService } from 'src/store/store.service';
import { Category, CategoryCode } from 'src/types';

@Injectable()
export class SchedulerService implements OnModuleInit {
  constructor(
    private scraper: ScraperService,
    private store: StoreService,
  ) {}
  onModuleInit() {
    this.handleScrapCron();
  }
  @Cron(CronExpression.EVERY_30_MINUTES)
  async handleScrapCron() {
    console.time('Complete all scrapes');
    const now = new Date();

    await this.store.insert(
      await this.scraper.scrap(
        `https://kream.co.kr/exhibitions/${CategoryCode.MAN_SHOES}`,
        new ProductParser(new PageEvaluator(), Category.MAN_SHOES, now),
      ),
    );

    await this.store.insert(
      await this.scraper.scrap(
        `https://kream.co.kr/exhibitions/${CategoryCode.MAN_CLOTHES}`,
        new ProductParser(new PageEvaluator(), Category.MAN_CLOTHES, now),
      ),
    );

    await this.store.insert(
      await this.scraper.scrap(
        `https://kream.co.kr/exhibitions/${CategoryCode.WOMEN_SHOES}`,
        new ProductParser(new PageEvaluator(), Category.WOMEN_SHOES, now),
      ),
    );

    await this.store.insert(
      await this.scraper.scrap(
        `https://kream.co.kr/exhibitions/${CategoryCode.WOMEN_CLOTHES}`,
        new ProductParser(new PageEvaluator(), Category.WOMEN_CLOTHES, now),
      ),
    );

    await this.store.insert(
      await this.scraper.scrap(
        `https://kream.co.kr/exhibitions/${CategoryCode.WISHS}`,
        new ProductParser(new PageEvaluator(), Category.WISHS, now),
      ),
    );

    await this.store.insert(
      await this.scraper.scrap(
        `https://kream.co.kr/exhibitions/${CategoryCode.HOT_STYLE}`,
        new ProductParser(new PageEvaluator(), Category.HOT_STYLE, now),
      ),
    );

    await this.store.insert(
      await this.scraper.scrap(
        `https://kream.co.kr/exhibitions/${CategoryCode.ACCESSORIES}`,
        new ProductParser(new PageEvaluator(), Category.ACCESSORIES, now),
      ),
    );

    await this.store.insert(
      await this.scraper.scrap(
        `https://kream.co.kr/exhibitions/${CategoryCode.BAGS}`,
        new ProductParser(new PageEvaluator(), Category.BAGS, now),
      ),
    );

    await this.store.insert(
      await this.scraper.scrap(
        `https://kream.co.kr/exhibitions/${CategoryCode.MAN_SANDALS}`,
        new ProductParser(new PageEvaluator(), Category.MAN_SANDALS, now),
      ),
    );

    await this.store.insert(
      await this.scraper.scrap(
        `https://kream.co.kr/exhibitions/${CategoryCode.WOMEN_SANDALS}`,
        new ProductParser(new PageEvaluator(), Category.WOMEN_SANDALS, now),
      ),
    );

    await this.store.insert(
      await this.scraper.scrap(
        'https://kream.co.kr/?tab=home_ranking',
        new RisingSaleProductParser(
          new LazyPageEvaluator(),
          Category.RISING_SALES,
          now,
        ),
      ),
    );

    console.timeEnd('Complete all scrapes');
  }
}
