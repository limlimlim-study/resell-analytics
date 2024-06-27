"use client";

import { useEffect, useMemo, useState } from "react";
import { format, addHours } from "date-fns";
import { ko } from "date-fns/locale";
import Slider from "rc-slider";
import useSearch from "../hooks/useRanking";
import { Button } from "@/components/ui/button";
import useRanking from "../hooks/useRanking";

import "rc-slider/assets/index.css";

const TimeSlider = () => {
  const { setTime } = useRanking();
  const { rankingGroup } = useSearch();
  const [minMax, setMinMax] = useState([0, 0]);

  const sliderMarks = useMemo(() => {
    return rankingGroup.reduce((acc: any, item, i) => {
      const date = new Date(item.key);
      const adjustedDate = addHours(date, -9); // 9시간을 더해 한국 시간으로 보정
      acc[item.value] = {
        style: {
          marginTop: 5,
          transform: "rotate(45deg)",
        },
        label:
          i % 5 === 0 ? format(adjustedDate, "HH:mm", { locale: ko }) : " ",
      };
      return acc;
    }, {});
  }, [rankingGroup]);

  const onChange = (value: number | number[]) => {
    setTime(value as number);
  };

  useEffect(() => {
    if (!rankingGroup.length) return;
    const values = rankingGroup.map((data: RankingGroup) => data.value);
    setMinMax([Math.min(...values), Math.max(...values)]);
  }, [rankingGroup]);

  return (
    <div className="flex gap-10 h-[100px] mt-[30px]">
      <div className="w-full">
        <Slider
          dots
          min={minMax[0]}
          max={minMax[1]}
          step={null}
          marks={sliderMarks}
          onChange={onChange}
        />
      </div>
      <Button disabled={rankingGroup.length === 0}>재생</Button>
    </div>
  );
};

export default TimeSlider;
