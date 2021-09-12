import { formatUnits } from "@ethersproject/units";
import {
  useContractCall,
  useContractCalls,
  useContractFunction,
} from "@usedapp/core";
import { Interface } from "@usedapp/core/node_modules/@ethersproject/abi";
import { BigNumber, Contract } from "@usedapp/core/node_modules/ethers";
import config from "../config/contracts";

type Item = "flute" | "lute";
type SwapFee = BigNumber | undefined;
type Balance = BigNumber | undefined;

interface ERC721Holding {
  id: number;
}

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
  totalClaimableSupply: number;
  totalClaimedSupply: number;
  remainingClaimableSupply: number;
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
  const [luteSwapFee, fluteSwapFee] =
    (useContractCall({
      abi: config.lutiswap.abi,
      address: config.lutiswap.address,
      method: "latestSwapPrice",
      args: [],
    }) as SwapFee[]) ?? ([] as SwapFee[]);
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
  const totalClaimableSupply = drops.reduce(
    (acc, d) => d.claimableSupply.toNumber() + acc,
    0
  );
  const totalClaimedSupply = drops.reduce(
    (acc, d) => d.claimedSupply.toNumber() + acc,
    0
  );
  const remainingClaimableSupply = totalClaimableSupply - totalClaimedSupply;
  return {
    drops,
    totalClaimableSupply,
    totalClaimedSupply,
    remainingClaimableSupply,
  };
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
  const lootClaims = useClaims(config.loot.address, lootHoldings);
  const lootClaimableHoldings = lootHoldings.filter(
    (h) => !lootClaims.includes(h)
  );
  const mlootClaims = useClaims(config.mloot.address, mlootHoldings);
  const mlootClaimableHoldings = mlootHoldings.filter(
    (h) => !mlootClaims.includes(h)
  );
  const canClaim =
    lootClaimableHoldings.length > 0 || mlootClaimableHoldings.length > 0;
  return {
    luteBalance,
    luteHoldings,
    fluteBalance,
    fluteHoldings,
    lootBalance,
    lootHoldings,
    lootClaims,
    lootClaimableHoldings,
    mlootBalance,
    mlootHoldings,
    mlootClaims,
    mlootClaimableHoldings,
    canClaim,
  };
}

export function useClaims(
  tokenAddress: string,
  tokenHoldings: ERC721Holding[]
) {
  const isClaimedCalls = tokenHoldings.map((holding) => {
    return {
      abi: config.luteDrop.abi,
      address: config.luteDrop.address,
      method: "isClaimed",
      args: [tokenAddress, holding.id],
    };
  });
  const isClaimedResponse = useContractCalls(isClaimedCalls) ?? [];
  const claims = isClaimedResponse.map((res) => res && res[0] === true);
  const claimedHoldings = tokenHoldings.filter((_holding, i) => claims[i]);
  return claimedHoldings;
}

export function useClaimItem() {
  const contract = new Contract(config.luteDrop.address, config.luteDrop.abi);
  return useContractFunction(contract, "claim");
}
