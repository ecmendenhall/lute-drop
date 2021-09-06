import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";

import { Lutiswap, Lute, Flute } from "../typechain";

interface Contracts {
  lute: Lute;
  flute: Flute;
  lutiswap: Lutiswap;
}

async function deploy(): Promise<Contracts> {  
  const LuteFactory = await ethers.getContractFactory("Lute");
  const lute = (await (await LuteFactory.deploy()).deployed()) as Lute;

  const FluteFactory = await ethers.getContractFactory("Flute");
  const flute = (await (await FluteFactory.deploy()).deployed()) as Flute;

  const LutiswapFactory = await ethers.getContractFactory("Lutiswap");
  const lutiswap = (await (
    await LutiswapFactory.deploy(lute.address, flute.address)
  ).deployed()) as Lutiswap;
  return { lute, flute, lutiswap };
}

let contracts: Contracts;
let owner: SignerWithAddress,
  nonOwner: SignerWithAddress,
  fluteHolder: SignerWithAddress,
  luteHolder: SignerWithAddress,
  fluteWhale: SignerWithAddress,
  luteWhale: SignerWithAddress;


describe("Lutiswap", () => {
  beforeEach(async () => {
    contracts = await deploy();
    [owner, nonOwner, fluteHolder, luteHolder, fluteWhale, luteWhale] = await ethers.getSigners();

    await contracts.flute.connect(owner).craft(fluteHolder.address);
    await contracts.lute.connect(owner).craft(luteHolder.address);

    await contracts.flute.connect(owner).craft(fluteWhale.address);
    await contracts.flute.connect(owner).craft(fluteWhale.address);
    await contracts.flute.connect(owner).craft(fluteWhale.address);

    await contracts.lute.connect(owner).craft(luteWhale.address);
    await contracts.lute.connect(owner).craft(luteWhale.address);
    await contracts.lute.connect(owner).craft(luteWhale.address);

    contracts.lute.connect(owner).transferOwnership(contracts.lutiswap.address);
    contracts.flute
      .connect(owner)
      .transferOwnership(contracts.lutiswap.address);
  });

  describe("configuration", () => {
    it("stores the Lute contract", async () => {
      expect(await contracts.lutiswap.lute()).to.equal(contracts.lute.address);
    });

    it("stores the Flute contract", async () => {
      expect(await contracts.lutiswap.flute()).to.equal(contracts.flute.address);
    });
  });

  describe("swaps", () => {
    describe("flutes", () => {
      it("burns the swapped flute", async () => {
        expect(await contracts.flute.balanceOf(fluteHolder.address)).to.equal(1);
        expect(await contracts.flute.ownerOf(0)).to.equal(fluteHolder.address);
        await contracts.lutiswap.connect(fluteHolder).swapExactFluteForLute(0);
        expect(await contracts.flute.balanceOf(fluteHolder.address)).to.equal(0);
      });

      it("mints a lute", async () => {
        expect(await contracts.lute.balanceOf(fluteHolder.address)).to.equal(0);
        await contracts.lutiswap.connect(fluteHolder).swapExactFluteForLute(0);
        expect(await contracts.lute.balanceOf(fluteHolder.address)).to.equal(1);
      });
    })
  });
});
