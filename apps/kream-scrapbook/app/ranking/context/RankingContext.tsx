"use client";

import React, { createContext, useState, ReactElement } from "react";
import { DateRange } from "react-day-picker";

interface RankingContextType {
  rankingData: RankingData[];
  currentProducts: KreamProduct[];
  search: (category: string, dateRange: DateRange) => Promise<void>;
  setTime: (value: number) => void;
}

export const RankingContext = createContext<RankingContextType | null>(null);

export const RankingProvider = ({ children }: { children: ReactElement }) => {
  const [rankingData, setRankingData] = useState<RankingData[]>([]);
  const [currentProducts, setCurrnetProducts] = useState<KreamProduct[]>([]);

  const search = async (category: string, dateRange: DateRange) => {
    const response = await fetch(
      `api/ranking?category=${category}&startTime=${dateRange.from?.toISOString()}&endTime=${dateRange.to?.toISOString()}`
    );
    const result: any[] = await response.json();
    const sortedList = result.reduce((acc, item) => {
      let group = acc.find((i: any) => i.key === item.scrapedAt);
      if (!group) {
        group = {
          key: item.scrapedAt,
          value: new Date(item.scrapedAt).getTime(),
          products: [],
        };
        acc.push(group);
      }
      group.products.push(item);
      return acc;
    }, []);
    sortedList.forEach((data: RankingData) => {
      data.products.sort((a: KreamProduct, b: KreamProduct) => a.rank - b.rank);
    });
    setRankingData(sortedList);
  };

  const setTime = (value: number) => {
    const current = rankingData.find((data) => data.value === value);
    if (!current) return;
    setCurrnetProducts(current.products);
  };

  return (
    <RankingContext.Provider
      value={{
        rankingData,
        currentProducts,
        search,
        setTime,
      }}
    >
      {children}
    </RankingContext.Provider>
  );
};
