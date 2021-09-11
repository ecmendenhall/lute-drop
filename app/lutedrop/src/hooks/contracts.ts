import { formatUnits } from "@ethersproject/units";
import { useContractCall, useContractCalls } from "@usedapp/core";
import { Interface } from "@usedapp/core/node_modules/@ethersproject/abi";
import { BigNumber } from "@usedapp/core/node_modules/ethers";
import config from "../config/contracts";

type Item = "flute" | "lute";
type SwapFee = BigNumber | undefined;
type Balance = BigNumber | undefined;

interface LutiswapState {
  luteSwapFee: SwapFee;
  fluteSwapFee: SwapFee;
}

interface Drop {
  address: string;
  claimableSupply: BigNumber;
  claimedSupply: BigNumber;
}

interface LuteDropState {
  drops: Drop[];
}

interface TokenBalanceState {
  luteBalance: Balance;
  fluteBalance: Balance;
  lootBalance: Balance;
  mlootBalance: Balance;
}

const range = (i: number) => {
  return Array.from({ length: i }, (_x, i) => i);
};

const parseMetadata = (tokenURI: string) => {
  return JSON.parse(atob(tokenURI.substring(29)));
};

export function useItemSupply(item: Item) {
  const [totalSupply] =
    useContractCall({
      abi: config[item].abi,
      address: config[item].address,
      method: "totalSupply",
      args: [],
    }) ?? [];
  return totalSupply && formatUnits(totalSupply, "wei");
}

export function useItem(item: Item, id: number) {
  const [tokenURI] =
    useContractCall({
      abi: config[item].abi,
      address: config[item].address,
      method: "tokenURI",
      args: [id],
    }) ?? [];
  return tokenURI && parseMetadata(tokenURI);
}

export function useNextItem(item: Item) {
  const [tokenId] =
    useContractCall({
      abi: config[item].abi,
      address: config[item].address,
      method: "nextId",
      args: [],
    }) ?? [];
  console.log(tokenId);
  const [tokenURI] =
    useContractCall(
      tokenId && {
        abi: config[item].abi,
        address: config[item].address,
        method: "tokenURI",
        args: [tokenId],
      }
    ) ?? [];
  return tokenURI && parseMetadata(tokenURI);
}

export function useLutiswap(): LutiswapState {
  const [luteSwapFeeResponse, fluteSwapFeeResponse] =
    (useContractCalls([
      {
        abi: config.lutiswap.abi,
        address: config.lutiswap.address,
        method: "latestLuteSwapPrice",
        args: [],
      },
      {
        abi: config.lutiswap.abi,
        address: config.lutiswap.address,
        method: "latestFluteSwapPrice",
        args: [],
      },
    ]) as SwapFee[][]) ?? ([] as SwapFee[][]);
  const [luteSwapFee] = luteSwapFeeResponse ?? [];
  const [fluteSwapFee] = fluteSwapFeeResponse ?? [];
  return { luteSwapFee, fluteSwapFee };
}

export function useLuteDrop(): LuteDropState {
  const dropIdsResponse =
    useContractCalls([
      {
        abi: config.luteDrop.abi,
        address: config.luteDrop.address,
        method: "dropId",
        args: [config.loot.address],
      },
      {
        abi: config.luteDrop.abi,
        address: config.luteDrop.address,
        method: "dropId",
        args: [config.mloot.address],
      },
    ]) ?? [];
  const dropIds = dropIdsResponse
    .map((res) => res && res[0])
    .filter((id) => !!id);
  const dropDataCalls = dropIds.map((dropId) => {
    return {
      abi: config.luteDrop.abi,
      address: config.luteDrop.address,
      method: "drops",
      args: [dropId],
    };
  });
  const dropDataResponse = useContractCalls(dropDataCalls) ?? [];
  console.log(dropDataResponse);
  const isDrop = (item: Drop | undefined): item is Drop => {
    return !!item;
  };
  const drops = dropDataResponse
    .map(
      (res) =>
        res && {
          address: res[0],
          claimableSupply: res[1],
          claimedSupply: res[2],
        }
    )
    .filter(isDrop);
  return { drops };
}

export function useTokenBalances(
  owner: string | null | undefined
): TokenBalanceState {
  const [
    luteBalanceResponse,
    fluteBalanceResponse,
    lootBalanceResponse,
    mlootBalanceResponse,
  ] =
    (useContractCalls([
      owner && {
        abi: config.lute.abi,
        address: config.lute.address,
        method: "balanceOf",
        args: [owner],
      },
      owner && {
        abi: config.flute.abi,
        address: config.flute.address,
        method: "balanceOf",
        args: [owner],
      },
      owner && {
        abi: config.loot.abi,
        address: config.loot.address,
        method: "balanceOf",
        args: [owner],
      },
      owner && {
        abi: config.mloot.abi,
        address: config.mloot.address,
        method: "balanceOf",
        args: [owner],
      },
    ]) as Balance[][]) ?? ([] as Balance[][]);
  const [luteBalance] = luteBalanceResponse ?? [];
  const [fluteBalance] = fluteBalanceResponse ?? [];
  const [lootBalance] = lootBalanceResponse ?? [];
  const [mlootBalance] = mlootBalanceResponse ?? [];
  return { luteBalance, fluteBalance, lootBalance, mlootBalance };
}

export function useERC721Holdings(
  owner: string | null | undefined,
  balance: BigNumber | undefined,
  abi: Interface,
  address: string
) {
  const tokenIdCalls = range(balance?.toNumber() || 0).map(
    (index) =>
      owner && {
        abi: abi,
        address: address,
        method: "tokenOfOwnerByIndex",
        args: [owner, index],
      }
  );
  const tokenIdsResponse = useContractCalls(tokenIdCalls) ?? [];
  const tokenIds = tokenIdsResponse
    .map((res) => res && res[0])
    .filter((id) => !!id);
  const tokenMetadataCalls = tokenIds.map((tokenId) => {
    return {
      abi: abi,
      address: address,
      method: "tokenURI",
      args: [tokenId],
    };
  });
  const tokenMetadataResponse = useContractCalls(tokenMetadataCalls) ?? [];
  const tokenUris = tokenMetadataResponse
    .map((res) => res && res[0])
    .filter((id) => !!id)
    .map(parseMetadata);
  const tokenData = tokenUris.map((metadata, i) => {
    return {
      id: tokenIds[i],
      ...metadata,
    };
  });
  return { tokenData };
}

export function useTokenHoldings(owner: string | null | undefined) {
  const { luteBalance, fluteBalance, lootBalance, mlootBalance } =
    useTokenBalances(owner);
  const { tokenData: luteHoldings } = useERC721Holdings(
    owner,
    luteBalance,
    config.lute.abi,
    config.lute.address
  );
  const { tokenData: fluteHoldings } = useERC721Holdings(
    owner,
    fluteBalance,
    config.flute.abi,
    config.flute.address
  );
  const { tokenData: lootHoldings } = useERC721Holdings(
    owner,
    lootBalance,
    config.loot.abi,
    config.loot.address
  );
  const { tokenData: mlootHoldings } = useERC721Holdings(
    owner,
    mlootBalance,
    config.mloot.abi,
    config.mloot.address
  );
  return {
    luteBalance,
    luteHoldings,
    fluteBalance,
    fluteHoldings,
    lootBalance,
    lootHoldings,
    mlootBalance,
    mlootHoldings,
  };
}
