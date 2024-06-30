export interface KreamProduct {
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

export interface RankingGroup {
  key: string;
  value: number;
  index: number;
  products: KreamProduct[];
}

export interface Ranker {
  rank: number;
  brand: string;
  name: string;
  translatedName: string;
  id: number;
  image: string;
  productId: string;
  url: string;
}

export enum Category {
  MAN_SHOES = "m_shoes",
  MAN_CLOTHES = "m_clothes",
  MAN_SANDALS = "m_sandals",
  WOMEN_SHOES = "w_shoes",
  WOMEN_CLOTHES = "w_clothes",
  WOMEN_SANDALS = "w_sandals",
  WISHS = "wishs",
  HOT_STYLE = "hot_style",
  ACCESSORIES = "accessories",
  BAGS = "bags",
  RISING_SALES = "rising_sales",
}
