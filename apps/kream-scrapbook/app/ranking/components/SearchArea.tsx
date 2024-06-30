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
  },
  {
    name: "여성 신발 인기 순위",
    code: Category.WOMEN_SHOES,
  },
  {
    name: "남성 의류 인기 순위",
    code: Category.MAN_CLOTHES,
  },
  {
    name: "여성 의류 인시 순위",
    code: Category.WOMEN_CLOTHES,
  },
  {
    name: "남성 샌들 인기 순위",
    code: Category.MAN_SANDALS,
  },
  {
    name: "여성 샌들 인기 순위",
    code: Category.WOMEN_SANDALS,
  },
  {
    name: "관심 상품 순위",
    code: Category.WISHS,
  },
  {
    name: "스타일 최고 인기!",
    code: Category.HOT_STYLE,
  },
  {
    name: "액세서리 인기 순위 ",
    code: Category.ACCESSORIES,
  },
  {
    name: "가방 인기 순위 ",
    code: Category.BAGS,
  },
  {
    name: "지금 많이 거래되는 상품",
    code: Category.RISING_SALES,
  },
];

const SearchArea = () => {
  const [dateRange, setDateRange] = useState<DateRange>();
  const [category, setCategory] = useState<Category>();
  const [enableSearch, setEnableSearch] = useState<boolean>();
  const { search, isLoading } = useSearch();

  const onClickSearch = () => {
    if (!category) return;
    if (!dateRange) return;
    search(category, dateRange);
  };

  const seelctItems = useMemo(() => {
    return productCategories.map((category) => (
      <SelectItem
        key={category.code}
        value={category.code}
        className="text-[12px]"
      >
        {category.name}
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

  return (
    <Card className="p-3 flex justify-between">
      <div className="flex gap-3">
        <Select
          onValueChange={(value: string) => {
            setCategory(value as Category);
          }}
        >
          <SelectTrigger className="w-[180px] text-[12px]">
            <SelectValue placeholder="카테고리" />
          </SelectTrigger>
          <SelectContent>{seelctItems}</SelectContent>
        </Select>
        <DatePickerWithRange onSelectRange={onSelectRange} />
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
