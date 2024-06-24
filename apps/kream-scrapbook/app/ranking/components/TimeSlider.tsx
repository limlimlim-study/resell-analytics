"use client";

import {
  ChakraProvider,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import useSearch from "../hooks/useSearch";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

const TimeSlider = () => {
  const [sliderValue, setSliderValue] = useState(0);
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
    return rankingData
      .filter((data, i) => i % 2 === 1)
      .map((data) => {
        const date = new Date(data.key);
        return (
          <SliderMark
            key={data.key}
            textAlign="center"
            value={date.getTime()}
            {...labelStyles}
          >
            {format(date, "hh:mm")}
          </SliderMark>
        );
      });
  }, [labelStyles, rankingData]);

  useEffect(() => {
    const values = rankingData.map((data: RankingData) => data.value);
    setMinMax([Math.min(...values), Math.max(...values)]);
  }, [rankingData]);

  return (
    <ChakraProvider>
      <div className="flex gap-10 h-[100px] mt-[30px]">
        <div className="w-full">
          <Slider
            aria-label="slider-ex-6"
            onChange={(val) => setSliderValue(val)}
            min={minMax[0]}
            max={minMax[1]}
            value={sliderValue}
            isDisabled={rankingData.length === 0}
          >
            {sliderMarks}
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </div>
        <Button disabled={rankingData.length === 0}>재생</Button>
      </div>
    </ChakraProvider>
  );
};

export default TimeSlider;
