"use client";

import React, { createContext, useState, ReactElement } from "react";
import { DateRange } from "react-day-picker";

interface RankingContextType {
  rankingData: RankingData[];
  search: (category: string, dateRange: DateRange) => Promise<void>;
}

export const RankingContext = createContext<RankingContextType | null>(null);

export const RankingProvider = ({ children }: { children: ReactElement }) => {
  const [rankingData, setRankingData] = useState([]);
  const search = async (category: string, dateRange: DateRange) => {
    const response = await fetch(
      `api/ranking?category=${category}&startTime=${dateRange.from?.toISOString()}&endTime=${dateRange.to?.toISOString()}`
    );
    const result: any[] = await response.json();
    const sortedList = result.reduce((acc, item) => {
      const group = acc.find((i: any) => i.key === item.scrapedAt);
      if (group) {
        group.products.push(item);
      } else {
        const g = { key: item.scrapedAt, products: [] };
        acc.push(g);
      }
      return acc;
    }, []);

    setRankingData(sortedList);
  };

  return (
    <RankingContext.Provider
      value={{
        rankingData,
        search,
      }}
    >
      {children}
    </RankingContext.Provider>
  );
};
