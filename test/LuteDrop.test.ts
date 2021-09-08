import { BigNumber } from "@ethersproject/bignumber";
import { parseEther } from "@ethersproject/units";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Sign } from "crypto";
import { ethers } from "hardhat";
import { parse } from "path/posix";

import { MockERC721, LuteDrop, Lute, Flute } from "../typechain";

interface Contracts {
  loot: MockERC721;
  mloot: MockERC721;
  futureLoot: MockERC721;
  lute: Lute;
  flute: Flute;
  luteDrop: LuteDrop;
}

async function deploy(): Promise<Contracts> {
  const MockERC721Factory = await ethers.getContractFactory("MockERC721");
  const loot = (await (
    await MockERC721Factory.deploy("Mock Loot", "LOOT")
  ).deployed()) as MockERC721;
  const mloot = (await (
    await MockERC721Factory.deploy("Mock mLoot", "MLOOT")
  ).deployed()) as MockERC721;
  const futureLoot = (await (
    await MockERC721Factory.deploy("Mock Future Loot", "MLOOT")
  ).deployed()) as MockERC721;

  const LuteFactory = await ethers.getContractFactory("Lute");
  const lute = (await (await LuteFactory.deploy()).deployed()) as Lute;

  const FluteFactory = await ethers.getContractFactory("Flute");
  const flute = (await (await FluteFactory.deploy()).deployed()) as Flute;

  const LuteDropFactory = await ethers.getContractFactory("LuteDrop");
  const luteDrop = (await (
    await LuteDropFactory.deploy(
      lute.address,
      flute.address,
      loot.address,
      mloot.address,
      2,
      4
    )
  ).deployed()) as LuteDrop;
  return { loot, mloot, futureLoot, lute, flute, luteDrop };
}

let contracts: Contracts;
let owner: SignerWithAddress,
  recipient: SignerWithAddress,
  nonOwner: SignerWithAddress,
  lootHolder1: SignerWithAddress,
  lootHolder2: SignerWithAddress,
  lootWhale: SignerWithAddress,
  mlootHolder1: SignerWithAddress,
  mlootHolder2: SignerWithAddress,
  mlootWhale: SignerWithAddress;

const CRAFTER_ROLE = ethers.utils.keccak256(
  ethers.utils.toUtf8Bytes("CRAFTER_ROLE")
);
const BURNER_ROLE = ethers.utils.keccak256(
  ethers.utils.toUtf8Bytes("BURNER_ROLE")
);

