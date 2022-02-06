import { parseEther } from "@ethersproject/units";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";

import { LuteDrop, Lute, Flute, Lutiswap } from "../typechain";

interface Contracts {
  lute: Lute;
  flute: Flute;
  luteDrop: LuteDrop;
  lutiswap: Lutiswap;
}

async function deploy(): Promise<Contracts> {
  const ItemLibFactory = await ethers.getContractFactory("ItemLib");
  const itemlib = await (await ItemLibFactory.deploy()).deployed();

  const LuteFactory = await ethers.getContractFactory("Lute", {
    libraries: {
      ItemLib: itemlib.address,
    },
  });
  const lute = (await (await LuteFactory.deploy(true)).deployed()) as Lute;

  const FluteFactory = await ethers.getContractFactory("Flute", {
    libraries: {
      ItemLib: itemlib.address,
    },
  });
  const flute = (await (await FluteFactory.deploy(true)).deployed()) as Flute;

  const LutiswapFactory = await ethers.getContractFactory("Lutiswap");
  const lutiswap = (await (
    await LutiswapFactory.deploy(lute.address, flute.address)
  ).deployed()) as Lutiswap;

  const LuteDropFactory = await ethers.getContractFactory("LuteDrop");
  const luteDrop = (await (
    await LuteDropFactory.deploy(lute.address, flute.address, lutiswap.address)
  ).deployed()) as LuteDrop;
  return { lute, flute, luteDrop, lutiswap };
}

let contracts: Contracts;
let owner: SignerWithAddress,
  nonOwner: SignerWithAddress,
  minter: SignerWithAddress,
  minter1: SignerWithAddress,
  minter2: SignerWithAddress,
  minter3: SignerWithAddress;

const CRAFTER_ROLE = ethers.utils.keccak256(
  ethers.utils.toUtf8Bytes("CRAFTER_ROLE")
);

