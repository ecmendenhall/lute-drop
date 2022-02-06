import { BigNumber } from "@ethersproject/bignumber";

interface Props {
  lutesCrafted: number;
  flutesCrafted: number;
  luteSupply: number;
  fluteSupply: number;
  lutiswapLuteBalance?: BigNumber;
  lutiswapFluteBalance?: BigNumber;
  swaps: number;
}

const Stats = ({
  lutesCrafted,
  flutesCrafted,
  luteSupply,
  fluteSupply,
  lutiswapLuteBalance,
  lutiswapFluteBalance,
  swaps,
}: Props) => {
  const lutiswapLutes =
    (lutiswapLuteBalance && lutiswapLuteBalance.toNumber()) || 0;
  const lutiswapFlutes =
    (lutiswapFluteBalance && lutiswapFluteBalance.toNumber()) || 0;

  return (
    <div className="mb-4">
      <h4 className="font-black font-display text-2xl">Stats:</h4>
      <p className="my-2">Lutes crafted: {lutesCrafted}</p>
      <p className="my-2">Flutes crafted: {flutesCrafted}</p>
      <p className="my-2">
        Lute circulating supply: {luteSupply - lutiswapLutes}
      </p>
      <p className="my-2">
        Flute circulating supply: {fluteSupply - lutiswapFlutes}
      </p>
      <p className="my-2">Total swaps: {swaps}</p>
    </div>
  );
};

export default Stats;
