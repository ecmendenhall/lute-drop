import { formatUnits } from "@ethersproject/units";
import { useContractCall, useContractFunction, useEthers } from "@usedapp/core";
import { BigNumber, Contract } from "@usedapp/core/node_modules/ethers";
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

export function useCraftItem() {
  const { chainId } = useEthers();
  const config = getConfig(chainId);
  const contract = new Contract(config.luteDrop.address, config.luteDrop.abi);
  return useContractFunction(contract, "craft");
}
