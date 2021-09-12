import { BigNumber } from "@ethersproject/bignumber";
import { useEthers } from "@usedapp/core";
import { useState } from "react";
import ClaimPanel from "../components/ClaimPanel";
import {
  useClaimItem,
  useItemSupply,
  useLuteDrop,
  useTokenHoldings,
} from "../hooks/contracts";
import FullPage from "../layouts/FullPage";
import config from "../config/contracts";
import ClaimForm from "../components/ClaimForm";

interface Item {
  id: BigNumber;
  name: string;
}

interface SelectedLootState {
  token: string;
  item: Item;
}

const Claim = () => {
  const { account } = useEthers();
  const fluteSupply = useItemSupply("flute");
  const luteSupply = useItemSupply("lute");
  const { lootClaimableHoldings, mlootClaimableHoldings, canClaim } =
    useTokenHoldings(account);
  const { totalClaimableSupply, remainingClaimableSupply } = useLuteDrop();
  const claimableHoldings = [
    { name: "Loot", holdings: lootClaimableHoldings },
    { name: "mLoot", holdings: mlootClaimableHoldings },
  ];
  const [selectedLoot, setSelectedLoot] = useState<SelectedLootState>();
  const { state, send: sendClaimItem } = useClaimItem();

  const onSelectLoot = (tokenIndex: number, itemIndex: number) => {
    if (claimableHoldings) {
      const token = claimableHoldings[tokenIndex];
      const item = token.holdings[itemIndex];
      setSelectedLoot({
        token: token.name,
        item: item,
      });
    }
  };

  const claimItem = (item: string) => {
    const typeId = item === "lute" ? 0 : 1;
    if (selectedLoot) {
      const { token, item } = selectedLoot;
      if (token === "Loot") {
        sendClaimItem(typeId, config.loot.address, item.id);
      }
      if (token === "mLoot") {
        console.log(item.id.toString());
        sendClaimItem(typeId, config.mloot.address, item.id);
      }
    }
  };

  return (
    <FullPage
      subhed="I hear that you and your bard have sold your lutes and bought
    flutes..."
    >
      <div className="font-body text-xl">
        <div className="flex flex-col md:flex-row justify-center mb-8">
          <ClaimPanel
            enabled={canClaim}
            claimed={fluteSupply}
            imgSrc="img/flutes.png"
            imgAlt="Flutes"
            imgStyle="scale-105"
            color="red"
            buttonText="Claim a Flute"
            onClaim={() => claimItem("flute")}
          />
          <ClaimForm
            enabled={canClaim}
            remaining={remainingClaimableSupply}
            total={totalClaimableSupply}
            holdings={claimableHoldings}
            onSelectLoot={onSelectLoot}
          />
          <ClaimPanel
            enabled={canClaim}
            claimed={luteSupply}
            imgSrc="img/lutes.png"
            imgAlt="Lutes"
            imgStyle="translate-x-4"
            color="blue"
            buttonText="Claim a Lute"
            onClaim={() => claimItem("lute")}
          />
        </div>
        {!canClaim && (
          <div className="text-center">
            <p>
              Loot and mLoot holders may claim one Lute or Flute per token,
              while supplies last.
            </p>
          </div>
        )}
      </div>
    </FullPage>
  );
};

export default Claim;
