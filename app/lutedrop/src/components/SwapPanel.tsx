import { BigNumber } from "@usedapp/core/node_modules/ethers";
import { roundEther } from "../helpers";
import Button from "./Button";

interface Item {
  id: BigNumber;
  name: string;
}

interface Props {
  itemName: string;
  swapPrice: BigNumber;
  imgSrc: string;
  imgAlt: string;
  color: string;
  buttonText: string;
  onSwap: (tokenId: number) => void;
}

const SwapPanel = ({
  itemName,
  swapPrice,
  imgSrc,
  imgAlt,
  color,
  buttonText,
  onSwap,
}: Props) => {
  return (
    <div className="flex flex-col place-content-center text-center p-4">
      <div className="mb-4 bg-yellow-50 p-4 shadow w-60">
        <h4 className="font-bold">{itemName}</h4>
        <img src={imgSrc} alt={imgAlt} className="my-2" />
        <p>{roundEther(swapPrice)} MATIC</p>
      </div>
      <div>
        <Button color={color} onClick={() => {}}>
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default SwapPanel;
