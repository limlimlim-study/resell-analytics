import { Page } from 'puppeteer';

class PageEvaluator {
  async eval(page: Page) {
    return await page.evaluate(
      () => document.querySelector('#__layout').innerHTML,
    );
  }
}

export default PageEvaluator;
