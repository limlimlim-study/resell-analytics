export enum Category {
  MAN_SHOES = 'm_shoes',
  MAN_CLOTHES = 'm_clothes',
  MAN_SANDALS = 'm_sandals',
  WOMEN_SHOES = 'w_shoes',
  WOMEN_CLOTHES = 'w_clothes',
  WOMEN_SANDALS = 'w_sandals',
  WISHS = 'wishis',
  HOT_STYLE = 'hot_style',
  ACCESSORIES = 'accessories',
  BAGS = 'bags',
  RISING_SALES = 'rising_sales',
}

export enum CategoryCode {
  MAN_SHOES = 2487,
  MAN_CLOTHES = 2489,
  MAN_SANDALS = 2573,
  WOMEN_SHOES = 2488,
  WOMEN_CLOTHES = 2490,
  WOMEN_SANDALS = 2571,
  WISHS = 2492,
  HOT_STYLE = 2575,
  ACCESSORIES = 2570,
  BAGS = 3326,
}

export interface Product {
  category: string;
  productId: string;
  rank: number;
  brand: string;
  name: string;
  translatedName: string;
  amount: number;
  url: string;
  wish: number;
  style: number;
  sales: number;
  image: string;
  time: number;
  isBrand: boolean;
}
