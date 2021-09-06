import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Sign } from "crypto";
import { ethers } from "hardhat";

import { MockERC721, LuteDrop, Lute, Flute } from "../typechain";

interface Contracts {
  loot: MockERC721;
  mloot: MockERC721;
  lute: Lute;
  flute: Flute;
  luteDrop: LuteDrop;
}

async function deploy(): Promise<Contracts> {
  const MockERC721Factory = await ethers.getContractFactory("MockERC721");
  const loot = (await (await MockERC721Factory.deploy("Mock Loot", "LOOT")).deployed()) as MockERC721;
  const mloot = (await (await MockERC721Factory.deploy("Mock mLoot", "MLOOT")).deployed()) as MockERC721;
  
  const LuteFactory = await ethers.getContractFactory("Lute");
  const lute = (await (await LuteFactory.deploy()).deployed()) as Lute;

  const FluteFactory = await ethers.getContractFactory("Flute");
  const flute = (await (await FluteFactory.deploy()).deployed()) as Flute;

  const LuteDropFactory = await ethers.getContractFactory("LuteDrop");
  const luteDrop = (await (
    await LuteDropFactory.deploy(lute.address, flute.address, loot.address, mloot.address, 2, 4)
  ).deployed()) as LuteDrop;
  return { loot, mloot, lute, flute, luteDrop };
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

describe("LuteDrop", () => {
  beforeEach(async () => {
    contracts = await deploy();
    [owner, recipient, nonOwner, lootHolder1, lootHolder2, lootWhale, mlootHolder1, mlootHolder2, mlootWhale] = await ethers.getSigners();
    contracts.lute.connect(owner).transferOwnership(contracts.luteDrop.address);
    contracts.flute
      .connect(owner)
      .transferOwnership(contracts.luteDrop.address);
  });

  describe("configuration", () => {
    it("stores the Lute contract", async () => {
      expect(await contracts.luteDrop.lute()).to.equal(contracts.lute.address);
    });

    it("stores the Flute contract", async () => {
      expect(await contracts.luteDrop.flute()).to.equal(contracts.flute.address);
    });

    it("stores the Loot contract", async () => {
      expect(await contracts.luteDrop.loot()).to.equal(
        contracts.loot.address
      );
    });

    it("stores the mLoot contract", async () => {
      expect(await contracts.luteDrop.mloot()).to.equal(
        contracts.mloot.address
      );
    });

    it("stores the loot claimable supply", async () => {
        expect(await contracts.luteDrop.lootClaimableSupply()).to.equal(
          2
        );
      });

      it("stores the mLoot claimable supply", async () => {
        expect(await contracts.luteDrop.mlootClaimableSupply()).to.equal(
          4
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
    
    describe("loot holders", () => {
        it("loot holders can claim a lute", async () => {
            await contracts.luteDrop.connect(lootHolder1).claim(0, 0, 0);
            expect(await contracts.lute.balanceOf(lootHolder1.address)).to.equal(1);
        })

        it("loot holders can claim a flute", async () => {
            await contracts.luteDrop.connect(lootHolder1).claim(1, 0, 0);
            expect(await contracts.flute.balanceOf(lootHolder1.address)).to.equal(1);
        })

        it("reverts on invalid items", async () => {
            await expect(contracts.luteDrop.connect(lootHolder1).claim(3, 0, 0)).to.be.revertedWith("Transaction reverted: function was called with incorrect parameters");
        })

        it("reverts if supply is fully claimed", async () => {
            await contracts.luteDrop.connect(lootHolder1).claim(0, 0, 0);
            await contracts.luteDrop.connect(lootHolder2).claim(0, 0, 1);
            await expect(contracts.luteDrop.connect(lootWhale).claim(0, 0, 2)).to.be.revertedWith("LuteDrop: Loot holder supply fully claimed");
        })

        it("loot holders can claim only one item per token", async () => {
            await contracts.luteDrop.connect(lootWhale).claim(0, 0, 2);
            expect(contracts.luteDrop.connect(lootWhale).claim(1, 0, 2)).to.be.revertedWith("LuteDrop: Item already claimed");
        })

        it("loot holders cannot claim for unowned tokens", async () => {
            await expect(contracts.luteDrop.connect(lootWhale).claim(0, 0, 0)).to.be.revertedWith("LuteDrop: Must hold specified token to claim");
        })
    });

    describe("mloot holders", () => {
        it("mloot holders can claim a lute", async () => {
            await contracts.luteDrop.connect(mlootHolder1).claim(0, 1, 0);
            expect(await contracts.lute.balanceOf(mlootHolder1.address)).to.equal(1);
        })

        it("mloot holders can claim a flute", async () => {
            await contracts.luteDrop.connect(mlootHolder1).claim(1, 1 , 0);
            expect(await contracts.flute.balanceOf(mlootHolder1.address)).to.equal(1);
        })

        it("reverts on invalid items", async () => {
            await expect(contracts.luteDrop.connect(mlootHolder1).claim(3, 1 , 0)).to.be.revertedWith("Transaction reverted: function was called with incorrect parameters");
        })

        it("reverts if supply is fully claimed", async () => {
            await contracts.luteDrop.connect(mlootHolder1).claim(0, 1, 0);
            await contracts.luteDrop.connect(mlootHolder2).claim(0, 1, 1);
            await contracts.luteDrop.connect(mlootWhale).claim(0, 1, 2);
            await contracts.luteDrop.connect(mlootWhale).claim(0, 1, 3);
            await expect(contracts.luteDrop.connect(mlootWhale).claim(0, 1, 4)).to.be.revertedWith("LuteDrop: mLoot holder supply fully claimed");
        })

        it("mloot holders can claim only one item per token", async () => {
            await contracts.luteDrop.connect(mlootWhale).claim(0, 1, 2);
            expect(contracts.luteDrop.connect(mlootWhale).claim(1, 1, 2)).to.be.revertedWith("LuteDrop: Item already claimed");
            await contracts.luteDrop.connect(mlootWhale).claim(0, 1, 3);
            expect(await contracts.lute.balanceOf(mlootWhale.address)).to.equal(2);
        })

        it("mloot holders cannot claim for unowned tokens", async () => {
            await expect(contracts.luteDrop.connect(mlootWhale).claim(0, 1, 0)).to.be.revertedWith("LuteDrop: Must hold specified token to claim");
        })
    });
  });
});
