import { ChainId, getExplorerAddressLink, useEthers, shortenAddress } from '@usedapp/core'
import { getConfig } from '../config/contracts'

interface Props {
  name: string
  address: string
  chainId: ChainId
}

const ContractItem = ({ name, address, chainId }: Props) => {
  return (
    <li key={name} className="my-2">
      {name}: <a className="bg-yellow-50 p-1 font-mono text-sm hover:text-yellow-700" href={getExplorerAddressLink(address, chainId)}>{shortenAddress(address)}</a>
    </li>
  )
}

const Contracts = () => {
  const { chainId } = useEthers()
  const config = getConfig(chainId)
  return (
    <>
      {chainId && (
        <div className="mb-4">
          <h4 className="font-black font-display text-2xl">Contracts:</h4>
          <ul className="mb-4">
            <ContractItem
              name="Lute"
              address={config.lute.address}
              chainId={chainId}
            />
            <ContractItem
              name="Flute"
              address={config.flute.address}
              chainId={chainId}
            />
            <ContractItem
              name="LuteDrop"
              address={config.luteDrop.address}
              chainId={chainId}
            />
            <ContractItem
              name="Lutiswap"
              address={config.lutiswap.address}
              chainId={chainId}
            />
            </ul>
            <h4 className="font-black font-display text-2xl">Tokens:</h4>
            <ul>
            <ContractItem
              name="Loot"
              address={config.loot.address}
              chainId={chainId}
            />
           <ContractItem
              name="mLoot"
              address={config.mloot.address}
              chainId={chainId}
            />
          </ul>
        </div>
      )}
    </>
  )
}

export default Contracts
