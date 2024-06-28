"use client";

import { Card } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import useRanking from "../hooks/useRanking";
import RankingItem from "./RankingItem";

const itemSize = 75;

const RankingArea = () => {
  const { rankingData, currentProducts, rankingGroup } = useRanking();
  const [allRanker, setAllRanker] = useState<Ranker[]>([]);
  const [rankers, setRankers] = useState<Ranker[]>([]);

  useEffect(() => {
    const updatedRankers = allRanker.map((ranker) => {
      const target = currentProducts.find(
        (p) => p.productId === ranker.productId
      );
      return { ...ranker, rank: target ? target.rank : -1 };
    });
    setRankers(updatedRankers);
  }, [allRanker, currentProducts, rankingGroup]);

  useEffect(() => {
    if (!rankingData.length) return;
    const rankerMap = rankingData.reduce<Map<string, Ranker>>((acc, item) => {
      if (!acc.get(item.productId)) {
        acc.set(item.productId, {
          rank: -1,
          brand: item.brand,
          name: item.name,
          translatedName: item.translatedName,
          id: item.id,
          image: item.image,
          productId: item.productId,
        });
      }
      return acc;
    }, new Map());

    setAllRanker(Array.from(rankerMap.values()));
  }, [rankingData, currentProducts]);

  const containerWidth = 10 * itemSize;

  return (
    <Card className="p-3 h-full overflow-hidden min-h-[500px] flex justify-center">
      <div
        className="relative"
        style={{ width: containerWidth, overflow: "auto" }}
      >
        {rankers
          .filter((item) => item.rank !== -1)
          .map((item) => (
            <div
              key={item.productId}
              className="absolute transition-transform duration-1000 ease-in-out"
              style={{
                transform: `translate3d(${((item.rank - 1) % 10) * itemSize}px, ${Math.floor((item.rank - 1) / 10) * itemSize}px, 0)`,
              }}
            >
              <RankingItem data={item} />
            </div>
          ))}
      </div>
    </Card>
  );
};

export default RankingArea;
