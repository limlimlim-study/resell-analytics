import { Injectable, Logger } from '@nestjs/common';
import puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';

@Injectable()
export class ScraperService {
  private readonly logger = new Logger(ScraperService.name);
  private readonly pageRenderingTimeout = 60000;
  private readonly maxRetry = 10;

  async scrap(category: string, url: string, time: number) {
    return this.scrapProducts(category, url, time);
  }

  private async scrapProducts(category, url, time, retry = 0) {
    this.logger.verbose(`[ ${category} ] Scraping in progress.`);
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
    );

    try {
      await page.goto(url, {
        waitUntil: 'networkidle0',
        timeout: this.pageRenderingTimeout,
      });

      await page.waitForSelector('.exhibition_product');

      const contents = await page.evaluate(
        () => document.querySelector('#__layout').innerHTML,
      );
      const $ = cheerio.load(contents);
      const $items = $('.exhibition_product');

      if (!$items.length) {
        throw new Error(`[${category}] No content found.`);
      }

      const extractNumbers = (input) => {
        if (!input) return 0;
        const numbers = input.match(/\d+/g);
        return numbers ? parseFloat(numbers.join('')) : 0;
      };

      const result = Array.from($items).map((item) => {
        const $item = $(item);
        const href = $item.find('a').first().attr('href');
        const productId = href.split('/').pop();
        const rank = parseInt($item.find('.tag_text').text());
        const brand = String($item.find('.product_info_brand').text()).trim();
        const name = String($item.find('.name').text()).trim();
        const translatedName = String(
          $item.find('.translated_name').text(),
        ).trim();
        const amount = parseInt($item.find('.amount').text());
        const wish = extractNumbers($item.find('.wish_figure .text').text());
        const style = extractNumbers($item.find('.review_figure .text').text());
        const sales = extractNumbers($item.find('.status_value').text());
        const image = $item.find('.image').attr('src');
        const url = `https://kream.co.kr${href}`;
        const isBrand = !!$item.find('.ico-brand-official').length;

        return {
          productId,
          rank,
          brand,
          name,
          translatedName,
          amount,
          wish,
          style,
          sales,
          image,
          url,
          isBrand,
          time,
        };
      });
      this.logger.verbose(`[ ${category} ] Scraping complete.`);
      return result;
    } catch (e) {
      this.logger.error(e);
      this.logger.verbose(`[ ${category} ] Retry ${retry}.`);
      return;
    } finally {
      await browser.close();
    }
  }
}
