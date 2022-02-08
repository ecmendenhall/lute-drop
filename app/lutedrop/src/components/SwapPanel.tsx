import { BigNumber } from "@usedapp/core/node_modules/ethers";
import { useState } from "react";
import { roundEther } from "../helpers";
import Button from "./Button";
import SelectItem from "./SelectItem";

interface Item {
  id: BigNumber;
  name: string;
  image: string;
}

interface Props {
  nextItem?: Item;
  swapPrice: BigNumber;
  imgAlt: string;
  color: string;
  buttonText: string;
  items?: BigNumber[];
  swapItem: string;
  enabled: boolean;
  swapping: boolean;
  onSwap: (tokenId: BigNumber) => void;
}

const SwapPanel = ({
  nextItem,
  swapPrice,
  imgAlt,
  color,
  buttonText,
  items,
  swapItem,
  enabled,
  swapping,
  onSwap,
}: Props) => {
  const [selectedItem, setSelectedItem] = useState<BigNumber>();
  const receiveItem = swapItem === "lute" ? "flute" : "lute";

  const onChange = (id: BigNumber) => {
    setSelectedItem(id);
  };

  const onClick = () => {
    if (enabled && selectedItem) {
      onSwap(selectedItem);
    }
  };

  return (
    <div className="flex flex-col place-content-center text-center p-4">
      <div className="mb-4 bg-yellow-50 p-4 shadow w-72">
        {nextItem ? (
          <div>
            <h4 className="font-bold">{nextItem.name}</h4>
            <img src={nextItem.image} alt={imgAlt} className="my-2" />
            <p>{roundEther(swapPrice)} MATIC</p>
          </div>
        ) : (
          <div className="animate-pulse">
            <h4 className="font-bold">Loading next {receiveItem}...</h4>
            <img
              src={`img/${receiveItem}.svg`}
              alt={receiveItem}
              className="my-2 animate-pulse"
            />
            <p className="invisible">??? MATIC</p>
          </div>
        )}
      </div>
      {items && items.length > 0 ? (
        <div>
          <div className="mb-4">
            <SelectItem items={items} swapItem={swapItem} onChange={onChange} />
          </div>
          <Button color={color} onClick={onClick}>
            { swapping ? "Swapping..." : buttonText}
          </Button>
        </div>
      ) : (
        <p>You have no {swapItem}s to swap.</p>
      )}
    </div>
  );
};

export default SwapPanel;
