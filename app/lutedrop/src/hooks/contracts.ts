import { useContractFunction, useContractCall } from '@usedapp/core'
import { Contract } from '@usedapp/core/node_modules/@ethersproject/contracts'
import { BigNumber } from '@usedapp/core/node_modules/ethers'
import { formatEther, formatUnits } from 'ethers/lib/utils'
import config from '../config/contracts'

const luteDrop = new Contract(config.luteDrop.address, config.luteDrop.abi)
const lutiswap = new Contract(config.lutiswap.address, config.lutiswap.abi)

export function useClaimItem() {
  return useContractFunction(luteDrop, 'claim', {})
}

export function useSwapFlute() {
  return useContractFunction(lutiswap, 'swapExactFluteForLute', {})
}

export function useSwapLute() {
  return useContractFunction(lutiswap, 'swapExactLuteForFlute', {})
}

export function useLatestFluteSwapPrice() {
    const [price]: any = useContractCall({
        abi: config.lutiswap.abi,
        address: config.lutiswap.address,
        method: "latestFluteSwapPrice",
        args: [],
      }) ?? [];
      return price;
}

export function useLatestLuteSwapPrice() {
    const [price]: any = useContractCall({
        abi: config.lutiswap.abi,
        address: config.lutiswap.address,
        method: "latestLuteSwapPrice",
        args: [],
      }) ?? [];
      return price;   
}

export function useFluteTokenIds(fluteBalance: BigNumber | undefined, owner: string | null | undefined, index : number) {
  const [token]: any = useContractCall(fluteBalance && fluteBalance.toNumber() > 0 && {
      abi: config.flute.abi,
      address: config.flute.address,
      method: "tokenOfOwnerByIndex",
      args: [owner, index],
    }) ?? [];
    return token && formatUnits(token, 'wei');   
}

export function useFluteTokenUri(tokenId: string) {
  const [uri]: any = useContractCall({
      abi: config.flute.abi,
      address: config.flute.address,
      method: "tokenURI",
      args: [tokenId],
    }) ?? [];
    return uri;   
}

export function useLuteTokenIds(luteBalance: BigNumber | undefined, owner: string | null | undefined, index : number) {
  const [token]: any = useContractCall(luteBalance && luteBalance.toNumber() > 0 && {
      abi: config.lute.abi,
      address: config.lute.address,
      method: "tokenOfOwnerByIndex",
      args: [owner, index],
    }) ?? [];
    return token && formatUnits(token, 'wei');   
}

export function useLuteTokenUri(tokenId: string) {
  const [uri]: any = useContractCall({
      abi: config.lute.abi,
      address: config.lute.address,
      method: "tokenURI",
      args: [tokenId],
    }) ?? [];
    return uri;   
}

export function useTokenImageSrc(tokenUri: string) {
  return tokenUri && JSON.parse(atob(tokenUri.substring(29)))['image'];
}