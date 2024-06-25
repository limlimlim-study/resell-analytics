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
  scrapedAt: string;
  style: number;
  url: string;
  wish: number;
}

interface RankingGroup {
  key: string;
  value: number;
  products: KreamProduct[];
}

interface Ranker {
  rank: number;
  brand: string;
  name: string;
  translatedName: string;
  id: number;
  image: string;
  productId: string;
}
