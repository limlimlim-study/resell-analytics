"use client";

import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import Slider from "rc-slider";
import useSearch from "../hooks/useRanking";
import { Button } from "@/components/ui/button";
import useRanking from "../hooks/useRanking";

import "rc-slider/assets/index.css";

const TimeSlider = () => {
  const { currentTime, setTime } = useRanking();
  const { rankingGroup } = useSearch();
  const [minMax, setMinMax] = useState([0, 0]);

  const sliderMarks = useMemo(() => {
    return rankingGroup.reduce((acc: any, item, i) => {
      const date = new Date(item.key);
      acc[item.value] = {
        style: {
          marginTop: 5,
          transform: "rotate(45deg)",
        },
        label: i % 5 === 0 ? format(date, "HH:mm") : " ",
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
    <div className="gap-10 h-[100px] mb-[20px] ">
      <div className="h-[30px] font-bold text-slate-400 text-xl">
        {currentTime && format(currentTime, "yyyy-MM-dd HH:mm")}
      </div>
      <div className="flex gap-[50px]">
        <div className="w-full">
          <Slider
            value={currentTime}
            dotStyle={{ display: "none" }}
            min={minMax[0]}
            max={minMax[1]}
            step={null}
            marks={sliderMarks}
            onChange={onChange}
          />
        </div>
        <Button disabled={rankingGroup.length === 0}>재생</Button>
      </div>
    </div>
  );
};

export default TimeSlider;
