import React from "react";
import SearchArea from "./components/SearchArea";
import ListArea from "./components/ListArea";
import { Badge } from "@/components/ui/badge";

const RankPage = () => {
  return (
    <div className="flex flex-col gap-3 px-5 pt-5 pb-5 h-full">
      <div className="flex gap-3 mb-2">
        <h1 className="font-[700] text-xl">KREAM 스크랩북</h1>
        <h2>
          <Badge>TOP 100</Badge>
        </h2>
      </div>

      <SearchArea />
      <ListArea />
    </div>
  );
};

export default RankPage;
