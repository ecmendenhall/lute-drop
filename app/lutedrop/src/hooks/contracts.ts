import { useContractFunction, useContractCall } from '@usedapp/core'
import { Contract } from '@usedapp/core/node_modules/@ethersproject/contracts'
import config from '../config/contracts'

const luteDrop = new Contract(config.luteDrop.address, config.luteDrop.abi)
const lutiswap = new Contract(config.lutiswap.address, config.lutiswap.abi)

export function useClaimItem() {
  return useContractFunction(luteDrop, 'claim', {})
}

export function useSwapFlute() {
  return useContractFunction(luteDrop, 'swapExactFluteForLute', {})
}

export function useSwapLute() {
  return useContractFunction(luteDrop, 'swapExactLuteForFlute', {})
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