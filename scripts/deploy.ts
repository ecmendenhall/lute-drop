import { Contract, ethers } from "ethers";
import { HardhatEthersHelpers } from "@nomiclabs/hardhat-ethers/types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

type Ethers = typeof ethers & HardhatEthersHelpers;

const LOOT_ADDRESS = "0xFF9C1b15B16263C61d017ee9F65C50e4AE0113D7";
const MLOOT_ADDRESS = "0x1dfe7ca09e99d10835bf73044a23b73fc20623df";
const LOOT_ADDRESS_ROPSTEN = "0x0bC5ade1c02E930F625C8C74408bc87C770B5b9b";
const MLOOT_ADDRESS_ROPSTEN = "";
const LOOT_ADDRESS_RINKEBY = "0x56689336863f1917f301830b377B583dB39d6C4D";
const MLOOT_ADDRESS_RINKEBY = "0x56689336863f1917f301830b377B583dB39d6C4D";
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

async function deployMultiCall(ethers: Ethers) {
  const Multicall = await ethers.getContractFactory("Multicall");
  const multicall = await Multicall.deploy();
  await multicall.deployed();

  console.log("Multicall deployed to:", multicall.address);
}

async function deployLoot(ethers: Ethers) {
  const Loot = await ethers.getContractFactory("Loot");
  const loot = await Loot.deploy({ gasLimit: 7_000_000 });
  await loot.deployed();

  console.log("LOOT deployed to:", loot.address);

  const MLoot = await ethers.getContractFactory("TemporalLoot");
  const mloot = await MLoot.deploy({ gasLimit: 8_000_000 });
  await mloot.deployed();

  console.log("MLOOT deployed to:", mloot.address);

  return { loot, mloot };
}

async function deployCoreContracts(
  ethers: Ethers,
  lootAddress: string,
  mlootAddress: string,
  lootSupply: number,
  mlootSupply: number
) {
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
    lootAddress,
    mlootAddress,
    lootSupply,
    mlootSupply
  );
  await luteDrop.deployed();

  console.log("LuteDrop deployed to:", luteDrop.address);

  const Lutiswap = await ethers.getContractFactory("Lutiswap");
  const lutiswap = await Lutiswap.deploy(lute.address, flute.address);
  await lutiswap.deployed();

  console.log("Lutiswap deployed to:", lutiswap.address);
  return { lute, flute, luteDrop, lutiswap };
}

async function grantRoles(
  lute: Contract,
  flute: Contract,
  luteDrop: Contract,
  lutiswap: Contract
) {
  console.log("Granting Lute roles...");
  await lute.grantRole(CRAFTER_ROLE, luteDrop.address);
  await lute.grantRole(CRAFTER_ROLE, lutiswap.address);
  await lute.grantRole(BURNER_ROLE, lutiswap.address);

  console.log("Granting Flute roles...");
  await flute.grantRole(CRAFTER_ROLE, luteDrop.address);
  await flute.grantRole(CRAFTER_ROLE, lutiswap.address);
  await flute.grantRole(BURNER_ROLE, lutiswap.address);
}

async function craftItems(
  lute: Contract,
  flute: Contract,
  owner: SignerWithAddress
) {
  console.log("Crafting Lutes/Flutes to owner...");
  await lute.grantRole(CRAFTER_ROLE, owner.address);
  await flute.grantRole(CRAFTER_ROLE, owner.address);
  for (let i = 0; i < 10; i++) {
    await lute.craft(owner.address);
    await flute.craft(owner.address);
  }
}

export async function deployTestnet(ethers: Ethers) {
  const [owner] = await ethers.getSigners();

  const { loot, mloot } = await deployLoot(ethers);
  const { lute, flute, luteDrop, lutiswap } = await deployCoreContracts(
    ethers,
    loot.address,
    mloot.address,
    LOOT_SUPPLY,
    MLOOT_SUPPLY
  );
  await grantRoles(lute, flute, luteDrop, lutiswap);
}

export async function deployLocal(ethers: Ethers) {
  const [owner] = await ethers.getSigners();

  await deployMultiCall(ethers);
  const { lute, flute, luteDrop, lutiswap } = await deployCoreContracts(
    ethers,
    LOOT_ADDRESS,
    MLOOT_ADDRESS,
    LOOT_SUPPLY,
    MLOOT_SUPPLY
  );
  await grantRoles(lute, flute, luteDrop, lutiswap);
  await craftItems(lute, flute, owner);
}
