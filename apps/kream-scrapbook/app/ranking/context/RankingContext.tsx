"use client";

import { addHours } from "date-fns";
import React, {
  createContext,
  useState,
  ReactElement,
  useEffect,
  useCallback,
} from "react";
import { DateRange } from "react-day-picker";

interface RankingContextType {
  rankingData: KreamProduct[];
  rankingGroup: RankingGroup[];
  currentProducts: KreamProduct[];
  prevProducts: KreamProduct[];
  search: (category: string, dateRange: DateRange) => Promise<void>;
  setTime: (value: number) => void;
}

export const RankingContext = createContext<RankingContextType | null>(null);

export const RankingProvider = ({ children }: { children: ReactElement }) => {
  const [rankingGroup, setRankingGroup] = useState<RankingGroup[]>([]);
  const [rankingData, setRankingData] = useState<KreamProduct[]>([]);
  const [currentProducts, setCurrnetProducts] = useState<KreamProduct[]>([]);
  const [prevProducts, setPrevProducts] = useState<KreamProduct[]>([]);

  const search = async (category: string, dateRange: DateRange) => {
    const from = dateRange.from!;
    const to = dateRange.to!;
    console.log("from : ", from.toDateString, from?.toISOString());
    console.log("to : ", to.toDateString(), to.toISOString());
    console.log("----------");

    const response = await fetch(
      `api/ranking?category=${category}&startTime=${from.toISOString()}&endTime=${to.toISOString()}`
    );
    const result: KreamProduct[] = await response.json();
    setRankingData(result);
    const groupedList = getGroupedData(result);
    console.log(groupedList);
    groupedList.forEach((data: RankingGroup) => {
      data.products.sort((a: KreamProduct, b: KreamProduct) => a.rank - b.rank);
    });

    setRankingGroup(groupedList);
    setCurrnetProducts(groupedList[0].products);
  };

  const getGroupedData = (products: KreamProduct[]) => {
    return products.reduce<RankingGroup[]>((acc, item: KreamProduct) => {
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
  };

  const setTime = useCallback(
    (value: number) => {
      console.log(
        "setTime : ",
        rankingGroup.find((data) => data.value === value)
      );
      const current = rankingGroup.find((data) => data.value === value);
      if (!current) return;
      if (currentProducts) {
        setPrevProducts(currentProducts);
      }
      setCurrnetProducts(current.products);
    },
    [currentProducts, rankingGroup]
  );

  useEffect(() => {
    if (!rankingGroup || !rankingGroup.length) return;
    // setTime(rankingGroup[0].value);
  }, [rankingGroup, setTime]);

  return (
    <RankingContext.Provider
      value={{
        rankingData,
        rankingGroup,
        currentProducts,
        prevProducts,
        search,
        setTime,
      }}
    >
      {children}
    </RankingContext.Provider>
  );
};
