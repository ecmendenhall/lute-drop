import { Contract, ethers } from "ethers";
import { HardhatEthersHelpers } from "@nomiclabs/hardhat-ethers/types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { parseEther } from "ethers/lib/utils";

type Ethers = typeof ethers & HardhatEthersHelpers;

const CRAFTER_ROLE = ethers.utils.keccak256(
  ethers.utils.toUtf8Bytes("CRAFTER_ROLE")
);

async function logToken(token: Contract, i: number) {
  const material = await token.getMaterial(i);
  const type = await token.getType(i);
  const majorModifier = await token.getMajorModifier(i);
  const minorModifier = await token.getMinorModifier(i);

  const range = await token.getRange(i);
  console.log(material, range, type, majorModifier, minorModifier);
}

async function logTokens(lute: Contract, flute: Contract) {
  console.log("\nLutes:");
  for (let i = 0; i < 20; i++) {
    await logToken(lute, i);
  }

  console.log("\nFlutes:");
  for (let i = 0; i < 20; i++) {
    await logToken(flute, i);
  }
}

async function deployMultiCall(ethers: Ethers) {
  const Multicall = await ethers.getContractFactory("Multicall");
  const multicall = await Multicall.deploy();
  await multicall.deployed();

  console.log("Multicall deployed to:", multicall.address);
}

async function deployCoreContracts(ethers: Ethers) {
  const ItemLibFactory = await ethers.getContractFactory("ItemLib");
  const itemlib = await (await ItemLibFactory.deploy()).deployed();
  console.log("ItemLib deployed to:", itemlib.address);

  const Lute = await ethers.getContractFactory("Lute", {
    libraries: {
      ItemLib: itemlib.address,
    },
  });
  const lute = await Lute.deploy(true);
  await lute.deployed();

  console.log("Lute deployed to:", lute.address);

  const Flute = await ethers.getContractFactory("Flute", {
    libraries: {
      ItemLib: itemlib.address,
    },
  });
  const flute = await Flute.deploy(true);
  await flute.deployed();

  console.log("Flute deployed to:", flute.address);

  const Lutiswap = await ethers.getContractFactory("Lutiswap");
  const lutiswap = await Lutiswap.deploy(lute.address, flute.address);
  await lutiswap.deployed();

  console.log("Lutiswap deployed to:", lutiswap.address);

  const LuteDrop = await ethers.getContractFactory("LuteDrop");
  const luteDrop = await LuteDrop.deploy(
    lute.address,
    flute.address,
    lutiswap.address
  );
  await luteDrop.deployed();

  console.log("LuteDrop deployed to:", luteDrop.address);
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

  console.log("Granting Flute roles...");
  await flute.grantRole(CRAFTER_ROLE, luteDrop.address);
}

async function craftItems(
  lute: Contract,
  flute: Contract,
  lutiswap: Contract,
  owner: SignerWithAddress
) {
  console.log("Crafting Lutes/Flutes to owner...");
  await lute.grantRole(CRAFTER_ROLE, owner.address);
  await flute.grantRole(CRAFTER_ROLE, owner.address);
  for (let i = 0; i < 30; i++) {
    await lute.craft(lutiswap.address);
  }
  for (let i = 0; i < 20; i++) {
    await flute.craft(lutiswap.address);
  }
}

async function addDrop(luteDrop: Contract, owner: SignerWithAddress) {
  console.log("Adding new Drop...");
  await luteDrop.connect(owner).addDrop(parseEther("1"), 5, 100);
}

export async function deployMainnet(ethers: Ethers) {
  const [owner] = await ethers.getSigners();

  const { lute, flute, luteDrop, lutiswap } = await deployCoreContracts(ethers);
  await grantRoles(lute, flute, luteDrop, lutiswap);
  await luteDrop.connect(owner).addDrop(parseEther("1"), 5, 100);
}

export async function deployTestnet(ethers: Ethers) {
  const [owner] = await ethers.getSigners();

  const { lute, flute, luteDrop, lutiswap } = await deployCoreContracts(ethers);
  await grantRoles(lute, flute, luteDrop, lutiswap);
  //await addDrop(luteDrop, owner);
  await luteDrop.connect(owner).addDrop(parseEther("0.02"), 5, 100);
  await lutiswap.connect(owner).setBaseFee(parseEther("0.01"));
}

export async function deployLocal(ethers: Ethers) {
  const [owner] = await ethers.getSigners();

  await deployMultiCall(ethers);
  const { lute, flute, luteDrop, lutiswap } = await deployCoreContracts(ethers);
  await grantRoles(lute, flute, luteDrop, lutiswap);
  await addDrop(luteDrop, owner);
  await owner.sendTransaction({
    to: "0xe979054eB69F543298406447D8AB6CBBc5791307",
    value: ethers.utils.parseEther("1000"),
  });
}
