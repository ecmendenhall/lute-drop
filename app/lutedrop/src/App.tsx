import {
  useContractCall,
  useEtherBalance,
  useEthers,
  useTokenBalance,
} from "@usedapp/core";
import { formatEther, formatUnits, parseEther } from "ethers/lib/utils";
import React, { ReactElement, useState } from "react";

import "./App.css";
import config from "./config/contracts";
import {
  useClaimItem,
  useLatestLuteSwapPrice,
  useLatestFluteSwapPrice,
  useSwapFlute,
  useSwapLute,
  useFluteTokenIds,
  useFluteTokenUri,
  useTokenImageSrc,
  useLuteTokenIds,
  useLuteTokenUri,
} from "./hooks/contracts";

export function App() {
  const { activateBrowserWallet, account } = useEthers();
  const etherBalance = useEtherBalance(account);
  const lootBalance = useTokenBalance(config.loot.address, account);
  const mlootBalance = useTokenBalance(config.mloot.address, account);
  const luteBalance = useTokenBalance(config.lute.address, account);
  const fluteBalance = useTokenBalance(config.flute.address, account);
  const luteSwapPrice = useLatestLuteSwapPrice();
  const fluteSwapPrice = useLatestFluteSwapPrice();
  const fluteTokenIds = useFluteTokenIds(fluteBalance, account, 0);
  const fluteTokenUri = useFluteTokenUri(fluteTokenIds);
  const luteTokenIds = useLuteTokenIds(luteBalance, account, 0);
  const luteTokenUri = useLuteTokenUri(luteTokenIds);
  const fluteTokenImageSrc = useTokenImageSrc(fluteTokenUri);
  const luteTokenImageSrc = useTokenImageSrc(luteTokenUri);
  const { state: claimState, send: sendClaim } = useClaimItem();
  const { state: swapFluteState, send: sendSwapFlute } = useSwapFlute();
  const { state: swapLuteState, send: sendSwapLute } = useSwapLute();

  const [luteId, setLuteId] = useState(0);
  const [fluteId, setFluteId] = useState(0);

  const claimLute = () => {
    sendClaim(0, 1, 1311550);
  };

  const claimFlute = () => {
    sendClaim(1, 1, 152963);
  };

  const swapFlute = () => {
    sendSwapFlute(fluteId, { value: fluteSwapPrice });
  };

  const swapLute = () => {
    sendSwapLute(luteId, { value: luteSwapPrice });
  };

  const onLuteIdChange = (e: React.FormEvent<HTMLInputElement>) => {
    setLuteId(parseInt(e.currentTarget.value));
  };

  const onFluteIdChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFluteId(parseInt(e.currentTarget.value));
  };

  return (
    <div className="p-16">
      <button
        className="bg-purple-100 hover:bg-purple-300 py-1 px-2 rounded-lg shadow-md fixed top-4 right-4"
        onClick={() => activateBrowserWallet()}
      >
        Connect
      </button>
      <div className="flex flex-row justify-around">
        <div className="flex flex-col">
          <div>
            <h1 className="text-xl font-bold">Your wallet</h1>
            <div className="my-4">
              {account && (
                <p>
                  Account: <pre className="inline">{account}</pre>
                </p>
              )}
              {etherBalance && <p>ETH: {formatEther(etherBalance)}</p>}
              {lootBalance && <p>LOOT: {formatUnits(lootBalance, "wei")}</p>}
              {mlootBalance && <p>MLOOT: {formatUnits(mlootBalance, "wei")}</p>}
              {luteBalance && <p>LUTE: {formatUnits(luteBalance, "wei")}</p>}
              {fluteBalance && <p>FLUTE: {formatUnits(fluteBalance, "wei")}</p>}
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold">Your Loot</h1>
            <div className="flex flex-row justify-between">
              <div className="my-4">
                <div className="w-56">
                  Flute #{fluteTokenIds}
                  {fluteTokenImageSrc && (
                    <img
                      src={fluteTokenImageSrc}
                      className="object-cover rounded"
                    />
                  )}
                </div>
              </div>
              <div className="my-4">
                <div className="w-56 rounded-lg">
                  Lute #{luteTokenIds}
                  {luteTokenImageSrc && (
                    <img
                      src={luteTokenImageSrc}
                      className="object-cover rounded"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div>
            <h1 className="text-xl font-bold">Lute Drop</h1>
            <div className="my-4">
              {claimState && claimState.status != "None" && (
                <p>{claimState.status}</p>
              )}
              {claimState && <p>{claimState.errorMessage}</p>}
            </div>
            <div className="my-4">
              <button
                className="bg-red-100 hover:bg-red-300 py-1 px-2 rounded-lg shadow-md"
                onClick={claimLute}
              >
                Claim LUTE
              </button>
            </div>
            <div className="my-4">
              <button
                className="bg-blue-100 hover:bg-blue-300 py-1 px-2 rounded-lg shadow-md"
                onClick={claimFlute}
              >
                Claim FLUTE
              </button>
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold">Lutiswap</h1>
            <div className="my-4">
              {swapLuteState && swapLuteState.status != "None" && (
                <p>{swapLuteState.status}</p>
              )}
              {swapLuteState && <p>{swapLuteState.errorMessage}</p>}
            </div>
            <div className="my-4">
              <label className="block">
                LUTE tokenId:
                <input
                  className="mx-4 border border-gray-200 rounded p-2 focus:border-red-100 focus:outline-none"
                  onChange={onLuteIdChange}
                ></input>
              </label>
              Swap fee: {luteSwapPrice && formatEther(luteSwapPrice)}
              <button
                className="my-4 block bg-red-100 hover:bg-red-300 py-1 px-2 rounded-lg shadow-md"
                onClick={swapLute}
              >
                Swap LUTE for FLUTE
              </button>
            </div>
            <div className="my-4">
              {swapFluteState && swapFluteState.status != "None" && (
                <p>{swapFluteState.status}</p>
              )}
              {swapFluteState && <p>{swapFluteState.errorMessage}</p>}
            </div>
            <div className="my-4">
              <label className="block">
                FLUTE tokenId:
                <input
                  className="mx-4 border border-gray-200 rounded p-2 focus:border-blue-100 focus:outline-none"
                  onChange={onFluteIdChange}
                ></input>
              </label>
              Swap fee: {fluteSwapPrice && formatEther(fluteSwapPrice)}
              <button
                className="my-4 block bg-blue-100 hover:bg-blue-300 py-1 px-2 rounded-lg shadow-md"
                onClick={swapFlute}
              >
                Swap FLUTE for LUTE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
