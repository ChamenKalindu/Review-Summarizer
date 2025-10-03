import React from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

type Props = {
  value: number;
};

const RatingStar = ({ value }: Props) => {
  const placeHolders = [1, 2, 3, 4, 5];
  return (
    <div className="flex gap-1">
      {placeHolders.map((p) =>
        value >= p ? <FaStar key={p} /> : <FaRegStar key={p} />
      )}
    </div>
  );
};

export default RatingStar;
