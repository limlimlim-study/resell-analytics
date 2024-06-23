interface KreamProduct {
  category: string;
  brand: string;
  rank: number;
  amount: number;
  name: string;
  translatedName: string;
  id: number;
  image: string;
  isBrand: boolean;
  productId: string;
  sales: number;
  scrapedAt: Date;
  style: number;
  url: string;
  wish: number;
}

interface RankingData {
  key: string;
  products: KreamProduct[];
}
