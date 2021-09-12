import { BigNumber } from "ethers";
import SelectLoot from "./SelectLoot";
import Tip from "./Tip";

interface Item {
  id: BigNumber;
  name: string;
}

interface Holdings {
  name: string;
  holdings: Item[];
}

interface Props {
  enabled: boolean;
  remaining: number;
  total: number;
  holdings: Holdings[];
  etherPrice?: string;
  onSelectLoot: (tokenIndex: number, itemIndex: number) => void;
  onTipChange: (tip: string) => void;
}

const ClaimForm = ({
  enabled,
  remaining,
  total,
  holdings,
  etherPrice,
  onSelectLoot,
  onTipChange,
}: Props) => {
  return (
    <div className="flex flex-col md:w-1/4 place-content-start text-center p-8">
      <div className="my-2">
        <h4 className="font-body font-bold mb-2">Claimable:</h4>
        <p>
          {remaining} / {total}
        </p>
      </div>
      {enabled && etherPrice && (
        <>
          <div className="my-2">
            <h4 className="font-body font-bold mb-2">Claim with:</h4>
            <SelectLoot
              showTokenName
              holdings={holdings}
              onSelectLoot={onSelectLoot}
            />
          </div>
          <div className="my-2">
            <h4 className="font-body font-bold mb-2">Tip your luthier:</h4>
            <Tip
              defaultTip="20.0"
              etherPrice={etherPrice}
              onTipChange={onTipChange}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ClaimForm;
