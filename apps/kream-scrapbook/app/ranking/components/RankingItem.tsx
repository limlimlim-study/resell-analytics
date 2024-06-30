import { Card } from "@/components/ui/card";
import { Ranker } from "@/types/types";
import Image from "next/image";
import { useState } from "react";

interface Props {
  data: Ranker;
}

const RankingItem = ({ data }: Props) => {
  const [loaded, setLoaded] = useState(false);
  const [imageUrl] = useState(() => {
    const imageUrl = data.image;
    const smallImage = imageUrl.replace("type=m", "type=s");
    return smallImage;
  });

  return (
    <Card
      className="h-[65px] w-[65px] relative overflow hover:shadow-lg transition-shadow duration-500 ease-in-out cursor-pointer"
      onClick={() => {
        window.open(data.url);
      }}
    >
      <div
        className={`${
          loaded ? "opacity-100" : "opacity-0"
        } transition-opacity duration-1000 ease-in-out w-[20px] h-[20px] rounded-full absolute bg-slate-100 border-slate-800 text-[10px] text-slate-800 left-[-5px] top-[-5px] flex justify-center items-center font-bold`}
      >
        <div>{data.rank}</div>
      </div>
      <Image
        src={imageUrl}
        alt="product"
        loading="lazy"
        width={100}
        height={100}
        onLoad={() => {
          setLoaded(true);
        }}
      />
    </Card>
  );
};

export default RankingItem;
