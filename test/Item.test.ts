import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";

import { Item } from "../typechain";

interface Contracts {
  item: Item;
}

async function deploy(): Promise<Contracts> {
  const ItemFactory = await ethers.getContractFactory("Item");
  const item = (await (
    await ItemFactory.deploy(
      "Item",
      "ITEM",
      new Array(3).fill("Material"),
      new Array(3).fill("Type"),
      new Array(3).fill("Major Modifier"),
      new Array(3).fill("Minor Modifier"),
      new Array(3).fill("Range"),
      new Array(3).fill("Decoration")
    )
  ).deployed()) as Item;

  return { item };
}

let contracts: Contracts;
let owner: SignerWithAddress,
  recipient: SignerWithAddress,
  nonOwner: SignerWithAddress;

describe("Item", () => {
  beforeEach(async () => {
    contracts = await deploy();
    [owner, recipient, nonOwner] = await ethers.getSigners();
  });

  describe("minting", () => {
    it("owner can mint items", async function () {
      await contracts.item.connect(owner).craft(recipient.address);
      expect(await contracts.item.balanceOf(recipient.address)).to.equal(1);
    });

    it("non-owner cannot mint items", async function () {
      expect(
        contracts.item.connect(nonOwner).craft(recipient.address)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("minting increments token ID", async function () {
      await contracts.item.connect(owner).craft(recipient.address);
      expect(await contracts.item.ownerOf(0)).to.equal(recipient.address);
      await contracts.item.connect(owner).craft(recipient.address);
      expect(await contracts.item.ownerOf(1)).to.equal(recipient.address);
      await contracts.item.connect(owner).craft(recipient.address);
      expect(await contracts.item.ownerOf(2)).to.equal(recipient.address);
    });

    it("minting increases total supply", async function () {
      expect(await contracts.item.totalSupply()).to.equal(0);
      await contracts.item.connect(owner).craft(recipient.address);
      expect(await contracts.item.totalSupply()).to.equal(1);
    });
  });
});
