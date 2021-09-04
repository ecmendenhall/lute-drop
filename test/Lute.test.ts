import { expect } from 'chai'
import { ethers } from 'hardhat'

import { Lute } from '../typechain'

interface Contracts {
  lute: Lute
}

async function deploy(): Promise<Contracts> {
  const LuteFactory = await ethers.getContractFactory('Lute')
  const lute = (await (await LuteFactory.deploy()).deployed()) as Lute

  return { lute }
}

let contracts: Contracts

describe('Lute', () => {
  beforeEach(async () => {
    contracts = await deploy()
  })

  describe('material', () => {
    it('gets lute material', async function () {
      expect(await contracts.lute.getMaterial(0)).to.equal('Ebony')
    })

    it('lutes have different materials', async function () {
      expect(await contracts.lute.getMaterial(1)).to.equal('Ebony')
      expect(await contracts.lute.getMaterial(2)).to.equal('Walnut')
      expect(await contracts.lute.getMaterial(3)).to.equal('Walnut')
      expect(await contracts.lute.getMaterial(4)).to.equal('Walnut')
      expect(await contracts.lute.getMaterial(5)).to.equal('Ebony')
      expect(await contracts.lute.getMaterial(6)).to.equal('Ebony')
      expect(await contracts.lute.getMaterial(7)).to.equal('Pine')
      expect(await contracts.lute.getMaterial(8)).to.equal('Pine')
      expect(await contracts.lute.getMaterial(9)).to.equal('Walnut')
    })
  })

  describe('type', () => {
    it('gets lute type', async function () {
      expect(await contracts.lute.getType(0)).to.equal('Oud')
    })

    it('lutes have different types', async function () {
      expect(await contracts.lute.getType(1)).to.equal('Oud')
      expect(await contracts.lute.getType(2)).to.equal('Lute')
      expect(await contracts.lute.getType(3)).to.equal('Mandolin')
      expect(await contracts.lute.getType(4)).to.equal('Mandolin')
      expect(await contracts.lute.getType(5)).to.equal('Oud')
      expect(await contracts.lute.getType(6)).to.equal('Lute')
      expect(await contracts.lute.getType(7)).to.equal('Oud')
      expect(await contracts.lute.getType(8)).to.equal('Mandolin')
      expect(await contracts.lute.getType(9)).to.equal('Mandolin')
    })
  })

  describe('modifier', () => {
    it('gets lute modifier', async function () {
      expect(await contracts.lute.getModifier(0)).to.equal('Four-Stringed')
    })

    it('lutes have different modifiers', async function () {
      expect(await contracts.lute.getModifier(1)).to.equal('Three-Stringed')
      expect(await contracts.lute.getModifier(2)).to.equal('Four-Stringed')
      expect(await contracts.lute.getModifier(3)).to.equal('Three-Stringed')
      expect(await contracts.lute.getModifier(4)).to.equal('Four-Stringed')
      expect(await contracts.lute.getModifier(5)).to.equal('Three-Stringed')
      expect(await contracts.lute.getModifier(6)).to.equal('Three-Stringed')
      expect(await contracts.lute.getModifier(7)).to.equal('Two-Stringed')
      expect(await contracts.lute.getModifier(8)).to.equal('Two-Stringed')
      expect(await contracts.lute.getModifier(9)).to.equal('Two-Stringed')
    })
  })

  describe('register', () => {
    it('gets lute register', async function () {
      expect(await contracts.lute.getRegister(0)).to.equal('Bass')
    })

    it('lutes have different registers', async function () {
      expect(await contracts.lute.getRegister(1)).to.equal('Tenor')
      expect(await contracts.lute.getRegister(2)).to.equal('Tenor')
      expect(await contracts.lute.getRegister(3)).to.equal('Tenor')
      expect(await contracts.lute.getRegister(4)).to.equal('Baritone')
      expect(await contracts.lute.getRegister(5)).to.equal('Tenor')
      expect(await contracts.lute.getRegister(6)).to.equal('Tenor')
      expect(await contracts.lute.getRegister(7)).to.equal('Bass')
      expect(await contracts.lute.getRegister(8)).to.equal('Tenor')
      expect(await contracts.lute.getRegister(9)).to.equal('Bass')
    })
  })
})
