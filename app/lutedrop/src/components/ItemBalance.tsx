import { BigNumber } from "@usedapp/core/node_modules/ethers";
import { formatUnits } from "ethers/lib/utils";

interface Item {
  name: string;
}

interface Props {
  itemName: string;
  balance?: BigNumber;
  holdings?: Item[];
  className?: string;
}

const ItemBalance = ({ itemName, balance, holdings, className }: Props) => {
  const containerClass = className ? className : "px-8";
  return (
    <>
      {balance && balance.toNumber() > 0 && (
        <div className={containerClass}>
          <p>
            Your {itemName}: {balance && formatUnits(balance, "wei")}
          </p>
          {holdings && (
            <ul>
              {holdings.map((lute) => (
                <li>{lute.name}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
};

export default ItemBalance;
