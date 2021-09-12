import React, { useEffect, useState } from "react";
import { parseEther } from "@ethersproject/units";
import { roundEther } from "../helpers";

interface Props {
  defaultTip: string;
  etherPrice: string;
  onTipChange: (tip: string) => void;
}

const Tip = ({ defaultTip, etherPrice, onTipChange }: Props) => {
  const [defaultSet, setDefaultSet] = useState(false);
  const [tip, setTip] = useState("0.0");
  const usdTip = parseFloat(tip || "0.0") * parseFloat(etherPrice || "0.0");

  useEffect(() => {
    if (!defaultSet) {
      setDefaultSet(true);
      const tipAmount = parseFloat(defaultTip) / parseFloat(etherPrice);
      const roundedTip = roundETH(tipAmount.toString());
      setTip(roundedTip);
      onTipChange(roundedTip);
    }
  }, []);

  const roundETH = (amount: string) => {
    return roundEther(parseEther(amount || "0.0"));
  };

  const roundUSD = (amount: number) => {
    return amount.toFixed(2);
  };

  const handleTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTip(e.target.value || "0.0");
    onTipChange(e.target.value || "0.0");
  };

  return (
    <div>
      <input
        className="bg-yellow-50 p-2 mr-2 w-28 text-center shadow-inner"
        type="number"
        step="0.001"
        min="0"
        alt="Tip"
        value={tip}
        onChange={handleTipChange}
      />
      <label>ETH</label>
      <div>${roundUSD(usdTip)} USD</div>
    </div>
  );
};

export default Tip;
