import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";

interface Props {
  data: Ranker;
}

const RankingItem = ({ data }: Props) => {
  console.log(data.image);
  const [imageUrl] = useState(() => {
    const imageUrl = data.image;
    const smallImage = imageUrl.replace("type=m", "type=s");
    return smallImage;
  });

  return (
    <Card className="h-[55px] w-[55px] mb-[2px] relative overflow">
      <div className="w-[20px] h-[20px] rounded-full absolute bg-slate-100 border-slate-800 text-[10px] text-slate-800 left-[-5px] top-[-5px] flex justify-center items-center font-bold">
        <div>{data.rank}</div>
      </div>
      <Image
        src={imageUrl}
        alt="product"
        loading="lazy"
        width={50}
        height={50}
      />
    </Card>
  );
};

export default RankingItem;
