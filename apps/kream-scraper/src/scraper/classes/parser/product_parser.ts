import { Page } from 'puppeteer';
import PageEvaluator from '../evaluator/page_evaluator';
import * as cheerio from 'cheerio';
import { extractNumbers } from 'src/utils/utils';
import { Product } from 'src/types';

class ProductParser {
  get category() {
    return this._category;
  }

  constructor(
    protected evaluator: PageEvaluator,
    protected _category: string,
    protected _date: Date,
  ) {}

  async parse(page: Page): Promise<Product[]> {
    const contents = await this.evaluator.eval(page);
    const $ = cheerio.load(contents);
    const $items = $('.exhibition_product');

    if (!$items.length) {
      throw new Error(`[ ${this._category} ] No content found.`);
    }

    const result: Product[] = Array.from($items).map((item) => {
      const $item = $(item);
      const href = $item.find('a').first().attr('href');
      const productId = href.split('/').pop();
      const rank = parseInt($item.find('.tag_text').text());
      const brand = String($item.find('.product_info_brand').text()).trim();
      const name = String($item.find('.name').text()).trim();
      const translatedName = String(
        $item.find('.translated_name').text(),
      ).trim();
      const amount = extractNumbers($item.find('.amount').text());
      const wish = extractNumbers($item.find('.wish_figure .text').text());
      const style = extractNumbers($item.find('.review_figure .text').text());
      const sales = extractNumbers($item.find('.status_value').text());
      const image = $item.find('.image').attr('src');
      const url = `https://kream.co.kr${href}`;
      const isBrand = !!$item.find('.ico-brand-official').length;

      return {
        category: this._category,
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
        scrapedAt: this._date,
      };
    });

    return result;
  }
}

export default ProductParser;
