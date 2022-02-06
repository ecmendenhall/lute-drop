import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";

interface Props {
  id?: BigNumber;
  remaining?: BigNumber;
  total?: BigNumber;
  fee?: BigNumber;
  crafted?: BigNumber;
  limitPerAddress?: BigNumber;
}

const DropInfo = ({
  id,
  remaining,
  total,
  fee,
  crafted,
  limitPerAddress,
}: Props) => {
  const craftMessage = (remaining: number) => {
    if (remaining > 1) {
      return `You may craft ${remaining} more items.`;
    } else if (remaining === 1) {
      return "You may craft 1 more item.";
    } else {
      return "You have crafted the maximum number of items.";
    }
  };
  return (
    <div className="flex flex-col text-center my-8">
      {total && total.gt(0) ? (
        <div>
          <h3 className="text-3xl font-body font-bold mb-2">
            Drop #{id && id.toNumber()}
          </h3>
          <p>
            <span className="font-bold">Crafted:</span>{" "}
            {remaining && remaining.toNumber()} / {total && total.toNumber()}{" "}
            items
          </p>
          <p>
            <span className="font-bold">Fee:</span> {fee && formatEther(fee)}{" "}
            MATIC
          </p>
        </div>
      ) : (
        <div>No active drops.</div>
      )}
      {limitPerAddress && crafted && (
        <div>{craftMessage(limitPerAddress.sub(crafted).toNumber())}</div>
      )}
    </div>
  );
};

export default DropInfo;
