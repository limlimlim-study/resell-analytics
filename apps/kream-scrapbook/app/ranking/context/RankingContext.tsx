"use client";

import React, { createContext, useState, ReactElement } from "react";
import { DateRange } from "react-day-picker";

interface RankingContextType {
  rankingData: any[];
  search: (category: string, dateRange: DateRange) => Promise<void>;
}

export const RankingContext = createContext<RankingContextType | null>(null);

export const RankingProvider = ({ children }: { children: ReactElement }) => {
  const [rankingData, setRankingData] = useState([]);
  const search = async (category: string, dateRange: DateRange) => {
    const result = await fetch(
      `api/ranking?category=${category}&startTime=${dateRange.from?.toISOString()}&endTime=${dateRange.to?.toISOString()}`
    );
    console.log(await result.json());
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
