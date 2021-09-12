import { useEthers } from "@usedapp/core";
import SwapPanel from "../components/SwapPanel";
import TransactionStatus from "../components/TransactionStatus";
import { roundEther } from "../helpers";
import {
  useNextItem,
  useLutiswap,
  useTokenHoldings,
  useSwapExactFluteForLute,
  useSwapExactLuteForFlute,
} from "../hooks/contracts";
import FullPage from "../layouts/FullPage";

const Swap = () => {
  const { account } = useEthers();
  const nextLute = useNextItem("lute");
  const nextFlute = useNextItem("flute");
  const { luteHoldings, fluteHoldings } = useTokenHoldings(account);
  const { luteSwapFee, fluteSwapFee } = useLutiswap();
  const {
    state: sendSwapExactFluteForLuteState,
    send: sendSwapExactFluteForLute,
  } = useSwapExactFluteForLute();
  const {
    state: sendSwapExactLuteForFluteState,
    send: sendSwapExactLuteForFlute,
  } = useSwapExactLuteForFlute();

  const onSwapFlute = (tokenId: number) => {
    sendSwapExactFluteForLute(tokenId, { value: fluteSwapFee });
  };

  const onSwapLute = (tokenId: number) => {
    sendSwapExactLuteForFlute(tokenId, { value: luteSwapFee });
  };

  return (
    <FullPage
      subhed="...I hear that you and your bard have sold your flutes and bought
    lutes."
    >
      <div className="font-body text-xl">
        <div className="flex flex-col md:flex-row items-center justify-evenly">
          {nextLute && fluteSwapFee && (
            <SwapPanel
              itemName={nextLute.name}
              swapPrice={roundEther(fluteSwapFee)}
              holdings={[{ name: "Flute", holdings: fluteHoldings }]}
              imgSrc={nextLute.image}
              imgAlt="Lute"
              color="red"
              buttonText="Swap Flute for Lute"
              onSwap={onSwapFlute}
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
              onSwap={onSwapLute}
            />
          )}
        </div>
        <TransactionStatus
          txState={sendSwapExactFluteForLuteState}
          successMessage="Success!"
          miningMessage="Swapping..."
        />
        <TransactionStatus
          txState={sendSwapExactLuteForFluteState}
          successMessage="Success!"
          miningMessage="Swapping..."
        />
      </div>
    </FullPage>
  );
};

export default Swap;
