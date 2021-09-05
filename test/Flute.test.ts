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

  describe("major modifier", () => {
    it("gets flute major modifier", async function () {
      expect(await contracts.flute.getMajorModifier(0)).to.equal("One Pipe");
    });

    it("flutes have different major modifiers", async function () {
      expect(await contracts.flute.getMajorModifier(1)).to.equal("One Pipe");
      expect(await contracts.flute.getMajorModifier(2)).to.equal("Three Pipes");
      expect(await contracts.flute.getMajorModifier(3)).to.equal("Three Pipes");
      expect(await contracts.flute.getMajorModifier(4)).to.equal("Three Pipes");
      expect(await contracts.flute.getMajorModifier(5)).to.equal("Three Pipes");
      expect(await contracts.flute.getMajorModifier(6)).to.equal("Two Pipes");
      expect(await contracts.flute.getMajorModifier(7)).to.equal("Two Pipes");
      expect(await contracts.flute.getMajorModifier(8)).to.equal("One Pipe");
      expect(await contracts.flute.getMajorModifier(9)).to.equal("Two Pipes");
    });
  });

  describe("minor modifier", () => {
    it("gets flute minor modifier", async function () {
      expect(await contracts.flute.getMinorModifier(0)).to.equal("Four Holes");
    });

    it("flutes have different minor modifiers", async function () {
      expect(await contracts.flute.getMinorModifier(1)).to.equal("Five Holes");
      expect(await contracts.flute.getMinorModifier(2)).to.equal("Four Holes");
      expect(await contracts.flute.getMinorModifier(3)).to.equal("Five Holes");
      expect(await contracts.flute.getMinorModifier(4)).to.equal("Six Holes");
      expect(await contracts.flute.getMinorModifier(5)).to.equal("Five Holes");
      expect(await contracts.flute.getMinorModifier(6)).to.equal("Six Holes");
      expect(await contracts.flute.getMinorModifier(7)).to.equal("Four Holes");
      expect(await contracts.flute.getMinorModifier(8)).to.equal("Four Holes");
      expect(await contracts.flute.getMinorModifier(9)).to.equal("Five Holes");
    });
  });

  describe("range", () => {
    it("gets flute range", async function () {
      expect(await contracts.flute.getRange(0)).to.equal("Soprano");
    });

    it("flutes have different ranges", async function () {
      expect(await contracts.flute.getRange(1)).to.equal("Soprano");
      expect(await contracts.flute.getRange(2)).to.equal("Alto");
      expect(await contracts.flute.getRange(3)).to.equal("Alto");
      expect(await contracts.flute.getRange(4)).to.equal("Piccolo");
      expect(await contracts.flute.getRange(5)).to.equal("Soprano");
      expect(await contracts.flute.getRange(6)).to.equal("Alto");
      expect(await contracts.flute.getRange(7)).to.equal("Piccolo");
      expect(await contracts.flute.getRange(8)).to.equal("Soprano");
      expect(await contracts.flute.getRange(9)).to.equal("Alto");
    });
  });
});
