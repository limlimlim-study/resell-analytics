"use client";

import { Card } from "@/components/ui/card";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "./DatePickerWithRange";
import useSearch from "../hooks/useRanking";
import { Category } from "@/types/types";
import { ReloadIcon } from "@radix-ui/react-icons";

const productCategories = [
  {
    name: "남성 신발 인기 순위",
    code: Category.MAN_SHOES,
    decs: "조회, 관심, 거래 급상승",
  },
  {
    name: "여성 신발 인기 순위",
    code: Category.WOMEN_SHOES,
    decs: "조회, 관심, 거래 급상승",
  },
  {
    name: "남성 의류 인기 순위",
    code: Category.MAN_CLOTHES,
    decs: "조회, 관심, 거래 급상승",
  },
  {
    name: "여성 의류 인시 순위",
    code: Category.WOMEN_CLOTHES,
    decs: "조회, 관심, 거래 급상승",
  },
  {
    name: "남성 샌들 인기 순위",
    code: Category.MAN_SANDALS,
    decs: "조회, 관심, 거래 급상승",
  },
  {
    name: "여성 샌들 인기 순위",
    code: Category.WOMEN_SANDALS,
    decs: "조회, 관심, 거래 급상승",
  },
  {
    name: "관심 상품 순위",
    code: Category.WISHS,
    decs: "관심 급상승",
  },
  {
    name: "스타일 최고 인기!",
    code: Category.HOT_STYLE,
    decs: "조회 급상승",
  },
  {
    name: "액세서리 인기 순위 ",
    code: Category.ACCESSORIES,
    decs: "조회, 관심, 거래 급상승",
  },
  {
    name: "가방 인기 순위 ",
    code: Category.BAGS,
    decs: "조회, 관심, 거래 급상승",
  },
  {
    name: "지금 많이 거래되는 상품",
    code: Category.RISING_SALES,
    decs: "거래 급상승",
  },
];

const SearchArea = () => {
  const [dateRange, setDateRange] = useState<DateRange>();
  const [enableSearch, setEnableSearch] = useState<boolean>();
  const [category, setCategory] = useState<Category>();
  const { search, isLoading, currentCategory } = useSearch();
  const [categoryDesc, setCategoryDesc] = useState("");

  const onClickSearch = () => {
    if (!category) return;
    if (!dateRange) return;
    search(category, dateRange);
  };

  const selectItems = useMemo(() => {
    return productCategories.map((category) => (
      <SelectItem key={category.code} value={category.code}>
        <div className="text-[12px]">{category.name}</div>
      </SelectItem>
    ));
  }, []);

  const onSelectRange = useCallback((range: DateRange) => {
    setDateRange(range);
  }, []);

  useEffect(() => {
    setEnableSearch(
      !!(category && dateRange && dateRange.from && dateRange.to)
    );
  }, [category, dateRange]);

  useEffect(() => {
    setCategory(currentCategory);
  }, [currentCategory]);

  useEffect(() => {
    setCategoryDesc(
      productCategories.find((c) => c.code === category)?.decs as string
    );
  }, [category]);

  return (
    <Card className="p-3 flex gap-[20px]">
      <div className="flex gap-3">
        <DatePickerWithRange onSelectRange={onSelectRange} />
        <Select
          value={category}
          onValueChange={(value: string) => {
            setCategory(value as Category);
          }}
        >
          <SelectTrigger className="w-[180px] text-[12px]">
            <SelectValue placeholder="카테고리" />
          </SelectTrigger>
          <SelectContent>{selectItems}</SelectContent>
        </Select>
        {/* <div className="text-[10px] leading-10">{categoryDesc}</div> */}
      </div>
      <Button
        variant="default"
        onClick={onClickSearch}
        disabled={!enableSearch || isLoading}
      >
        {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
        검색
      </Button>
    </Card>
  );
};

export default SearchArea;
