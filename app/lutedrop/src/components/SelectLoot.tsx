import { BigNumber } from "@ethersproject/bignumber";
import React, { useEffect } from "react";

interface Item {
  id: BigNumber;
  name: string;
}

interface Holdings {
  name: string;
  holdings: Item[];
}

interface Props {
  showTokenName: boolean;
  holdings?: Holdings[];
  onSelectLoot: (tokenIndex: number, itemIndex: number) => void;
}

const SelectLoot = ({ showTokenName, holdings, onSelectLoot }: Props) => {
  const onSelectItem = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [tokenIndex, itemIndex] = e.target.value
      .split(",")
      .map((n) => parseInt(n));
    onSelectLoot(tokenIndex, itemIndex);
  };

  return (
    <select className="bg-yellow-50 shadow p-1" onChange={onSelectItem}>
      {holdings &&
        holdings.map((token, tokenIndex) => {
          return token.holdings.map((item, itemIndex) => {
            const key = `${tokenIndex},${itemIndex}`;
            return (
              <option value={key} key={key}>
                {showTokenName && token.name} {item.name}
              </option>
            );
          });
        })}
    </select>
  );
};

export default SelectLoot;