describe("LuteDrop", () => {
  beforeEach(async () => {
    contracts = await deploy();
    [
      owner,
      recipient,
      nonOwner,
      lootHolder1,
      lootHolder2,
      lootWhale,
      mlootHolder1,
      mlootHolder2,
      mlootWhale,
    ] = await ethers.getSigners();
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

    it("stores the Loot contract in a Drop", async () => {
      const [token, _claimableSupply, _claimedSupply] =
        await contracts.luteDrop.drops(1);
      expect(token).to.equal(contracts.loot.address);
    });

    it("stores the mLoot contract in a Drop", async () => {
      const [token, _claimableSupply, _claimedSupply] =
        await contracts.luteDrop.drops(2);
      expect(token).to.equal(contracts.mloot.address);
    });

    it("stores the loot claimable supply", async () => {
      const [_token, claimableSupply, _claimedSupply] =
        await contracts.luteDrop.drops(1);
      expect(claimableSupply).to.equal(2);
    });

    it("stores the mLoot claimable supply", async () => {
      const [_token, claimableSupply, _claimedSupply] =
        await contracts.luteDrop.drops(2);
      expect(claimableSupply).to.equal(4);
    });

    it("stores the loot Drop ID", async () => {
      expect(await contracts.luteDrop.dropId(contracts.loot.address)).to.equal(
        1
      );
    });

    it("stores the mLoot Drop ID", async () => {
      expect(await contracts.luteDrop.dropId(contracts.mloot.address)).to.equal(
        2
      );
    });
  });

  describe("minting", () => {
    beforeEach(async () => {
      await contracts.loot.mintTo(lootHolder1.address, 0);
      await contracts.loot.mintTo(lootHolder2.address, 1);
      await contracts.loot.mintTo(lootWhale.address, 2);
      await contracts.loot.mintTo(lootWhale.address, 3);
      await contracts.loot.mintTo(lootWhale.address, 4);
      await contracts.mloot.mintTo(mlootHolder1.address, 0);
      await contracts.mloot.mintTo(mlootHolder2.address, 1);
      await contracts.mloot.mintTo(mlootWhale.address, 2);
      await contracts.mloot.mintTo(mlootWhale.address, 3);
      await contracts.mloot.mintTo(mlootWhale.address, 4);
    });

    it("reverts on invalid token address", async () => {
      await expect(
        contracts.luteDrop.connect(mlootHolder1).claim(0, owner.address, 0)
      ).to.be.revertedWith("Invalid token address");
    });

    describe("loot holders", () => {
      it("loot holders can claim a lute", async () => {
        await contracts.luteDrop
          .connect(lootHolder1)
          .claim(0, contracts.loot.address, 0);
        expect(await contracts.lute.balanceOf(lootHolder1.address)).to.equal(1);
      });

      it("loot holders can claim a flute", async () => {
        await contracts.luteDrop
          .connect(lootHolder1)
          .claim(1, contracts.loot.address, 0);
        expect(await contracts.flute.balanceOf(lootHolder1.address)).to.equal(
          1
        );
      });

      it("reverts on invalid items", async () => {
        await expect(
          contracts.luteDrop
            .connect(lootHolder1)
            .claim(3, contracts.loot.address, 0)
        ).to.be.revertedWith(
          "Transaction reverted: function was called with incorrect parameters"
        );
      });

      it("reverts if supply is fully claimed", async () => {
        await contracts.luteDrop
          .connect(lootHolder1)
          .claim(0, contracts.loot.address, 0);
        await contracts.luteDrop
          .connect(lootHolder2)
          .claim(0, contracts.loot.address, 1);
        await expect(
          contracts.luteDrop
            .connect(lootWhale)
            .claim(0, contracts.loot.address, 2)
        ).to.be.revertedWith("Token holder supply fully claimed");
      });

      it("loot holders can claim only one item per token", async () => {
        await contracts.luteDrop
          .connect(lootWhale)
          .claim(0, contracts.loot.address, 2);
        expect(
          contracts.luteDrop
            .connect(lootWhale)
            .claim(1, contracts.loot.address, 2)
        ).to.be.revertedWith("Item already claimed");
      });

      it("loot holders cannot claim for unowned tokens", async () => {
        await expect(
          contracts.luteDrop
            .connect(lootWhale)
            .claim(0, contracts.loot.address, 0)
        ).to.be.revertedWith("Must own specified token to claim");
      });
    });

    describe("mloot holders", () => {
      it("mloot holders can claim a lute", async () => {
        await contracts.luteDrop
          .connect(mlootHolder1)
          .claim(0, contracts.mloot.address, 0);
        expect(await contracts.lute.balanceOf(mlootHolder1.address)).to.equal(
          1
        );
      });

      it("mloot holders can claim a flute", async () => {
        await contracts.luteDrop
          .connect(mlootHolder1)
          .claim(1, contracts.mloot.address, 0);
        expect(await contracts.flute.balanceOf(mlootHolder1.address)).to.equal(
          1
        );
      });

      it("reverts on invalid items", async () => {
        await expect(
          contracts.luteDrop
            .connect(mlootHolder1)
            .claim(3, contracts.mloot.address, 0)
        ).to.be.revertedWith(
          "Transaction reverted: function was called with incorrect parameters"
        );
      });

      it("reverts if supply is fully claimed", async () => {
        await contracts.luteDrop
          .connect(mlootHolder1)
          .claim(0, contracts.mloot.address, 0);
        await contracts.luteDrop
          .connect(mlootHolder2)
          .claim(0, contracts.mloot.address, 1);
        await contracts.luteDrop
          .connect(mlootWhale)
          .claim(0, contracts.mloot.address, 2);
        await contracts.luteDrop
          .connect(mlootWhale)
          .claim(0, contracts.mloot.address, 3);
        await expect(
          contracts.luteDrop
            .connect(mlootWhale)
            .claim(0, contracts.mloot.address, 4)
        ).to.be.revertedWith("Token holder supply fully claimed");
      });

      it("mloot holders can claim only one item per token", async () => {
        await contracts.luteDrop
          .connect(mlootWhale)
          .claim(0, contracts.mloot.address, 2);
        expect(
          contracts.luteDrop
            .connect(mlootWhale)
            .claim(1, contracts.mloot.address, 2)
        ).to.be.revertedWith("Item already claimed");
        await contracts.luteDrop
          .connect(mlootWhale)
          .claim(0, contracts.mloot.address, 3);
        expect(await contracts.lute.balanceOf(mlootWhale.address)).to.equal(2);
      });

      it("mloot holders cannot claim for unowned tokens", async () => {
        await expect(
          contracts.luteDrop
            .connect(mlootWhale)
            .claim(0, contracts.mloot.address, 0)
        ).to.be.revertedWith("Must own specified token to claim");
      });
    });
  });

  describe("tips", () => {
    let tip: BigNumber;

    beforeEach(async () => {
      await contracts.loot.mintTo(lootHolder1.address, 0);
      tip = parseEther("0.001");
      await contracts.luteDrop
        .connect(lootHolder1)
        .claim(0, contracts.loot.address, 0, { value: tip });
    });

    it("contract holds ETH from tips", async () => {
      expect(
        await ethers.provider.getBalance(contracts.luteDrop.address)
      ).to.equal(tip);
    });

    it("owner can withdraw ETH from tips", async () => {
      const ownerBalance = await ethers.provider.getBalance(owner.address);
      const tx = await contracts.luteDrop
        .connect(owner)
        .withdraw(owner.address, tip);
      const receipt = await tx.wait();
      const gasSpent = receipt.gasUsed.mul(tx.gasPrice || 0);
      expect(
        await ethers.provider.getBalance(contracts.luteDrop.address)
      ).to.equal(0);
      expect(await ethers.provider.getBalance(owner.address)).to.equal(
        ownerBalance.add(tip).sub(gasSpent)
      );
    });

    it("non-owner cannot withdraw ETH from tips", async () => {
      await expect(
        contracts.luteDrop.connect(nonOwner).withdraw(nonOwner.address, tip)
      ).to.be.revertedWith("caller is not the owner");
    });
  });

  describe("drops", () => {
    it("owner can create new drops", async () => {
      await contracts.luteDrop
        .connect(owner)
        .addDrop(contracts.futureLoot.address, 10);

      expect(
        await contracts.luteDrop.dropId(contracts.futureLoot.address)
      ).to.equal(3);
      const [token, claimableSupply] = await contracts.luteDrop.drops(3);
      expect(token).to.equal(contracts.futureLoot.address);
      expect(claimableSupply).to.equal(10);
    });

    it("non-owner cannot create new drops", async () => {
      await expect(
        contracts.luteDrop
          .connect(nonOwner)
          .addDrop(contracts.futureLoot.address, 10)
      ).to.be.revertedWith("caller is not the owner");
    });
  });
});
