import { Page } from 'puppeteer';
import { wait } from 'src/utils/utils';
import PageEvaluator from './page_evaluator';

class LazyPageEvaluator extends PageEvaluator {
  async eval(page: Page) {
    const pageHeight = await page.evaluate(() => document.body.scrollHeight);
    await page.evaluate((height) => {
      window.scrollTo(0, height);
    }, pageHeight);

    await wait(10000);

    return await page.evaluate(
      () => document.querySelector('#__layout').innerHTML,
    );
  }
}

export default LazyPageEvaluator;
