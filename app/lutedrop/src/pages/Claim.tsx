import { useEthers } from "@usedapp/core";
import { formatUnits } from "ethers/lib/utils";
import ClaimPanel from "../components/ClaimPanel";
import ItemBalance from "../components/ItemBalance";
import SelectLoot from "../components/SelectLoot";
import Tip from "../components/Tip";
import {
  useItemSupply,
  useLuteDrop,
  useTokenBalances,
  useTokenHoldings,
} from "../hooks/contracts";
import FullPage from "../layouts/FullPage";

const Claim = () => {
  const { account } = useEthers();
  const fluteSupply = useItemSupply("flute");
  const luteSupply = useItemSupply("lute");
  const {
    luteBalance,
    luteHoldings,
    fluteBalance,
    fluteHoldings,
    lootBalance,
    lootHoldings,
    mlootBalance,
    mlootHoldings,
  } = useTokenHoldings(account);
  const { drops } = useLuteDrop();
  const holdings = [
    { name: "Loot", holdings: lootHoldings },
    { name: "mLoot", holdings: mlootHoldings },
  ];

  const totalClaimableSupply = drops.reduce(
    (acc, d) => d.claimableSupply.toNumber() + acc,
    0
  );
  const totalClaimedSupply = drops.reduce(
    (acc, d) => d.claimedSupply.toNumber() + acc,
    0
  );
  const remainingClaimableSupply = totalClaimableSupply - totalClaimedSupply;

  return (
    <FullPage
      subhed="I hear that you and your bard have sold your lutes and bought
    flutes..."
    >
      <div className="font-body text-xl">
        <div className="flex flex-col md:flex-row justify-center">
          <ItemBalance
            itemName="Flutes"
            balance={fluteBalance}
            holdings={fluteHoldings}
          />
          <ClaimPanel
            claimed={fluteSupply}
            holdings={holdings}
            imgSrc="img/flutes.png"
            imgAlt="Flutes"
            imgStyle="scale-105"
            color="red"
            buttonText="Claim a Flute"
          />
          <div className="flex flex-col place-content-start text-center p-8">
            <div className="my-2">
              <h4 className="font-body font-bold mb-2">Claimable:</h4>
              <p>
                {remainingClaimableSupply} / {totalClaimableSupply}
              </p>
            </div>
            <div className="my-2">
              <h4 className="font-body font-bold mb-2">Claim with:</h4>
              <SelectLoot holdings={holdings} />
            </div>
            <div className="my-2">
              <h4 className="font-body font-bold mb-2">Tip your Luthier:</h4>
              <Tip defaultTip={20.0} />
            </div>
          </div>
          <ClaimPanel
            claimed={luteSupply}
            holdings={holdings}
            imgSrc="img/lutes.png"
            imgAlt="Lutes"
            imgStyle="translate-x-4"
            color="blue"
            buttonText="Claim a Lute"
          />
          <ItemBalance
            itemName="Lutes"
            balance={luteBalance}
            holdings={luteHoldings}
            className="pl-4 pr-8"
          />
        </div>
      </div>
    </FullPage>
  );
};

export default Claim;
