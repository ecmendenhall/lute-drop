import { BigNumber } from "@ethersproject/bignumber";

interface Props {
  luteSupply: number;
  fluteSupply: number;
}

const Stats = ({ luteSupply, fluteSupply }: Props) => {
  return (
    <div className="mb-4">
      <h4 className="font-black font-display text-2xl">Stats:</h4>
      <p className="my-2">Lute supply: {luteSupply}</p>
      <p className="my-2">Flute supply: {fluteSupply}</p>
    </div>
  );
};

export default Stats;
