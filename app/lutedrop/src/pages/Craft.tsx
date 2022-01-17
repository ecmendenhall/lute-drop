import { useEthers } from "@usedapp/core";
import FullPage from "../layouts/FullPage";
import { getConfig } from "../config/contracts";
import CraftPanel from "../components/CraftPanel";
import {
  useCraftedCount,
  useCraftItem,
  useItemSupply,
  useLatestDrop,
} from "../hooks/contracts";
import DropInfo from "../components/DropInfo";

const Craft = () => {
  const { chainId, account } = useEthers();
  const config = getConfig(chainId);
  const luteSupply = useItemSupply("lute");
  const fluteSupply = useItemSupply("flute");
  const crafted = useCraftedCount(account);
  const { dropId, fee, craftableSupply, craftedSupply, craftsPerAddress } =
    useLatestDrop();
  const { send: sendCraftItem } = useCraftItem();

  const craftItem = (item: string) => {
    const typeId = item === "lute" ? 0 : 1;
    sendCraftItem(typeId, dropId, { value: fee });
  };

  return (
    <FullPage
      subhed="I hear that you and your bard have sold your lutes and bought
    flutes..."
    >
      <div className="font-body text-xl">
        <div className="flex flex-col md:flex-row items-center justify-center mb-8">
          <CraftPanel
            enabled
            crafted={fluteSupply}
            imgSrc="img/flutes.png"
            imgAlt="Flutes"
            imgStyle="scale-105"
            color="red"
            buttonText="Craft a Flute"
            onCraft={() => {
              craftItem("flute");
            }}
          />
          <DropInfo
            id={dropId}
            fee={fee}
            total={craftableSupply}
            remaining={craftedSupply}
            crafted={crafted}
            limitPerAddress={craftsPerAddress}
          />
          <CraftPanel
            enabled
            crafted={luteSupply}
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
