import { formatUnits } from "@ethersproject/units";
import {
  addressEqual,
  useContractCall,
  useContractCalls,
  useContractFunction,
  useEthers,
} from "@usedapp/core";
import { BigNumber, Contract } from "@usedapp/core/node_modules/ethers";
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
      } else {
        return undefined;
      }
    })
    .filter((i) => !!i);
}

export function useIsApprovedForAll(
  item: Item,
  owner: string | null | undefined
) {
  const { chainId } = useEthers();
  const config = getConfig(chainId);
  const [isApprovedForAll] = useContractCall({
    abi: config[item].abi,
    address: config[item].address,
    method: "isApprovedForAll",
    args: [owner, config.lutiswap.address],
  }) ?? [false];
  return isApprovedForAll;
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

export function useLatestSwapFluteForLutePrice() {
  const { chainId } = useEthers();
  const config = getConfig(chainId);
  const [fluteSwapFee] =
    useContractCall({
      abi: config.lutiswap.abi,
      address: config.lutiswap.address,
      method: "latestSwapFluteForLutePrice",
      args: [],
    }) ?? [];
  return fluteSwapFee;
}

export function useLatestSwapLuteForFlutePrice() {
  const { chainId } = useEthers();
  const config = getConfig(chainId);
  const [luteSwapFee] =
    useContractCall({
      abi: config.lutiswap.abi,
      address: config.lutiswap.address,
      method: "latestSwapLuteForFlutePrice",
      args: [],
    }) ?? [];
  return luteSwapFee;
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

export function useTotalCrafted(dependencies: any[]) {
  const { library, chainId } = useEthers();
  const config = getConfig(chainId);
  const [lutesCrafted, setLutesCrafted] = useState<number>(0);
  const [flutesCrafted, setFlutesCrafted] = useState<number>(0);

  useEffect(() => {
    const loadTotalCrafted = async () => {
      if (library) {
        const luteDrop = new Contract(
          config.luteDrop.address,
          config.luteDrop.abi,
          library
        );
        const luteCraftLogs = await luteDrop.queryFilter(
          luteDrop.filters.Craft(null, 0)
        );
        const fluteCraftLogs = await luteDrop.queryFilter(
          luteDrop.filters.Craft(null, 1)
        );
        setLutesCrafted(luteCraftLogs.length);
        setFlutesCrafted(fluteCraftLogs.length);
      }
    };
    loadTotalCrafted();
  }, [library, config.luteDrop.abi, config.luteDrop.address, ...dependencies]);

  return { lutesCrafted, flutesCrafted };
}

export function useSwaps(dependencies: any[]) {
  const { library, chainId } = useEthers();
  const config = getConfig(chainId);
  const [swaps, setSwaps] = useState<number>(0);

  useEffect(() => {
    const loadSwaps = async () => {
      if (library) {
        const lutiswap = new Contract(
          config.lutiswap.address,
          config.lutiswap.abi,
          library
        );
        const swapLogs = await lutiswap.queryFilter(lutiswap.filters.Swap());
        setSwaps(swapLogs.length);
      }
    };
    loadSwaps();
  }, [library, config.lutiswap.abi, config.lutiswap.address, ...dependencies]);

  return swaps;
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
        const token = new Contract(
          config[item].address,
          config[item].abi,
          library
        );
        try {
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
        } catch (e) {
          console.log(e);
        }
      }
    };
    loadTokenIds();
  }, [account, library, config, item, ...dependencies]);

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

export function useSetApprovalForAll(item: Item) {
  const { chainId } = useEthers();
  const config = getConfig(chainId);
  const contract = new Contract(config[item].address, config[item].abi);
  return useContractFunction(contract, "setApprovalForAll", {
    transactionName: "Set Approval for Lutiswap",
  });
}
