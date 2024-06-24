"use client";

import { use, useContext, useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import Slider from "rc-slider";
import useSearch from "../hooks/useRanking";
import { Button } from "@/components/ui/button";
import useRanking from "../hooks/useRanking";

import "rc-slider/assets/index.css";

const TimeSlider = () => {
  const { setTime } = useRanking();
  const { rankingData } = useSearch();
  const [minMax, setMinMax] = useState([0, 0]);

  const labelStyles = useMemo(() => {
    return {
      mt: "4",
      ml: "-2.5",
      fontSize: 11,
      transform: "rotate(45deg)",
    };
  }, []);

  const sliderMarks = useMemo(() => {
    return rankingData.reduce((acc: any, item, i) => {
      const date = new Date(item.key);
      acc[item.value] = {
        style: {
          marginTop: 5,
          transform: "rotate(45deg)",
        },
        label: i % 3 === 0 ? format(date, "hh:mm") : " ",
      };
      return acc;
    }, {});
  }, [rankingData]);

  const onChange = (value: number | number[]) => {
    setTime(value);
  };

  useEffect(() => {
    if (!rankingData.length) return;
    const values = rankingData.map((data: RankingData) => data.value);
    setMinMax([Math.min(...values), Math.max(...values)]);
  }, [rankingData]);

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
      <Button disabled={rankingData.length === 0}>재생</Button>
    </div>
  );
};

export default TimeSlider;
