import { Injectable, Logger } from '@nestjs/common';
import puppeteer from 'puppeteer-extra';
import * as cheerio from 'cheerio';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import ProductParser from './classes/parser/product_parser';

puppeteer.use(StealthPlugin());
@Injectable()
export class ScraperService {
  private readonly logger = new Logger(ScraperService.name);
  private readonly pageRenderingTimeout = 60000;
  private readonly maxRetry = 10;
  // private readonly userAgent =
  //   'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';
  private readonly userAgent =
    'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Mobile/15E148 Safari/604.1';

  async scrap(url: string, parser: ProductParser) {
    return this.scrapProducts(url, parser);
  }

  private async scrapProducts(url, parser: ProductParser, retry = 0) {
    this.logger.verbose(`[ ${parser.category} ] Scraping in progress.`);
    const browser = await puppeteer.launch({
      headless: false,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--disable-software-rasterizer',
        '--disable-features=site-per-process',
        '--window-size=1280x1024',
      ],
      // args: [
      //   '--no-sandbox',
      //   '--disable-setuid-sandbox',
      //   '--disable-web-security',
      //   '--disable-features=IsolateOrigins,site-per-process',
      // ],
    });
    try {
      this.logger.debug(url);
      const page = await browser.newPage();
      await page.setUserAgent(this.userAgent);
      await page.evaluateOnNewDocument(() => {
        Object.defineProperty(navigator, 'webdriver', {
          get: () => false,
        });
      });
      await page.setExtraHTTPHeaders({
        'accept-language': 'en-US,en;q=0.9',
        'accept-encoding': 'gzip, deflate, br',
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      });

      await page.evaluateOnNewDocument(() => {
        Object.defineProperty(navigator, 'webdriver', { get: () => false });
        window['chrome'] = { runtime: {} };
        Object.defineProperty(navigator, 'languages', {
          get: () => ['en-US', 'en'],
        });
        Object.defineProperty(navigator, 'plugins', {
          get: () => [1, 2, 3, 4, 5],
        });
      });

      await page.setRequestInterception(true);
      page.on('request', (request) => {
        const headers = request.headers();
        headers['user-agent'] =
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
        headers['accept-language'] = 'en-US,en;q=0.9';
        headers['accept-encoding'] = 'gzip, deflate, br';
        headers['accept'] =
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8';
        request.continue({ headers });
      });

      await page.goto(url, {
        // waitUntil: 'networkidle0',
        // referrerPolicy: ''
        waitUntil: 'load',
        timeout: this.pageRenderingTimeout,
      });

      const contents = await page.evaluate(() => document.body.innerHTML);
      this.logger.debug(contents);
      // const result = await parser.parse(page);
      this.logger.verbose(`[ ${parser.category} ] Scraping complete.`);
      // return result;
    } catch (e) {
      this.logger.error(`[ ${parser.category} ] : ${e.toString()}`);
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
