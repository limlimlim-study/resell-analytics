"use client";

import { Card } from "@/components/ui/card";
import React, { useMemo } from "react";
import useRanking from "../hooks/useRanking";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

const RankingArea = () => {
  const { currentProducts } = useRanking();

  const products = useMemo(() => {
    return currentProducts.map((p) => {
      return (
        <div key={p.productId} className="flex gap-2">
          <Badge
            className="w-[40px] flex items-center justify-center"
            variant="secondary"
          >
            {p.rank}
          </Badge>
          {p.translatedName}
        </div>
      );
    });
  }, [currentProducts]);

  return (
    <Card className="p-3 h-full overflow-hidden">
      <ScrollArea className="h-full w-full rounded-md border overflow-y-auto">
        {products}
      </ScrollArea>
    </Card>
  );
};

export default RankingArea;
