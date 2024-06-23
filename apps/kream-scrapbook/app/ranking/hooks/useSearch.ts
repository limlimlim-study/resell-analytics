import { useContext } from "react";
import { RankingContext } from "../context/RankingContext";

const useSearch = () => {
  const context = useContext(RankingContext);
  if (!context) {
    throw new Error("useSearch must be used within a RankingProvider");
  }
  return context;
};

export default useSearch;
