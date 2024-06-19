import { Injectable } from '@nestjs/common';

@Injectable()
export class ScraperService {
  async scrap(category: string, url: string, time: number) {
    return this.scrapProducts(category, url, time);
  }

  private async scrapProducts(category, url, time, retry = 0) {
    console.log(category, url, time, retry);
  }
}
