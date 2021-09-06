import { ethers } from "hardhat";
import { Contract } from "ethers";
import { HardhatEthersHelpers } from "@nomiclabs/hardhat-ethers/types";

type Ethers = typeof ethers & HardhatEthersHelpers;

async function logToken(token: Contract, i: number) {
  const material = await token.getMaterial(i);
  const type = await token.getType(i);
  const majorModifier = await token.getMajorModifier(i);
  const minorModifier = await token.getMinorModifier(i);

  const range = await token.getRange(i);
  console.log(material, range, type, majorModifier, minorModifier);
}

export default async function deploy(ethers: Ethers) {
  const Lute = await ethers.getContractFactory("Lute");
  const lute = await Lute.deploy();

  await lute.deployed();

  console.log("Lute deployed to:", lute.address);

  const Flute = await ethers.getContractFactory("Flute");
  const flute = await Flute.deploy();

  await flute.deployed();

  console.log("Flute deployed to:", flute.address);

  console.log("\nFlutes:");
  for (let i = 0; i < 100; i++) {
    await logToken(flute, i);
  }

  console.log("\nLutes:");
  for (let i = 0; i < 100; i++) {
    await logToken(lute, i);
  }
}
