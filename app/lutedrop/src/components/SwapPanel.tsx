import { BigNumber } from "@usedapp/core/node_modules/ethers";
import Button from "./Button";
import SelectLoot from "./SelectLoot";

interface Item {
  id: BigNumber;
  name: string;
}

interface Holdings {
  name: string;
  holdings: Item[];
}

interface Props {
  itemName: string;
  swapPrice: string;
  holdings?: Holdings[];
  imgSrc: string;
  imgAlt: string;
  color: string;
  buttonText: string;
}

const SwapPanel = ({
  itemName,
  swapPrice,
  holdings,
  imgSrc,
  imgAlt,
  color,
  buttonText,
}: Props) => {
  return (
    <div className="flex flex-col place-content-center text-center p-4">
      <div className="mb-4 bg-yellow-50 p-4 shadow w-60">
        <h4 className="font-bold">{itemName}</h4>
        <img src={imgSrc} alt={imgAlt} className="my-2" />
        <p>{swapPrice} ETH</p>
      </div>
      {holdings && holdings.length > 0 && (
        <div className="mb-4">
          <SelectLoot
            showTokenName={false}
            holdings={holdings}
            onSelectLoot={() => {}}
          />
        </div>
      )}
      <div>
        <Button color={color}>{buttonText}</Button>
      </div>
    </div>
  );
};

export default SwapPanel;
