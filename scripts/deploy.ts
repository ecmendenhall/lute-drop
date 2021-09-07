import { Contract, ethers } from "ethers";
import { HardhatEthersHelpers } from "@nomiclabs/hardhat-ethers/types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

type Ethers = typeof ethers & HardhatEthersHelpers;

const LOOT_ADDRESS = "0xFF9C1b15B16263C61d017ee9F65C50e4AE0113D7";
const MLOOT_ADDRESS = "0x1dfe7ca09e99d10835bf73044a23b73fc20623df";
const LOOT_SUPPLY = 1000;
const MLOOT_SUPPLY = 10000;

const CRAFTER_ROLE = ethers.utils.keccak256(
  ethers.utils.toUtf8Bytes("CRAFTER_ROLE")
);
const BURNER_ROLE = ethers.utils.keccak256(
  ethers.utils.toUtf8Bytes("BURNER_ROLE")
);

async function logToken(token: Contract, i: number) {
  const material = await token.getMaterial(i);
  const type = await token.getType(i);
  const majorModifier = await token.getMajorModifier(i);
  const minorModifier = await token.getMinorModifier(i);

  const range = await token.getRange(i);
  console.log(material, range, type, majorModifier, minorModifier);
}

async function logTokens(flute: Contract, lute: Contract) {
  console.log("\nFlutes:");
  for (let i = 0; i < 100; i++) {
    await logToken(flute, i);
  }

  console.log("\nLutes:");
  for (let i = 0; i < 100; i++) {
    await logToken(lute, i);
  }
}

export default async function deploy(ethers: Ethers) {
  const [owner] = await ethers.getSigners();

  const Multicall = await ethers.getContractFactory("Multicall");
  const multicall = await Multicall.deploy();
  await multicall.deployed();

  console.log("Multicall deployed to:", multicall.address);

  const Lute = await ethers.getContractFactory("Lute");
  const lute = await Lute.deploy();
  await lute.deployed();

  console.log("Lute deployed to:", lute.address);

  const Flute = await ethers.getContractFactory("Flute");
  const flute = await Flute.deploy();
  await flute.deployed();

  console.log("Flute deployed to:", flute.address);

  const LuteDrop = await ethers.getContractFactory("LuteDrop");
  const luteDrop = await LuteDrop.deploy(
    lute.address,
    flute.address,
    LOOT_ADDRESS,
    MLOOT_ADDRESS,
    LOOT_SUPPLY,
    MLOOT_SUPPLY
  );
  await luteDrop.deployed();

  console.log("LuteDrop deployed to:", luteDrop.address);

  const Lutiswap = await ethers.getContractFactory("Lutiswap");
  const lutiswap = await Lutiswap.deploy(lute.address, flute.address);
  await lutiswap.deployed();

  console.log("Lutiswap deployed to:", lutiswap.address);

  console.log("Granting Lute roles...");
  await lute.grantRole(CRAFTER_ROLE, owner.address);
  await lute.grantRole(CRAFTER_ROLE, luteDrop.address);
  await lute.grantRole(CRAFTER_ROLE, lutiswap.address);
  await lute.grantRole(BURNER_ROLE, lutiswap.address);

  console.log("Granting Flute roles...");
  await flute.grantRole(CRAFTER_ROLE, owner.address);
  await flute.grantRole(CRAFTER_ROLE, luteDrop.address);
  await flute.grantRole(CRAFTER_ROLE, lutiswap.address);
  await flute.grantRole(BURNER_ROLE, lutiswap.address);

  console.log("Crafting Lutes/Flutes to owner...");
  for (let i = 0; i < 10; i++) {
    await lute.craft(owner.address);
    await flute.craft(owner.address);
  }
}
