import { Injectable, Logger } from '@nestjs/common';
import puppeteer from 'puppeteer';
import ProductParser from './classes/parser/product_parser';

@Injectable()
export class ScraperService {
  private readonly logger = new Logger(ScraperService.name);
  private readonly pageRenderingTimeout = 60000;
  private readonly maxRetry = 10;
  private readonly userAgent =
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';

  async scrap(url: string, parser: ProductParser) {
    return this.scrapProducts(url, parser);
  }

  private async scrapProducts(url, parser: ProductParser, retry = 0) {
    this.logger.verbose(`[ ${parser.category} ] Scraping in progress.`);
    const browser = await puppeteer.launch({ headless: true });
    try {
      const page = await browser.newPage();
      await page.setUserAgent(this.userAgent);
      await page.goto(url, {
        waitUntil: 'networkidle0',
        timeout: this.pageRenderingTimeout,
      });

      const result = await parser.parse(page);
      this.logger.verbose(`[ ${parser.category} ] Scraping complete.`);
      return result;
    } catch (e) {
      const incrementRetry = retry + 1;
      this.logger.error(`[ ${parser.category} ] ${e.toString()}`);
      if (incrementRetry < this.maxRetry) {
        this.logger.verbose(`[ ${parser.category} ] Retry ${incrementRetry}.`);
        return this.scrapProducts(url, parser, incrementRetry);
      } else {
        this.logger.verbose(`[ ${parser.category} ] Scraping fail.`);
      }
    } finally {
      await browser.close();
    }
  }
}
