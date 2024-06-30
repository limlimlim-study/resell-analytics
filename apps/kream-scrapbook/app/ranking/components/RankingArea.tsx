"use client";

import { Card } from "@/components/ui/card";
import React from "react";
import { Tooltip } from "react-tooltip";
import useRanking from "../hooks/useRanking";
import RankingItem from "./RankingItem";

const RankingArea = () => {
  const { currentProducts } = useRanking();

  return (
    <Card className="p-3 w-full min-h-[500px] overflow-auto">
      {currentProducts.length === 0 ? (
        <div className="flex justify-center pt-[100px]">No Data.</div>
      ) : (
        <div className="flex flex-wrap gap-[10px] justify-center pb-3">
          {currentProducts
            .filter((item) => item.rank !== -1)
            .map((item) => (
              <div
                key={item.productId}
                data-tooltip-id="product-tooltip"
                data-tooltip-content={item.translatedName}
              >
                <RankingItem data={item} />
              </div>
            ))}
        </div>
      )}
      <Tooltip id="product-tooltip" style={{ fontSize: 10 }} />
    </Card>
  );
};

export default RankingArea;
