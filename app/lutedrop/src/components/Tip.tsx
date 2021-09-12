import React, { useEffect, useState } from "react";
import { useCoingeckoPrice } from "@usedapp/coingecko";
import { parseEther } from "@ethersproject/units";
import { roundEther } from "../helpers";

interface Props {
  defaultTip: string;
  onTipChange: (tip: string) => void;
}

const Tip = ({ defaultTip, onTipChange }: Props) => {
  const etherPrice = useCoingeckoPrice("ethereum", "usd");
  const [defaultSet, setDefaultSet] = useState(false);
  const [tip, setTip] = useState("0.0");
  const usdTip = parseFloat(tip || "0.0") * parseFloat(etherPrice || "0.0");

  useEffect(() => {
    if (!defaultSet && etherPrice) {
      setDefaultSet(true);
      const tipAmount = parseFloat(defaultTip) / parseFloat(etherPrice);
      setTip(tipAmount.toString());
      onTipChange(tipAmount.toString());
    }
  }, [defaultSet, etherPrice, defaultTip, onTipChange]);

  const roundETH = (amount: string) => {
    return roundEther(parseEther(amount || "0.0"));
  };

  const roundUSD = (amount: number) => {
    return amount.toFixed(2);
  };

  const handleTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTip(e.target.value);
    onTipChange(e.target.value);
  };

  return (
    <div>
      <input
        className="bg-yellow-50 p-2 mr-2 w-28 text-center shadow-inner"
        type="number"
        step="0.001"
        min="0"
        value={roundETH(tip)}
        onChange={handleTipChange}
      ></input>
      <label>ETH</label>
      <div>${roundUSD(usdTip)} USD</div>
    </div>
  );
};

export default Tip;
