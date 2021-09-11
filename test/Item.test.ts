import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";

import { Item } from "../typechain";

interface Contracts {
  item: Item;
}

async function deploy(): Promise<Contracts> {
  const ItemLibFactory = await ethers.getContractFactory("ItemLib");
  const itemlib = await (await ItemLibFactory.deploy()).deployed();

  const ItemFactory = await ethers.getContractFactory("GenericItem", {
    libraries: {
      ItemLib: itemlib.address,
    },
  });
  const item = (await (await ItemFactory.deploy()).deployed()) as Item;

  return { item };
}

let contracts: Contracts;
let owner: SignerWithAddress,
  recipient: SignerWithAddress,
  crafter: SignerWithAddress,
  burner: SignerWithAddress,
  nonOwner: SignerWithAddress;

const CRAFTER_ROLE = ethers.utils.keccak256(
  ethers.utils.toUtf8Bytes("CRAFTER_ROLE")
);
const BURNER_ROLE = ethers.utils.keccak256(
  ethers.utils.toUtf8Bytes("BURNER_ROLE")
);

describe("Item", () => {
  beforeEach(async () => {
    contracts = await deploy();
    [owner, recipient, crafter, burner, nonOwner] = await ethers.getSigners();
  });

  describe("auth", () => {
    it("default admin can assign crafter role", async function () {
      expect(await contracts.item.hasRole(CRAFTER_ROLE, crafter.address)).to.be
        .false;
      await contracts.item
        .connect(owner)
        .grantRole(CRAFTER_ROLE, crafter.address);
      expect(await contracts.item.hasRole(CRAFTER_ROLE, crafter.address)).to.be
        .true;
    });

    it("non-admin cannot assign crafter role", async function () {
      await expect(
        contracts.item
          .connect(nonOwner)
          .grantRole(CRAFTER_ROLE, crafter.address)
      ).to.be.revertedWith("AccessControl");
    });

    it("default admin can revoke crafter role", async function () {
      await contracts.item
        .connect(owner)
        .grantRole(CRAFTER_ROLE, crafter.address);
      expect(await contracts.item.hasRole(CRAFTER_ROLE, crafter.address)).to.be
        .true;
      await contracts.item
        .connect(owner)
        .revokeRole(CRAFTER_ROLE, crafter.address);
      expect(await contracts.item.hasRole(CRAFTER_ROLE, crafter.address)).to.be
        .false;
    });

    it("non-admin cannot revoke crafter role", async function () {
      await contracts.item
        .connect(owner)
        .grantRole(CRAFTER_ROLE, crafter.address);
      await expect(
        contracts.item
          .connect(nonOwner)
          .revokeRole(CRAFTER_ROLE, crafter.address)
      ).to.be.revertedWith("AccessControl");
    });

    it("default admin can assign burner role", async function () {
      expect(await contracts.item.hasRole(BURNER_ROLE, burner.address)).to.be
        .false;
      await contracts.item
        .connect(owner)
        .grantRole(BURNER_ROLE, burner.address);
      expect(await contracts.item.hasRole(BURNER_ROLE, burner.address)).to.be
        .true;
    });

    it("non-admin cannot assign burner role", async function () {
      await expect(
        contracts.item.connect(nonOwner).grantRole(BURNER_ROLE, burner.address)
      ).to.be.revertedWith("AccessControl");
    });

    it("default admin can revoke burner role", async function () {
      await contracts.item
        .connect(owner)
        .grantRole(BURNER_ROLE, burner.address);
      expect(await contracts.item.hasRole(BURNER_ROLE, burner.address)).to.be
        .true;
      await contracts.item
        .connect(owner)
        .revokeRole(BURNER_ROLE, burner.address);
      expect(await contracts.item.hasRole(BURNER_ROLE, burner.address)).to.be
        .false;
    });

    it("non-admin cannot revoke burner role", async function () {
      await contracts.item
        .connect(owner)
        .grantRole(BURNER_ROLE, burner.address);
      await expect(
        contracts.item.connect(nonOwner).revokeRole(BURNER_ROLE, burner.address)
      ).to.be.revertedWith("AccessControl");
    });
  });

  describe("minting", () => {
    beforeEach(async () => {
      await contracts.item
        .connect(owner)
        .grantRole(CRAFTER_ROLE, crafter.address);
    });

    it("crafter role can mint items", async function () {
      await contracts.item.connect(crafter).craft(recipient.address);
      expect(await contracts.item.balanceOf(recipient.address)).to.equal(1);
    });

    it("non-owner cannot mint items", async function () {
      await expect(
        contracts.item.connect(nonOwner).craft(recipient.address)
      ).to.be.revertedWith("AccessControl");
    });

    it("minting increments token ID", async function () {
      await contracts.item.connect(crafter).craft(recipient.address);
      expect(await contracts.item.ownerOf(0)).to.equal(recipient.address);
      await contracts.item.connect(crafter).craft(recipient.address);
      expect(await contracts.item.ownerOf(1)).to.equal(recipient.address);
      await contracts.item.connect(crafter).craft(recipient.address);
      expect(await contracts.item.ownerOf(2)).to.equal(recipient.address);
    });

    it("minting increases total supply", async function () {
      expect(await contracts.item.totalSupply()).to.equal(0);
      await contracts.item.connect(crafter).craft(recipient.address);
      expect(await contracts.item.totalSupply()).to.equal(1);
    });
  });

  describe("burning", () => {
    beforeEach(async () => {
      await contracts.item
        .connect(owner)
        .grantRole(CRAFTER_ROLE, crafter.address);
      await contracts.item
        .connect(owner)
        .grantRole(BURNER_ROLE, burner.address);
    });

    it("owner can burn items", async function () {
      await contracts.item.connect(crafter).craft(recipient.address);
      expect(await contracts.item.balanceOf(recipient.address)).to.equal(1);
      await contracts.item.connect(burner).burn(0);
      expect(await contracts.item.balanceOf(recipient.address)).to.equal(0);
    });

    it("non-owner cannot burn items", async function () {
      await expect(contracts.item.connect(nonOwner).burn(0)).to.be.revertedWith(
        "AccessControl"
      );
    });

    it("burning does not change token ID", async function () {
      await contracts.item.connect(crafter).craft(recipient.address);
      await contracts.item.connect(crafter).craft(recipient.address);
      await contracts.item.connect(crafter).craft(recipient.address);
      expect(await contracts.item.ownerOf(0)).to.equal(recipient.address);
      expect(await contracts.item.ownerOf(1)).to.equal(recipient.address);
      expect(await contracts.item.ownerOf(2)).to.equal(recipient.address);
      await contracts.item.connect(burner).burn(0);
      await contracts.item.connect(burner).burn(1);
      await contracts.item.connect(burner).burn(2);
      await contracts.item.connect(crafter).craft(recipient.address);
      expect(await contracts.item.ownerOf(3)).to.equal(recipient.address);
    });

    it("burning decreases total supply", async function () {
      expect(await contracts.item.totalSupply()).to.equal(0);
      await contracts.item.connect(crafter).craft(recipient.address);
      expect(await contracts.item.totalSupply()).to.equal(1);
      await contracts.item.connect(burner).burn(0);
      expect(await contracts.item.totalSupply()).to.equal(0);
    });
  });
});
