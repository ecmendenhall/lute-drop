import React, { useEffect, useState } from "react";
import { useCoingeckoPrice } from "@usedapp/coingecko";
import { parseEther } from "@ethersproject/units";
import { roundEther } from "../helpers";

interface Props {
  defaultTip: number;
}

const Tip = ({ defaultTip }: Props) => {
  const etherPrice = useCoingeckoPrice("ethereum", "usd");
  const [defaultSet, setDefaultSet] = useState(false);
  const [tip, setTip] = useState("0");
  const usdTip = parseFloat(tip || "0.0") * parseFloat(etherPrice || "0.0");

  useEffect(() => {
    if (!defaultSet && etherPrice) {
      setDefaultSet(true);
      const tip = defaultTip / parseFloat(etherPrice);
      setTip(tip.toString());
    }
  }, [etherPrice]);

  const roundETH = (amount: string) => {
    return roundEther(parseEther(amount || "0.0"));
  };

  const roundUSD = (amount: number) => {
    return amount.toFixed(2);
  };

  const handleTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTip(e.target.value);
  };

  return (
    <div>
      <input
        className="bg-yellow-50 p-2 mr-2 w-28 text-center shadow-inner"
        type="number"
        step="0.001"
        value={roundETH(tip)}
        onChange={handleTipChange}
      ></input>
      <label>ETH</label>
      <div>${roundUSD(usdTip)} USD</div>
    </div>
  );
};

export default Tip;
