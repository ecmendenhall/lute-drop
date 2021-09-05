import { expect } from "chai";
import { ethers } from "hardhat";

import { Flute } from "../typechain";

interface Contracts {
  flute: Flute;
}

async function deploy(): Promise<Contracts> {
  const FluteFactory = await ethers.getContractFactory("Flute");
  const flute = (await (await FluteFactory.deploy()).deployed()) as Flute;

  return { flute };
}

let contracts: Contracts;

describe("Flute", () => {
  beforeEach(async () => {
    contracts = await deploy();
  });

  describe("material", () => {
    it("gets flute material", async function () {
      expect(await contracts.flute.getMaterial(0)).to.equal("Gold");
    });

    it("flutes have different materials", async function () {
      expect(await contracts.flute.getMaterial(1)).to.equal("Gold");
      expect(await contracts.flute.getMaterial(2)).to.equal("Silver");
      expect(await contracts.flute.getMaterial(3)).to.equal("Silver");
      expect(await contracts.flute.getMaterial(4)).to.equal("Silver");
      expect(await contracts.flute.getMaterial(5)).to.equal("Gold");
      expect(await contracts.flute.getMaterial(6)).to.equal("Gold");
      expect(await contracts.flute.getMaterial(7)).to.equal("Brass");
      expect(await contracts.flute.getMaterial(8)).to.equal("Brass");
      expect(await contracts.flute.getMaterial(9)).to.equal("Silver");
    });
  });

  describe("type", () => {
    it("gets flute type", async function () {
      expect(await contracts.flute.getType(0)).to.equal("Panpipes");
    });

    it("flutes have different types", async function () {
      expect(await contracts.flute.getType(1)).to.equal("Panpipes");
      expect(await contracts.flute.getType(2)).to.equal("Flute");
      expect(await contracts.flute.getType(3)).to.equal("Ocarina");
      expect(await contracts.flute.getType(4)).to.equal("Ocarina");
      expect(await contracts.flute.getType(5)).to.equal("Panpipes");
      expect(await contracts.flute.getType(6)).to.equal("Flute");
      expect(await contracts.flute.getType(7)).to.equal("Panpipes");
      expect(await contracts.flute.getType(8)).to.equal("Ocarina");
      expect(await contracts.flute.getType(9)).to.equal("Ocarina");
    });
  });

  describe("modifier", () => {
    it("gets flute modifier", async function () {
      expect(await contracts.flute.getModifier(0)).to.equal("Five-Holed");
    });

    it("flutes have different modifiers", async function () {
      expect(await contracts.flute.getModifier(1)).to.equal("Four-Holed");
      expect(await contracts.flute.getModifier(2)).to.equal("Five-Holed");
      expect(await contracts.flute.getModifier(3)).to.equal("Four-Holed");
      expect(await contracts.flute.getModifier(4)).to.equal("Five-Holed");
      expect(await contracts.flute.getModifier(5)).to.equal("Four-Holed");
      expect(await contracts.flute.getModifier(6)).to.equal("Four-Holed");
      expect(await contracts.flute.getModifier(7)).to.equal("Two-Piped");
      expect(await contracts.flute.getModifier(8)).to.equal("Two-Piped");
      expect(await contracts.flute.getModifier(9)).to.equal("Two-Piped");
    });
  });

  describe("register", () => {
    it("gets flute register", async function () {
      expect(await contracts.flute.getRegister(0)).to.equal("Alto");
    });

    it("flutes have different registers", async function () {
      expect(await contracts.flute.getRegister(1)).to.equal("Piccolo");
      expect(await contracts.flute.getRegister(2)).to.equal("Piccolo");
      expect(await contracts.flute.getRegister(3)).to.equal("Piccolo");
      expect(await contracts.flute.getRegister(4)).to.equal("Soprano");
      expect(await contracts.flute.getRegister(5)).to.equal("Piccolo");
      expect(await contracts.flute.getRegister(6)).to.equal("Piccolo");
      expect(await contracts.flute.getRegister(7)).to.equal("Alto");
      expect(await contracts.flute.getRegister(8)).to.equal("Piccolo");
      expect(await contracts.flute.getRegister(9)).to.equal("Alto");
    });
  });
});
