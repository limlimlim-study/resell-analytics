"use client";

import { differenceInDays, endOfDay, startOfDay } from "date-fns";
import React, {
  createContext,
  useState,
  ReactElement,
  useCallback,
  useEffect,
} from "react";
import { DateRange } from "react-day-picker";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

interface RankingContextType {
  rankingData: KreamProduct[];
  rankingGroup: RankingGroup[];
  currentProducts: KreamProduct[];
  currentTime: number;
  isLoading: boolean;
  search: (category: string, dateRange: DateRange) => Promise<void>;
  setTime: (value: number) => void;
  nextTime: () => void;
  prevTime: () => void;
}

export const RankingContext = createContext<RankingContextType | null>(null);

export const RankingProvider = ({ children }: { children: ReactElement }) => {
  const [rankingGroup, setRankingGroup] = useState<RankingGroup[]>([]);
  const [rankingData, setRankingData] = useState<KreamProduct[]>([]);
  const [currentProducts, setCurrentProducts] = useState<KreamProduct[]>([]);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const search = async (category: string, dateRange: DateRange) => {
    setIsLoading(true);
    try {
      const from = startOfDay(dateRange.from!);
      const to = endOfDay(dateRange.to!);
      const diffDays = Math.abs(differenceInDays(from, to));

      if (diffDays > 3) {
        toast.warn("조회 기간은 3일을 초과할 수 없습니다.");
        setIsLoading(false);
        return;
      }

      const response = await fetch(
        `api/ranking?category=${category}&startTime=${from.toISOString()}&endTime=${to.toISOString()}`
      );
      const result: KreamProduct[] = await response.json();
      setRankingData(result);
      const groupedList = getGroupedData(result);
      groupedList.forEach((data: RankingGroup) => {
        data.products.sort(
          (a: KreamProduct, b: KreamProduct) => a.rank - b.rank
        );
      });

      setRankingGroup(groupedList);
      setCurrentProducts(groupedList[0]?.products || []);
      setCurrentIndex(0);
      setCurrentTime(groupedList[0]?.value || 0);
    } catch (e: any) {
      toast.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const getGroupedData = (products: KreamProduct[]) => {
    return products.reduce<RankingGroup[]>(
      (acc, item: KreamProduct, index: number) => {
        let group = acc.find((i: any) => i.key === item.scrapedAt);

        if (!group) {
          group = {
            key: item.scrapedAt,
            value: new Date(item.scrapedAt).getTime(),
            index,
            products: [],
          };
          acc.push(group);
        }
        group.products.push(item);
        return acc;
      },
      []
    );
  };

  const setIndex = useCallback(
    (index: number) => {
      if (index < 0 || index >= rankingGroup.length) return;
      setCurrentIndex(index);
      setCurrentTime(rankingGroup[index].value);
      setCurrentProducts(rankingGroup[index].products);
    },
    [rankingGroup]
  );

  const setTime = useCallback(
    (value: number) => {
      const index = rankingGroup.findIndex((data) => data.value === value);
      if (index === -1) return;
      setIndex(index);
    },
    [rankingGroup, setIndex]
  );

  const nextTime = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      if (newIndex < rankingGroup.length) {
        setCurrentTime(rankingGroup[newIndex].value);
        setCurrentProducts(rankingGroup[newIndex].products);
      }
      return newIndex;
    });
  }, [rankingGroup]);

  const prevTime = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - 1;
      if (newIndex >= 0) {
        setCurrentTime(rankingGroup[newIndex].value);
        setCurrentProducts(rankingGroup[newIndex].products);
      }
      return newIndex;
    });
  }, [rankingGroup]);

  useEffect(() => {
    if (!rankingGroup || rankingGroup.length === 0) return;
    setIndex(0);
  }, [rankingGroup, setIndex]);

  useEffect(() => {
    if (!rankingGroup[currentIndex]) return;
    setTime(rankingGroup[currentIndex].value);
  }, [currentIndex, rankingGroup, setTime]);

  return (
    <RankingContext.Provider
      value={{
        rankingData,
        rankingGroup,
        currentProducts,
        currentTime,
        isLoading,
        search,
        setTime,
        nextTime,
        prevTime,
      }}
    >
      {children}
      <ToastContainer className="text-sm" autoClose={5000} />
    </RankingContext.Provider>
  );
};
