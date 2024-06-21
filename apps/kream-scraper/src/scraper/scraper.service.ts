import { Injectable, Logger } from '@nestjs/common';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import ProductParser from './classes/parser/product_parser';

puppeteer.use(StealthPlugin());
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
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    browser.userAgent();
    const page = await browser.newPage();
    await page.setUserAgent(this.userAgent);

    try {
      await page.goto(url, {
        waitUntil: 'networkidle0',
        timeout: this.pageRenderingTimeout,
      });

      const result = await parser.parse(page);
      this.logger.verbose(`[ ${parser.category} ] Scraping complete.`);
      return result;
    } catch (e) {
      this.logger.error(`ERROR [ ${parser.category} ] : ${e.toString()}`);
      const incrementRetry = retry + 1;
      if (incrementRetry < this.maxRetry) {
        this.logger.verbose(`[ ${parser.category} ] Retry ${incrementRetry}.`);
        return this.scrapProducts(url, parser, incrementRetry);
      } else {
        this.logger.error(e);
        this.logger.verbose(`[ ${parser.category} ] Scraping fail.`);
      }
    } finally {
      await browser.close();
    }
  }
}
