"use client";

import { Card } from "@/components/ui/card";
import React, { useEffect, useMemo, useState } from "react";
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

const productCategories = [
  {
    name: "남성 신발 인기 순위",
    code: "m_shoes",
  },
  {
    name: "여성 신발 인기 순위",
    code: "w_shoes",
  },
  {
    name: "남성 의류 인기 순위",
    code: "m_clothes",
  },
  {
    name: "여성 의류 인시 순위",
    code: "w_clothes",
  },
  {
    name: "남성 샌들 인기 순위",
    code: "m_sandals",
  },
  {
    name: "여성 샌들 인기 순위",
    code: "w_sandals",
  },
  {
    name: "관심 상품 순위",
    code: "wishs",
  },
  {
    name: "스타일 최고 인기!",
    code: "hot_style",
  },
  {
    name: "액세서리 인기 순위 ",
    code: "accessories",
  },
  {
    name: "가방 인기 순위 ",
    code: "bags",
  },
  {
    name: "지금 많이 거래되는 상품",
    code: "rising_sales",
  },
];

const SearchArea = () => {
  const [dateRange, setDateRange] = useState<DateRange>();
  const [category, setCategory] = useState<string>();
  const [enableSearch, setEnableSearch] = useState<boolean>();
  const { search, isLoading } = useSearch();

  const onClickSearch = () => {
    if (!category) return;
    if (!dateRange) return;
    search(category, dateRange);
  };

  const seelctItems = useMemo(() => {
    return productCategories.map((category) => (
      <SelectItem key={category.code} value={category.code}>
        {category.name}
      </SelectItem>
    ));
  }, []);

  useEffect(() => {
    setEnableSearch(
      !!(category && dateRange && dateRange.from && dateRange.to)
    );
  }, [category, dateRange]);

  return (
    <Card className="p-3 flex justify-between">
      <div className="flex gap-3">
        <Select onValueChange={setCategory}>
          <SelectTrigger className="w-[210px]">
            <SelectValue placeholder="카테고리" />
          </SelectTrigger>
          <SelectContent>{seelctItems}</SelectContent>
        </Select>
        <DatePickerWithRange
          onSelectRange={(range: DateRange) => {
            setDateRange(range);
          }}
        />
      </div>
      <Button
        variant="default"
        onClick={onClickSearch}
        disabled={!enableSearch || isLoading}
      >
        검색
      </Button>
    </Card>
  );
};

export default SearchArea;
