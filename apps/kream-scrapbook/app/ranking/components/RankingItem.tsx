import { Card } from "@/components/ui/card";
import Image from "next/image";

interface Props {
  rank?: number;
  data: Ranker;
}

const RankingItem = ({ data }: Props) => {
  return (
    <Card className="h-[55px] w-[55px] mb-[2px]">
      <Image
        src={`/api/image?url=${data.image}`}
        alt="test"
        width={50}
        height={50}
      />
    </Card>
  );
};

export default RankingItem;
