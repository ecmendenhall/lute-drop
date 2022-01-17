import { useEthers } from "@usedapp/core";
import { BigNumber } from "ethers";
import SelectItem from "../components/SelectItem";
import SwapPanel from "../components/SwapPanel";
import {
  useItems,
  useLatestSwapPrice,
  useNextItem,
  useSwapExactFluteForLute,
  useSwapExactLuteForFlute,
  useTokenIdsByAccount,
} from "../hooks/contracts";
import FullPage from "../layouts/FullPage";

const Swap = () => {
  const { account } = useEthers();
  const nextLute = useNextItem("lute");
  const nextFlute = useNextItem("flute");
  const luteIds = useTokenIdsByAccount("lute", account, []);
  const lutes = useItems("lute", luteIds);
  const fluteIds = useTokenIdsByAccount("flute", account, []);
  const flutes = useItems("flute", fluteIds);
  const { luteSwapFee, fluteSwapFee } = useLatestSwapPrice();

  const { send: sendSwapExactLuteForFlute } = useSwapExactLuteForFlute();
  const { send: sendSwapExactFluteForLute } = useSwapExactFluteForLute();

  const onSwapFlute = (tokenId: BigNumber) => {
    sendSwapExactFluteForLute(tokenId, { value: fluteSwapFee });
  };

  const onSwapLute = (tokenId: BigNumber) => {
    sendSwapExactLuteForFlute(tokenId, { value: luteSwapFee });
  };

  return (
    <FullPage
      subhed="...I hear that you and your bard have sold your flutes and bought
    lutes."
    >
      <div className="font-body text-xl">
        <div className="flex flex-col md:flex-row items-center justify-center">
          {nextLute && (
            <SwapPanel
              itemName={nextLute.name}
              swapPrice={luteSwapFee}
              imgSrc={nextLute.image}
              imgAlt="Lute"
              color="blue"
              buttonText="Swap Flute for Lute"
              items={flutes}
              swapItem="flute"
              onSwap={onSwapFlute}
            />
          )}
          <div className="my-2 mx-8 w-80 hidden lg:block">
            <img src="img/swap.png" alt="Swap Lutes for Flutes" />
          </div>
          {nextFlute && (
            <SwapPanel
              itemName={nextFlute.name}
              swapPrice={fluteSwapFee}
              imgSrc={nextFlute.image}
              imgAlt="Flute"
              color="red"
              buttonText="Swap Lute for Flute"
              items={lutes}
              swapItem="lute"
              onSwap={onSwapLute}
            />
          )}
        </div>
      </div>
    </FullPage>
  );
};

export default Swap;
