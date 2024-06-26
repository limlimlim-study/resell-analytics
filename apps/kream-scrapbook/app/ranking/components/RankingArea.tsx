"use client";

import { Card } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { useTransition, animated } from "@react-spring/web";
import useRanking from "../hooks/useRanking";
import RankingItem from "./RankingItem";

const RankingArea = () => {
  const { rankingData, currentProducts, rankingGroup } = useRanking();
  const [allRranker, setAllRanker] = useState<Ranker[]>([]);
  const [rankers, setRankers] = useState<Ranker[]>([]);

  const transitions = useTransition(
    rankers.map((data) => {
      if (data.rank === -1) {
        return {
          ...data,
          x: Math.random() * 1000,
          y: 1000,
        };
      }
      return {
        ...data,
        x: ((data.rank - 1) % 10) * 63,
        y: parseInt(((data.rank - 1) / 10).toString()) * 63,
      };
    }),
    {
      key: (item: any) => item.productId,
      from: (item: any) => {
        return {
          opacity: 0,
          transform: `translate3d(${item.x}px, ${item.y}px, 0)`,
        };
      },
      enter: { opacity: 1 },
      leave: { opacity: 0 },
      update: (item: any) => {
        return {
          transform: `translate3d(${item.x}px, ${item.y}px, 0)`,
        };
      },
    }
  );

  useEffect(() => {
    const updatedRankers = allRranker.map((ranker) => {
      const target = currentProducts.find(
        (p) => p.productId === ranker.productId
      );
      return { ...ranker, rank: target ? target.rank : -1 };
    });
    setRankers(updatedRankers);
  }, [allRranker, currentProducts, rankingGroup]);

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
  return (
    <Card className="p-3 h-full overflow-hidden min-h-[500px] pl-[67px]">
      <div>
        <div className="relative">
          {transitions((style, item, t, index) => {
            return (
              <animated.div
                style={{
                  position: "absolute",
                  ...style,
                }}
              >
                <div key={item.productId}>
                  <RankingItem data={item} />
                </div>
              </animated.div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};

export default RankingArea;
