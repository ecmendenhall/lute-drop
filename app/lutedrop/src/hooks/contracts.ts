import { formatUnits } from "@ethersproject/units";
import {
  addressEqual,
  useContractCall,
  useContractCalls,
  useContractFunction,
  useEthers,
} from "@usedapp/core";
import { BigNumber, Contract } from "@usedapp/core/node_modules/ethers";
import { ethers } from "ethers";
import { parse } from "path";
import { useEffect, useState } from "react";
import { getConfig } from "../config/contracts";

type Item = "flute" | "lute";

const parseMetadata = (tokenURI: string) => {
  return JSON.parse(atob(tokenURI.substring(29)));
};

export function useItemSupply(item: Item) {
  const { chainId } = useEthers();
  const config = getConfig(chainId);
  const [totalSupply] =
    useContractCall({
      abi: config[item].abi,
      address: config[item].address,
      method: "totalSupply",
      args: [],
    }) ?? [];
  return totalSupply && formatUnits(totalSupply, "wei");
}

export function useItem(item: Item, id: BigNumber) {
  const { chainId } = useEthers();
  const config = getConfig(chainId);
  const [tokenURI] =
    useContractCall({
      abi: config[item].abi,
      address: config[item].address,
      method: "tokenURI",
      args: [id],
    }) ?? [];
  return tokenURI && parseMetadata(tokenURI);
}

export function useItems(item: Item, ids: BigNumber[] | undefined) {
  const { chainId } = useEthers();
  const config = getConfig(chainId);

  const itemCalls = (ids || []).map((id: BigNumber) => {
    return {
      abi: config[item].abi,
      address: config[item].address,
      method: "tokenURI",
      args: [id],
    };
  });
  const itemsResponse = (useContractCalls(itemCalls) ?? []) as string[][];
  return itemsResponse
    .map((i, idx) => {
      if (i && ids) {
        const [uri] = i;
        return { id: ids[idx], ...parseMetadata(uri) };
      }
    })
    .filter((i) => !!i);
}

export function useNextItem(item: Item) {
  const { chainId } = useEthers();
  const config = getConfig(chainId);
  const [tokenId] =
    useContractCall({
      abi: config.lutiswap.abi,
      address: config.lutiswap.address,
      method: item === "lute" ? "nextLute" : "nextFlute",
      args: [],
    }) ?? [];
  return useItem(item, tokenId);
}

export function useLatestSwapPrice() {
  const { chainId } = useEthers();
  const config = getConfig(chainId);
  const [luteSwapFee, fluteSwapFee] =
    useContractCall({
      abi: config.lutiswap.abi,
      address: config.lutiswap.address,
      method: "latestSwapPrice",
      args: [],
    }) ?? [];
  return { luteSwapFee, fluteSwapFee };
}

export function useLatestDrop() {
  const { chainId } = useEthers();
  const config = getConfig(chainId);
  const [id] =
    useContractCall({
      abi: config.luteDrop.abi,
      address: config.luteDrop.address,
      method: "latestDrop",
      args: [],
    }) ?? [];
  const [latestDrop] = useContractCall(
    id && {
      abi: config.luteDrop.abi,
      address: config.luteDrop.address,
      method: "drops",
      args: [id],
    }
  ) ?? [[]];
  const [fee, craftableSupply, craftedSupply, craftsPerAddress] = latestDrop;
  return { dropId: id, fee, craftableSupply, craftedSupply, craftsPerAddress };
}

export function useCraftedCount(address: string | null | undefined) {
  const { chainId } = useEthers();
  const config = getConfig(chainId);
  const [id] =
    useContractCall({
      abi: config.luteDrop.abi,
      address: config.luteDrop.address,
      method: "latestDrop",
      args: [],
    }) ?? [];
  const [crafts] =
    useContractCall(
      id &&
        address && {
          abi: config.luteDrop.abi,
          address: config.luteDrop.address,
          method: "crafts",
          args: [address, id],
        }
    ) ?? [];
  return crafts;
}

export function useTokenIdsByAccount(
  item: Item,
  account: string | null | undefined,
  dependencies: any[]
) {
  const { library, chainId } = useEthers();
  const config = getConfig(chainId);
  const [tokenIds, setTokenIds] = useState<BigNumber[] | undefined>();

  useEffect(() => {
    const loadTokenIds = async () => {
      if (account && library) {
        const token = new ethers.Contract(
          config[item].address,
          config[item].abi,
          library
        );
        const sentLogs = await token.queryFilter(
          token.filters.Transfer(account, null)
        );
        const receivedLogs = await token.queryFilter(
          token.filters.Transfer(null, account)
        );
        const logs = sentLogs
          .concat(receivedLogs)
          .sort(
            (a, b) =>
              a.blockNumber - b.blockNumber ||
              a.transactionIndex - b.transactionIndex
          );
        const owned = new Set<string>();
        for (const log of logs) {
          if (log.args) {
            const { from, to, tokenId } = log.args;
            if (addressEqual(to, account)) {
              owned.add(tokenId.toString());
            } else if (addressEqual(from, account)) {
              owned.delete(tokenId.toString());
            }
          }
        }
        const tokenIds = Array.from(owned).map((id) => BigNumber.from(id));
        setTokenIds(tokenIds);
      }
    };
    loadTokenIds();
  }, [
    account,
    library,
    config[item].abi,
    config[item].address,
    ...dependencies,
  ]);

  return tokenIds;
}

export function useCraftItem() {
  const { chainId } = useEthers();
  const config = getConfig(chainId);
  const contract = new Contract(config.luteDrop.address, config.luteDrop.abi);
  return useContractFunction(contract, "craft", {
    transactionName: "Craft Item",
  });
}

export function useSwapExactFluteForLute() {
  const { chainId } = useEthers();
  const config = getConfig(chainId);
  const contract = new Contract(config.lutiswap.address, config.lutiswap.abi);
  return useContractFunction(contract, "swapExactFluteForLute", {
    transactionName: "Swap Flute for Lute",
  });
}

export function useSwapExactLuteForFlute() {
  const { chainId } = useEthers();
  const config = getConfig(chainId);
  const contract = new Contract(config.lutiswap.address, config.lutiswap.abi);
  return useContractFunction(contract, "swapExactLuteForFlute", {
    transactionName: "Swap Lute for Flute",
  });
}
