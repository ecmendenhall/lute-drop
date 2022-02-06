import { useEthers } from "@usedapp/core";
import FullPage from "../layouts/FullPage";
import CraftPanel from "../components/CraftPanel";
import {
  useCraftedCount,
  useCraftItem,
  useLatestDrop,
  useTotalCrafted,
} from "../hooks/contracts";
import DropInfo from "../components/DropInfo";
import { useState } from "react";
import { isSupportedChain } from "../config/dapp";

const Craft = () => {
  const { chainId, account } = useEthers();

  const { send: sendCraftItem, state: craftItemState } = useCraftItem();

  const { lutesCrafted, flutesCrafted } = useTotalCrafted([craftItemState]);
  const crafted = useCraftedCount(account);
  const { dropId, fee, craftableSupply, craftedSupply, craftsPerAddress } =
    useLatestDrop();
  const enabled =
    craftableSupply &&
    craftedSupply &&
    crafted &&
    craftsPerAddress &&
    craftableSupply.gt(craftedSupply) &&
    crafted.lt(craftsPerAddress);

  const [craftingItem, setCraftingItem] = useState(false);

  const craftItem = (item: string) => {
    const craft = async () => {
      if (!craftingItem) {
        setCraftingItem(true);
        const typeId = item === "lute" ? 0 : 1;
        await sendCraftItem(typeId, dropId, { value: fee });
        setCraftingItem(false);
      }
    };
    craft();
  };

  return (
    <FullPage
      subhed="I hear that you and your bard have sold your lutes and bought
    flutes..."
    >
      <div className="font-body text-xl">
        <div className="flex flex-col md:flex-row items-center justify-center mb-8">
          <CraftPanel
            enabled={isSupportedChain(chainId) && enabled}
            crafted={flutesCrafted}
            imgSrc="img/flutes.png"
            imgAlt="Flutes"
            imgStyle="scale-105"
            color="red"
            buttonText="Craft a Flute"
            onCraft={() => {
              craftItem("flute");
            }}
          />
          {isSupportedChain(chainId) ? (
            <DropInfo
              id={dropId}
              fee={fee}
              total={craftableSupply}
              remaining={craftedSupply}
              crafted={crafted}
              limitPerAddress={craftsPerAddress}
            />
          ) : (
            <p className="text-center w-1/4">
              This network is not supported. Please connect to Polygon to use
              Lute Drop.
            </p>
          )}
          <CraftPanel
            enabled={isSupportedChain(chainId) && enabled}
            crafted={lutesCrafted}
            imgSrc="img/lutes.png"
            imgAlt="Lutes"
            imgStyle="translate-x-4"
            color="blue"
            buttonText="Craft a Lute"
            onCraft={() => {
              craftItem("lute");
            }}
          />
        </div>
      </div>
    </FullPage>
  );
};

export default Craft;
