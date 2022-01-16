import { formatUnits } from "@ethersproject/units";
import { useContractCall, useEthers } from "@usedapp/core";
import { getConfig } from "../config/contracts";

type Item = "flute" | "lute";

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