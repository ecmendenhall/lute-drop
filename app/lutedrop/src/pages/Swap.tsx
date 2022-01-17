import { useEthers } from "@usedapp/core";
import { formatEther } from "ethers/lib/utils";
import SwapPanel from "../components/SwapPanel";
import { useLatestSwapPrice, useNextItem } from "../hooks/contracts";
import FullPage from "../layouts/FullPage";

const Swap = () => {
  const { account } = useEthers();
  const nextLute = useNextItem("lute");
  const nextFlute = useNextItem("flute");
  const { luteSwapFee, fluteSwapFee } = useLatestSwapPrice();

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
              onSwap={() => {}}
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
              onSwap={() => {}}
            />
          )}
        </div>
      </div>
    </FullPage>
  );
};

export default Swap;
