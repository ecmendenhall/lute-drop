import { useEthers } from "@usedapp/core";
import SwapPanel from "../components/SwapPanel";
import { roundEther } from "../helpers";
import { useNextItem, useLutiswap, useTokenHoldings } from "../hooks/contracts";
import FullPage from "../layouts/FullPage";

const Swap = () => {
  const { account } = useEthers();
  const nextLute = useNextItem("lute");
  const nextFlute = useNextItem("flute");
  const { luteSwapFee, fluteSwapFee } = useLutiswap();
  const { luteHoldings, fluteHoldings } = useTokenHoldings(account);

  return (
    <FullPage
      subhed="...I hear that you and your bard have sold your flutes and bought
    lutes."
    >
      <div>
        <div className="flex flex-col md:flex-row justify-center font-body text-xl">
          {nextLute && fluteSwapFee && (
            <SwapPanel
              itemName={nextLute.name}
              swapPrice={roundEther(fluteSwapFee)}
              holdings={[{ name: "Flute", holdings: fluteHoldings }]}
              imgSrc={nextLute.image}
              imgAlt="Lute"
              color="red"
              buttonText="Swap Flute for Lute"
            />
          )}
          <div className="my-2 mx-8 w-80">
            <img src="img/swap.png" alt="Swap Lutes for Flutes" />
          </div>
          {nextFlute && luteSwapFee && (
            <SwapPanel
              itemName={nextFlute.name}
              swapPrice={roundEther(luteSwapFee)}
              holdings={[{ name: "Lute", holdings: luteHoldings }]}
              imgSrc={nextFlute.image}
              imgAlt="Flute"
              color="blue"
              buttonText="Swap Lute for Flute"
            />
          )}
        </div>
      </div>
    </FullPage>
  );
};

export default Swap;
