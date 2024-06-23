import { Page } from 'puppeteer';
import PageEvaluator from '../evaluator/page_evaluator';
import * as cheerio from 'cheerio';
import { extractNumbers } from 'src/utils/utils';
import { Product } from 'src/types';
import ProductParser from './product_parser';

class RisingSaleProductParser extends ProductParser {
  constructor(
    protected evaluator: PageEvaluator,
    protected _category: string,
    protected _date: Date,
  ) {
    super(evaluator, _category, _date);
  }

  async parse(page: Page): Promise<Product[]> {
    const contents = await this.evaluator.eval(page);
    const $ = cheerio.load(contents);
    const $items = $(
      '.product_list.list_first.vertical_product_collection .product_item',
    );

    if (!$items.length) {
      throw new Error(`[ ${this._category} ] No content found.`);
    }

    const result: Product[] = Array.from($items).map((item) => {
      const $item = $(item);
      const href = $item.find('a').first().attr('href');
      const productId = href.split('/').pop();
      const rank = parseInt($item.find('.tag_text').text());
      const brand = String($item.find('.brand-text').text()).trim();
      const name = String($item.find('.name').text()).trim();
      const translatedName = '';
      const amount = parseInt($item.find('.price .num').text());
      const wish = 0;
      const style = 0;
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

export default RisingSaleProductParser;
