import React from "react";
import SearchArea from "./components/SearchArea";
import RankingArea from "./components/RankingArea";
import { Badge } from "@/components/ui/badge";
import { RankingProvider } from "./context/RankingContext";
import TimeSlider from "./components/TimeSlider";

const RankingPage = () => {
  return (
    <RankingProvider>
      <div className="flex justify-center h-full min-w-[431px]">
        <div className="flex flex-col gap-3 px-5 pt-5 pb-5 h-full w-full">
          <div className="flex gap-3 mb-2">
            <h1 className="font-[700] text-xl">KREAM 스크랩북</h1>
            <h2>
              <Badge>TOP 100</Badge>
            </h2>
          </div>

          <SearchArea />
          <TimeSlider />
          <RankingArea />
        </div>
      </div>
    </RankingProvider>
  );
};

export default RankingPage;
