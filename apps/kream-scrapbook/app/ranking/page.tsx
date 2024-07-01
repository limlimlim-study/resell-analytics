import React from "react";
import SearchArea from "./components/SearchArea";
import RankingArea from "./components/RankingArea";
import { RankingProvider } from "./context/RankingContext";
import TimeSlider from "./components/TimeSlider";

const RankingPage = () => {
  return (
    <RankingProvider>
      <div className="flex justify-center h-full min-w-[431px]">
        <div className="flex flex-col gap-3 px-5 pt-5 pb-5 h-full w-full">
          <SearchArea />
          <TimeSlider />
          <RankingArea />
        </div>
      </div>
    </RankingProvider>
  );
};

export default RankingPage;
