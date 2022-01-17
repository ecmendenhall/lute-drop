import { BigNumber } from "@usedapp/core/node_modules/ethers";
import { useState } from "react";
import { roundEther } from "../helpers";
import Button from "./Button";
import SelectItem from "./SelectItem";

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
  items: Item[];
  swapItem: string;
  onSwap: (tokenId: BigNumber) => void;
}

const SwapPanel = ({
  itemName,
  swapPrice,
  imgSrc,
  imgAlt,
  color,
  buttonText,
  items,
  swapItem,
  onSwap,
}: Props) => {
  const [selectedItem, setSelectedItem] = useState<BigNumber>();

  const onChange = (id: BigNumber) => {
    setSelectedItem(id);
  };

  const onClick = () => {
    if (selectedItem) {
      onSwap(selectedItem);
    }
  };

  return (
    <div className="flex flex-col place-content-center text-center p-4">
      <div className="mb-4 bg-yellow-50 p-4 shadow w-72">
        <h4 className="font-bold">{itemName}</h4>
        <img src={imgSrc} alt={imgAlt} className="my-2" />
        <p>{roundEther(swapPrice)} MATIC</p>
      </div>
      {items && items.length > 0 ? (
        <div>
          <div className="mb-4">
            <SelectItem items={items} onChange={onChange} />
          </div>
          <Button color={color} onClick={onClick}>
            {buttonText}
          </Button>
        </div>
      ) : (
        <p>You have no {swapItem}s to swap.</p>
      )}
    </div>
  );
};

export default SwapPanel;