describe("LuteDrop", () => {
  beforeEach(async () => {
    contracts = await deploy();
    [owner, nonOwner, minter, minter1, minter2, minter3] =
      await ethers.getSigners();
    await contracts.lute
      .connect(owner)
      .grantRole(CRAFTER_ROLE, contracts.luteDrop.address);
    await contracts.flute
      .connect(owner)
      .grantRole(CRAFTER_ROLE, contracts.luteDrop.address);
  });

  describe("configuration", () => {
    it("stores the Lute contract", async () => {
      expect(await contracts.luteDrop.lute()).to.equal(contracts.lute.address);
    });

    it("stores the Flute contract", async () => {
      expect(await contracts.luteDrop.flute()).to.equal(
        contracts.flute.address
      );
    });

    it("stores the Lutiswap contract", async () => {
      expect(await contracts.luteDrop.lutiswap()).to.equal(
        contracts.lutiswap.address
      );
    });
  });

  describe("minting", () => {
    const fee = parseEther("1");

    beforeEach(async () => {
      await contracts.luteDrop.connect(owner).addDrop(fee, 2, 2);
    });

    it("reverts on invalid drop ID", async () => {
      await expect(
        contracts.luteDrop.connect(minter).craft(0, 0, { value: fee })
      ).to.be.revertedWith("Invalid drop ID");
    });

    it("loot holders can craft a lute", async () => {
      await contracts.luteDrop.connect(minter).craft(0, 1, { value: fee });
      expect(await contracts.lute.balanceOf(minter.address)).to.equal(1);
    });

    it("loot holders can craft a flute", async () => {
      await contracts.luteDrop.connect(minter).craft(1, 1, { value: fee });
      expect(await contracts.flute.balanceOf(minter.address)).to.equal(1);
    });

    it("mints a flute to lutiswap when a lute is crafted", async () => {
      expect(
        await contracts.flute.balanceOf(contracts.lutiswap.address)
      ).to.equal(0);
      await contracts.luteDrop.connect(minter).craft(0, 1, { value: fee });
      expect(
        await contracts.flute.balanceOf(contracts.lutiswap.address)
      ).to.equal(1);
    });

    it("mints a lute to lutiswap when a flute is crafted", async () => {
      expect(
        await contracts.lute.balanceOf(contracts.lutiswap.address)
      ).to.equal(0);
      await contracts.luteDrop.connect(minter).craft(1, 1, { value: fee });
      expect(
        await contracts.lute.balanceOf(contracts.lutiswap.address)
      ).to.equal(1);
    });

    it("emits a Craft event", async () => {
      await expect(
        contracts.luteDrop.connect(minter).craft(1, 1, { value: fee })
      )
        .to.emit(contracts.luteDrop, "Craft")
        .withArgs(minter.address, 1, fee);
    });

    it("reverts on invalid items", async () => {
      await expect(
        contracts.luteDrop.connect(minter).craft(3, 1, { value: fee })
      ).to.be.revertedWith(
        "Transaction reverted: function was called with incorrect parameters"
      );
    });

    it("reverts if supply is fully crafted", async () => {
      await contracts.luteDrop.connect(minter1).craft(0, 1, { value: fee });
      await contracts.luteDrop.connect(minter2).craft(0, 1, { value: fee });
      await expect(
        contracts.luteDrop.connect(minter3).craft(0, 1, { value: fee })
      ).to.be.revertedWith("Supply fully crafted");
    });

    it("reverts on insufficient payment", async () => {
      await expect(
        contracts.luteDrop
          .connect(minter)
          .craft(0, 1, { value: fee.sub(parseEther("0.01")) })
      ).to.be.revertedWith("Insufficient payment");
    });

    it("reverts if exceeding max crafts", async () => {
      await contracts.luteDrop.connect(minter).craft(0, 1, { value: fee });
      await contracts.luteDrop.connect(minter).craft(0, 1, { value: fee });
      await expect(
        contracts.luteDrop.connect(minter).craft(0, 1, { value: fee })
      ).to.be.revertedWith("Already crafted max");
    });
  });

  describe("fees", () => {
    const fee = parseEther("1");

    beforeEach(async () => {
      await contracts.luteDrop.connect(owner).addDrop(fee, 1, 10);
      await contracts.luteDrop.connect(minter).craft(0, 1, { value: fee });
    });

    it("contract holds ETH from fees", async () => {
      expect(
        await ethers.provider.getBalance(contracts.luteDrop.address)
      ).to.equal(fee);
    });

    it("owner can withdraw ETH from fees", async () => {
      const ownerBalance = await ethers.provider.getBalance(owner.address);
      const tx = await contracts.luteDrop
        .connect(owner)
        .withdraw(owner.address, fee);
      const receipt = await tx.wait();
      const gasSpent = receipt.gasUsed.mul(tx.gasPrice || 0);
      expect(
        await ethers.provider.getBalance(contracts.luteDrop.address)
      ).to.equal(0);
      expect(await ethers.provider.getBalance(owner.address)).to.equal(
        ownerBalance.add(fee).sub(gasSpent)
      );
    });

    it("emits a Withdraw event", async () => {
      await expect(
        contracts.luteDrop.connect(owner).withdraw(owner.address, fee)
      )
        .to.emit(contracts.luteDrop, "Withdraw")
        .withArgs(owner.address, fee);
    });

    it("non-owner cannot withdraw ETH from fees", async () => {
      await expect(
        contracts.luteDrop.connect(nonOwner).withdraw(nonOwner.address, fee)
      ).to.be.revertedWith("caller is not the owner");
    });
  });

  describe("drops", () => {
    it("owner can create new drops", async () => {
      await contracts.luteDrop.connect(owner).addDrop(parseEther("10"), 1, 10);

      const [fee, craftableSupply, craftedSupply, craftsPerAddress] =
        await contracts.luteDrop.drops(1);
      expect(fee).to.equal(parseEther("10"));
      expect(craftableSupply).to.equal(10);
      expect(craftedSupply).to.equal(0);
      expect(craftsPerAddress).to.equal(1);
    });

    it("new drops increment latestDrop", async () => {
      await contracts.luteDrop.connect(owner).addDrop(parseEther("10"), 1, 10);
      expect(await contracts.luteDrop.latestDrop()).to.equal(1);
      await contracts.luteDrop.connect(owner).addDrop(parseEther("10"), 1, 10);
      expect(await contracts.luteDrop.latestDrop()).to.equal(2);
    });

    it("emits AddDrop event", async () => {
      await expect(
        contracts.luteDrop.connect(owner).addDrop(parseEther("10"), 1, 10)
      )
        .to.emit(contracts.luteDrop, "AddDrop")
        .withArgs(1, parseEther("10"), 10, 1);
    });

    it("reverts if craftable supply is zero", async () => {
      await expect(
        contracts.luteDrop.connect(owner).addDrop(parseEther("10"), 1, 0)
      ).to.be.revertedWith("Supply must be > 0");
    });

    it("reverts if drop exceeds craftable supply limit", async () => {
      await contracts.luteDrop.connect(owner).addDrop(parseEther("10"), 1, 100),
        await contracts.luteDrop
          .connect(owner)
          .addDrop(parseEther("10"), 1, 900),
        await contracts.luteDrop
          .connect(owner)
          .addDrop(parseEther("10"), 1, 1500),
        await expect(
          contracts.luteDrop.connect(owner).addDrop(parseEther("10"), 1, 1)
        ).to.be.revertedWith("Exceeds max supply");
    });

    it("non-owner cannot create new drops", async () => {
      await expect(
        contracts.luteDrop.connect(nonOwner).addDrop(parseEther("10"), 1, 10)
      ).to.be.revertedWith("caller is not the owner");
    });
  });
});
