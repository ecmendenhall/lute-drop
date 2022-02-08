import { useEthers, useTokenBalance } from "@usedapp/core";
import { BigNumber } from "ethers";
import { useState } from "react";
import SwapPanel from "../components/SwapPanel";
import { getConfig } from "../config/contracts";
import { isSupportedChain } from "../config/dapp";
import {
  useIsApprovedForAll,
  useLatestSwapFluteForLutePrice,
  useLatestSwapLuteForFlutePrice,
  useNextItem,
  useSetApprovalForAll,
  useSwapExactFluteForLute,
  useSwapExactLuteForFlute,
  useTokenIdsByAccount,
} from "../hooks/contracts";
import FullPage from "../layouts/FullPage";

const Swap = () => {
  const { account, chainId } = useEthers();
  const config = getConfig(chainId);

  const { send: sendApproveLutes } = useSetApprovalForAll("lute");
  const { send: sendApproveFlutes } = useSetApprovalForAll("flute");
  const {
    send: sendSwapExactLuteForFlute,
    state: sendSwapExactLuteForFluteState,
  } = useSwapExactLuteForFlute();
  const {
    send: sendSwapExactFluteForLute,
    state: sendSwapExactFluteForLuteState,
  } = useSwapExactFluteForLute();

  const lutiswapLuteBalance = useTokenBalance(
    config.lute.address,
    config.lutiswap.address
  );
  const lutiswapFluteBalance = useTokenBalance(
    config.flute.address,
    config.lutiswap.address
  );
  const nextLute = useNextItem("lute");
  const nextFlute = useNextItem("flute");
  const luteIds = useTokenIdsByAccount("lute", account, [
    sendSwapExactFluteForLuteState,
    sendSwapExactLuteForFluteState,
  ]);
  const fluteIds = useTokenIdsByAccount("flute", account, [
    sendSwapExactFluteForLuteState,
    sendSwapExactLuteForFluteState,
  ]);
  const luteSwapFee = useLatestSwapLuteForFlutePrice();
  const fluteSwapFee = useLatestSwapFluteForLutePrice();
  const lutesApproved = useIsApprovedForAll("lute", account);
  const flutesApproved = useIsApprovedForAll("flute", account);

  const [swapPending, setSwapPending] = useState(false);

  const sufficientLuteReserve =
    lutiswapLuteBalance && lutiswapLuteBalance.gt(2);
  const sufficientFluteReserve =
    lutiswapFluteBalance && lutiswapFluteBalance.gt(2);

  const onSwapFlute = (tokenId: BigNumber) => {
    const swap = async () => {
      setSwapPending(true);
      if (!flutesApproved) {
        await sendApproveFlutes(config.lutiswap.address, true);
      }
      await sendSwapExactFluteForLute(tokenId, { value: fluteSwapFee });
      setSwapPending(false);
    };
    swap();
  };

  const onSwapLute = (tokenId: BigNumber) => {
    const swap = async () => {
      setSwapPending(true);
      if (!lutesApproved) {
        await sendApproveLutes(config.lutiswap.address, true);
      }
      await sendSwapExactLuteForFlute(tokenId, { value: luteSwapFee });
      setSwapPending(false);
    };
    swap();
  };

  return (
    <FullPage
      subhed="...I hear that you and your bard have sold your flutes and bought
    lutes."
    >
      <div className="font-body text-xl">
        <div className="flex flex-col md:flex-row items-center justify-center">
          {isSupportedChain(chainId) && sufficientLuteReserve && (
            <SwapPanel
              nextItem={nextLute}
              swapPrice={fluteSwapFee}
              imgAlt="Lute"
              color="blue"
              buttonText="Swap Flute for Lute"
              items={fluteIds}
              swapItem="flute"
              enabled={!swapPending}
              onSwap={onSwapFlute}
            />
          )}
          {!sufficientLuteReserve && (
            <div className="w-72 text-center">
              Too few reserve lutes to swap.
            </div>
          )}
          <div className="my-2 mx-8 w-80 hidden lg:block">
            <img src="img/swap.png" alt="Swap Lutes for Flutes" />
          </div>
          {isSupportedChain(chainId) && sufficientFluteReserve && (
            <SwapPanel
              nextItem={nextFlute}
              swapPrice={luteSwapFee}
              imgAlt="Flute"
              color="red"
              buttonText="Swap Lute for Flute"
              items={luteIds}
              swapItem="lute"
              enabled={!swapPending}
              onSwap={onSwapLute}
            />
          )}
          {!sufficientFluteReserve && (
            <div className="w-72 text-center">
              Too few reserve flutes to swap.
            </div>
          )}
        </div>
        {!isSupportedChain(chainId) && (
          <p className="text-center">
            This network is not supported. Please connect to Polygon to use Lute
            Drop.
          </p>
        )}
      </div>
    </FullPage>
  );
};

export default Swap;
