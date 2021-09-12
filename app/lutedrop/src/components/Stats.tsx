import { BigNumber } from '@ethersproject/bignumber'

interface Props {
  luteSupply: number
  fluteSupply: number
  lootDrop: {
    claimableSupply: BigNumber
    claimedSupply: BigNumber
  }
  mlootDrop: {
    claimableSupply: BigNumber
    claimedSupply: BigNumber
  }
}

const Stats = ({ luteSupply, fluteSupply, lootDrop, mlootDrop }: Props) => {
  return (
    <div className="mb-4">
      <h4 className="font-black font-display text-2xl">Stats:</h4>
      <p className="my-2">Lute supply: {luteSupply}</p>
      <p className="my-2">Flute supply: {fluteSupply}</p>
      <p className="my-2">
        Loot claimable supply: {lootDrop && lootDrop.claimableSupply.toNumber()}
      </p>
      <p className="my-2">
        Items claimed with Loot: {lootDrop && lootDrop.claimedSupply.toNumber()}
      </p>
      <p className="my-2">
        mLoot claimable supply: {mlootDrop && mlootDrop.claimableSupply.toNumber()}
      </p>
      <p className="my-2">
        Items claimed with mLoot: {mlootDrop && mlootDrop.claimedSupply.toNumber()}
      </p>
    </div>
  )
}

export default Stats
