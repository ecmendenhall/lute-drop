import { formatUnits } from '@ethersproject/units'
import { useContractCall, useContractCalls } from '@usedapp/core'
import { Falsy } from '@usedapp/core/dist/esm/src/model/types'
import { BigNumber } from '@usedapp/core/node_modules/ethers'
import config from '../config/contracts'

type Item = 'flute' | 'lute'
type SwapFee = BigNumber | undefined;

interface LutiswapState {
    luteSwapFee: SwapFee;
    fluteSwapFee: SwapFee;
}

export function useItemSupply(item: Item | Falsy) {
  const [totalSupply] =
    useContractCall(
      item && {
        abi: config[item].abi,
        address: config[item].address,
        method: 'totalSupply',
        args: [],
      },
    ) ?? []
  return totalSupply && formatUnits(totalSupply, 'wei')
}

export function useItem(item: Item, id: number) {
  const [tokenURI] =
    useContractCall(
      item && {
        abi: config[item].abi,
        address: config[item].address,
        method: 'tokenURI',
        args: [id],
      },
    ) ?? []
  return tokenURI && JSON.parse(atob(tokenURI.substring(29)))
}

export function useLutiswap() : LutiswapState {
  const [luteSwapFeeResponse, fluteSwapFeeResponse] =
    useContractCalls([
      {
        abi: config.lutiswap.abi,
        address: config.lutiswap.address,
        method: 'latestLuteSwapPrice',
        args: [],
      },
      {
        abi: config.lutiswap.abi,
        address: config.lutiswap.address,
        method: 'latestFluteSwapPrice',
        args: [],
      },
    ]) as SwapFee[][] ?? [] as SwapFee[][]
    const [luteSwapFee] = luteSwapFeeResponse ?? [];
    const [fluteSwapFee] = fluteSwapFeeResponse ?? [];
  return { luteSwapFee, fluteSwapFee }
}
