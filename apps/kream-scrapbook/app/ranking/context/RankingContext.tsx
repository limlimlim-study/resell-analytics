"use client";

import { addHours, differenceInDays, endOfDay, startOfDay } from "date-fns";
import React, {
  createContext,
  useState,
  ReactElement,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { DateRange } from "react-day-picker";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    const from = startOfDay(dateRange.from!);
    const to = endOfDay(dateRange.to!);
    const diffDays = Math.abs(differenceInDays(from, to));

    if (diffDays >= 3) {
      toast.warn("조회 기간은 3일을 초과할 수 없습니다.");
      return;
    }

    const response = await fetch(
      `api/ranking?category=${category}&startTime=${from.toISOString()}&endTime=${to.toISOString()}`
    );
    const result: KreamProduct[] = await response.json();
    setRankingData(result);
    const groupedList = getGroupedData(result);
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
      const current = rankingGroup.find((data) => data.value === value);
      if (!current) return;
      if (currentProducts) {
        setPrevProducts(currentProducts);
      }
      setCurrnetProducts(current.products);
    },
    [currentProducts, rankingGroup]
  );

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
      <ToastContainer className="text-sm" autoClose={5000} />
    </RankingContext.Provider>
  );
};
