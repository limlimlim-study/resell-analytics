"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { format } from "date-fns";
import Slider from "rc-slider";
import useSearch from "../hooks/useRanking";
import { Button } from "@/components/ui/button";
import useRanking from "../hooks/useRanking";

import "rc-slider/assets/index.css";
import { RankingGroup } from "@/types/types";
import { Card } from "@/components/ui/card";

const TimeSlider = () => {
  const { currentTime, setTime, nextTime, prevTime } = useRanking();
  const { rankingGroup } = useSearch();
  const [minMax, setMinMax] = useState([0, 0]);
  const [isPlay, setIsPlay] = useState(false);
  const intervalId = useRef(-1);

  const sliderMarks = useMemo(() => {
    return rankingGroup.reduce((acc: any, item, i) => {
      const date = new Date(item.key);
      acc[item.value] = {
        style: {
          marginTop: 2,
          transform: "rotate(45deg)",
          fontSize: 8,
        },
        label: i % 4 === 0 ? format(date, "HH:mm") : " ",
      };
      return acc;
    }, {});
  }, [rankingGroup]);

  const onChange = (value: number | number[]) => {
    setTime(value as number);
  };

  const play = () => {
    stop();
    intervalId.current = window.setInterval(() => {
      nextTime();
    }, 2000);
    setIsPlay(true);
  };

  const stop = () => {
    window.clearInterval(intervalId.current);
    setIsPlay(false);
  };

  useEffect(() => {
    if (!rankingGroup.length) return;
    const values = rankingGroup.map((data: RankingGroup) => data.value);
    setMinMax([Math.min(...values), Math.max(...values)]);
    stop();
  }, [rankingGroup]);

  useEffect(() => {
    return () => {
      stop();
    };
  }, []);

  return (
    <Card className="p-3">
      <div className="flex gap-[50px]">
        <div className="w-full h-[75px]">
          <div className="flex">
            <div className="h-[30px] font-bold text-slate-400 text-xl mb-[10px] w-[190px]">
              {currentTime ? format(currentTime, "yyyy-MM-dd HH:mm") : "--"}
            </div>
            <div className="flex gap-[5px]">
              <Button
                size="xs"
                className="text-[10px]"
                disabled={rankingGroup.length === 0 || isPlay}
                onClick={() => {
                  stop();
                  prevTime();
                }}
              >
                이전
              </Button>
              <Button
                size="xs"
                className="text-[10px]"
                disabled={rankingGroup.length === 0 || isPlay}
                onClick={() => {
                  stop();
                  nextTime();
                }}
              >
                다음
              </Button>
              <Button
                size="xs"
                className="text-[10px]"
                disabled={rankingGroup.length === 0}
                onClick={isPlay ? stop : play}
              >
                {isPlay ? "정지" : "재생"}
              </Button>
            </div>
          </div>

          <div className="pl-[5px] pr-[30px]">
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
        </div>
      </div>
    </Card>
  );
};

export default TimeSlider;
