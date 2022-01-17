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
        <div>
          You may craft {limitPerAddress.sub(crafted).toNumber()} more items.
        </div>
      )}
    </div>
  );
};

export default DropInfo;
