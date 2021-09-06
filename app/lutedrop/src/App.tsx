import {
  useContractCall,
  useEtherBalance,
  useEthers,
  useTokenBalance,
} from '@usedapp/core'
import { formatEther, formatUnits } from 'ethers/lib/utils'

import './App.css'
import config from './config/contracts'
import {
  useClaimItem,
  useLatestLuteSwapPrice,
  useLatestFluteSwapPrice,
  useSwapFlute,
  useSwapLute,
} from './hooks/contracts'

export function App() {
  const { activateBrowserWallet, account } = useEthers()
  const etherBalance = useEtherBalance(account)
  const lootBalance = useTokenBalance(config.loot.address, account)
  const mlootBalance = useTokenBalance(config.mloot.address, account)
  const luteBalance = useTokenBalance(config.lute.address, account)
  const fluteBalance = useTokenBalance(config.flute.address, account)
  const luteSwapPrice = useLatestLuteSwapPrice()
  const fluteSwapPrice = useLatestFluteSwapPrice()
  const { state: claimState, send: sendClaim } = useClaimItem()
  const { state: swapFluteState, send: sendSwapFlute } = useSwapFlute()
  const { state: swapLuteState, send: sendSwapLute } = useSwapLute()

  const claimLute = () => {
    sendClaim(0, 1, 1311550)
  }

  const claimFlute = () => {
    sendClaim(1, 1, 152963)
  }

  const swapFlute = () => {
    sendSwapFlute();
  }

  const swapLute = () => {
    sendSwapLute();
  }

  return (
    <div>
      <div>
        <button onClick={() => activateBrowserWallet()}>Connect</button>
      </div>
      <div>
        {account && <p>Account: {account}</p>}
        {etherBalance && <p>ETH balance: {formatEther(etherBalance)}</p>}
        {lootBalance && <p>LOOT balance: {formatUnits(lootBalance, 'wei')}</p>}
        {mlootBalance && (
          <p>MLOOT balance: {formatUnits(mlootBalance, 'wei')}</p>
        )}
        {luteBalance && <p>LUTE balance: {formatUnits(luteBalance, 'wei')}</p>}
        {fluteBalance && (
          <p>FLUTE balance: {formatUnits(fluteBalance, 'wei')}</p>
        )}
      </div>
      <div>
        {claimState && claimState.status}
        {claimState && claimState.errorMessage}
      </div>
      <div>
        <button onClick={claimLute}>Claim LUTE</button>
      </div>

      <div>
        <button onClick={claimFlute}>Claim FLUTE</button>
      </div>
      <div>
        {luteSwapPrice && luteSwapPrice}
        {swapLuteState && swapLuteState.status}
        {swapLuteState && swapLuteState.errorMessage}
      </div>
      <div>
        <button onClick={swapLute}>Swap LUTE</button>
      </div>
      <div>
        {fluteSwapPrice && fluteSwapPrice}
        {swapFluteState && swapFluteState.status}
        {swapFluteState && swapFluteState.errorMessage}
      </div>
      <div>
        <button onClick={swapLute}>Swap FLUTE</button>
      </div>
    </div>
  )
}

export default App
