import { expect } from "chai";
import { ethers } from "hardhat";

import { Lute } from "../typechain";

interface Contracts {
  lute: Lute;
}

async function deploy(): Promise<Contracts> {
  const ItemLibFactory = await ethers.getContractFactory("ItemLib");
  const itemlib = await (await ItemLibFactory.deploy()).deployed();

  const LuteFactory = await ethers.getContractFactory("Lute", {
    libraries: {
      ItemLib: itemlib.address,
    },
  });
  const lute = (await (await LuteFactory.deploy(false)).deployed()) as Lute;

  return { lute };
}

const CRAFTER_ROLE = ethers.utils.keccak256(
  ethers.utils.toUtf8Bytes("CRAFTER_ROLE")
);
let contracts: Contracts;

describe("Lute", () => {
  beforeEach(async () => {
    const [owner] = await ethers.getSigners();
    contracts = await deploy();
    await contracts.lute.grantRole(CRAFTER_ROLE, owner.address);
    for (let i = 0; i < 10; i++) {
      await contracts.lute.craft(owner.address);
    }
  });

  describe("material", () => {
    it("gets lute material", async function () {
      expect(await contracts.lute.getMaterial(0)).to.equal("Pine");
    });

    it("lutes have different materials", async function () {
      expect(await contracts.lute.getMaterial(1)).to.equal("Cedar");
      expect(await contracts.lute.getMaterial(2)).to.equal("Cherry");
      expect(await contracts.lute.getMaterial(3)).to.equal("Gold");
      expect(await contracts.lute.getMaterial(4)).to.equal("Maple");
      expect(await contracts.lute.getMaterial(5)).to.equal("Gold");
      expect(await contracts.lute.getMaterial(6)).to.equal("Iron");
      expect(await contracts.lute.getMaterial(7)).to.equal("Maple");
      expect(await contracts.lute.getMaterial(8)).to.equal("Ebony");
      expect(await contracts.lute.getMaterial(9)).to.equal("Cedar");
    });
  });

  describe("type", () => {
    it("gets lute type", async function () {
      expect(await contracts.lute.getType(0)).to.equal("Lute");
    });

    it("lutes have different types", async function () {
      expect(await contracts.lute.getType(1)).to.equal("Bouzouki");
      expect(await contracts.lute.getType(2)).to.equal("Lute");
      expect(await contracts.lute.getType(3)).to.equal("Mandolin");
      expect(await contracts.lute.getType(4)).to.equal("Vihuela");
      expect(await contracts.lute.getType(5)).to.equal("Kwitra");
      expect(await contracts.lute.getType(6)).to.equal("Oud");
      expect(await contracts.lute.getType(7)).to.equal("Kobza");
      expect(await contracts.lute.getType(8)).to.equal("Mandolin");
      expect(await contracts.lute.getType(9)).to.equal("Lute");
    });
  });

  describe("major modifier", () => {
    it("gets lute major modifier", async function () {
      expect(await contracts.lute.getMajorModifier(0)).to.equal(
        "Twelve Strings"
      );
    });

    it("lutes have different major modifiers", async function () {
      expect(await contracts.lute.getMajorModifier(1)).to.equal("Nine Strings");
      expect(await contracts.lute.getMajorModifier(2)).to.equal("Four Strings");
      expect(await contracts.lute.getMajorModifier(3)).to.equal(
        "Triple-Necked"
      );
      expect(await contracts.lute.getMajorModifier(4)).to.equal("Four Strings");
      expect(await contracts.lute.getMajorModifier(5)).to.equal(
        "Double-Necked"
      );
      expect(await contracts.lute.getMajorModifier(6)).to.equal(
        "Twelve Strings"
      );
      expect(await contracts.lute.getMajorModifier(7)).to.equal("Four Strings");
      expect(await contracts.lute.getMajorModifier(8)).to.equal("One String");
      expect(await contracts.lute.getMajorModifier(9)).to.equal("Five Strings");
    });
  });

  describe("minor modifier", () => {
    it("gets lute minor modifier", async function () {
      expect(await contracts.lute.getMinorModifier(0)).to.equal("Eight Frets");
    });

    it("lutes have different minor modifiers", async function () {
      expect(await contracts.lute.getMinorModifier(1)).to.equal("Nine Frets");
      expect(await contracts.lute.getMinorModifier(2)).to.equal("Eight Frets");
      expect(await contracts.lute.getMinorModifier(3)).to.equal(
        "Sixteen Frets"
      );
      expect(await contracts.lute.getMinorModifier(4)).to.equal(
        "Triangular Body"
      );
      expect(await contracts.lute.getMinorModifier(5)).to.equal("Oval Body");
      expect(await contracts.lute.getMinorModifier(6)).to.equal("Ten Frets");
      expect(await contracts.lute.getMinorModifier(7)).to.equal("Seven Frets");
      expect(await contracts.lute.getMinorModifier(8)).to.equal(
        "Triangular Body"
      );
      expect(await contracts.lute.getMinorModifier(9)).to.equal(
        "Triangular Body"
      );
    });
  });

  describe("range", () => {
    it("gets lute range", async function () {
      expect(await contracts.lute.getRange(0)).to.equal("Baritone");
    });

    it("lutes have different ranges", async function () {
      expect(await contracts.lute.getRange(1)).to.equal("Bass");
      expect(await contracts.lute.getRange(2)).to.equal("Tenor");
      expect(await contracts.lute.getRange(3)).to.equal("Tenor");
      expect(await contracts.lute.getRange(4)).to.equal("Baritone");
      expect(await contracts.lute.getRange(5)).to.equal("Bass");
      expect(await contracts.lute.getRange(6)).to.equal("Tenor");
      expect(await contracts.lute.getRange(7)).to.equal("Bass");
      expect(await contracts.lute.getRange(8)).to.equal("Bass");
      expect(await contracts.lute.getRange(9)).to.equal("Bass");
    });
  });

  describe("decoration", () => {
    it("gets lute decoration", async function () {
      expect(await contracts.lute.getDecoration(0)).to.equal("Hardwood Inlay");
    });

    it("lutes have different decorations", async function () {
      expect(await contracts.lute.getDecoration(1)).to.equal("Gold Pegs");
      expect(await contracts.lute.getDecoration(2)).to.equal("Hardwood Inlay");
      expect(await contracts.lute.getDecoration(3)).to.equal("Gold Frets");
      expect(await contracts.lute.getDecoration(4)).to.equal("Gold Pegs");
      expect(await contracts.lute.getDecoration(5)).to.equal("Silver Strings");
      expect(await contracts.lute.getDecoration(6)).to.equal("Ivory Inlay");
      expect(await contracts.lute.getDecoration(7)).to.equal("Silver Frets");
      expect(await contracts.lute.getDecoration(8)).to.equal("Gold Frets");
      expect(await contracts.lute.getDecoration(9)).to.equal("Silver Pegs");
    });
  });

  describe("order", () => {
    it("gets lute order", async function () {
      expect(await contracts.lute.getOrder(0)).to.equal("Brilliance");
    });

    it("lutes have different ranges", async function () {
      expect(await contracts.lute.getOrder(1)).to.equal("Fury");
      expect(await contracts.lute.getOrder(2)).to.equal("Anger");
      expect(await contracts.lute.getOrder(3)).to.equal("the Twins");
      expect(await contracts.lute.getOrder(4)).to.equal("Perfection");
      expect(await contracts.lute.getOrder(5)).to.equal("Rage");
      expect(await contracts.lute.getOrder(6)).to.equal("the Twins");
      expect(await contracts.lute.getOrder(7)).to.equal("the Fox");
      expect(await contracts.lute.getOrder(8)).to.equal("Titans");
      expect(await contracts.lute.getOrder(9)).to.equal("Perfection");
    });
  });

  describe("name", () => {
    it("constructs full name", async function () {
      expect(await contracts.lute.getName(0)).to.equal(
        "Pine Baritone Lute of Brilliance"
      );
    });
  });

  describe("SVG generation", () => {
    it("returns SVG as string", async function () {
      expect(await contracts.lute.tokenSVG(0)).to.equal(
        [
          '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350">',
          '<defs><linearGradient id="b" gradientTransform="rotate(105)"><stop offset="5%" stop-color="white"/><stop offset="30%" stop-color="rgb(253 240 221)"/></linearGradient></defs>',
          '<style>.base { fill: rgb(30 58 138); font-family: Luminari, serif; font-size: 16px; }</style>',
          '<rect width="100%" height="100%" fill="url(#b)" />',
          '<text x="10" y="25" class="base" text-anchor="start">Pine Baritone Lute of Brilliance</text>',
          '<text x="10" y="50" class="base" text-anchor="start">Twelve Strings</text>',
          '<text x="10" y="75" class="base" text-anchor="start">Eight Frets</text>',
          '<text x="10" y="100" class="base" text-anchor="start">Hardwood Inlay</text>',
          '<image href="https://lutedrop.com/img/lutes.png" x="0" y="120" width="270" />',
          "</svg>",
        ].join("")
      );
    });
  });

  describe("JSON generation", () => {
    it("returns attributes JSON as string", async function () {
      expect(await contracts.lute.attributesJSON(0)).to.equal(
        JSON.stringify([
          { trait_type: "Type", value: "Lute" },
          { trait_type: "Range", value: "Baritone" },
          { trait_type: "Material", value: "Pine" },
          { trait_type: "Major Modifier", value: "Twelve Strings" },
          { trait_type: "Minor Modifier", value: "Eight Frets" },
          { trait_type: "Decoration", value: "Hardwood Inlay" },
          { trait_type: "Order", value: "Brilliance" },
        ])
      );
    });

    xit("returns JSON as string", async function () {
      expect(await contracts.lute.tokenJSON(0)).to.equal(
        JSON.stringify({
          name: "Lute #0",
          description:
            "I hear that you and your bard have sold your lutes and bought flutes.",
          image:
            "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaW5ZTWluIG1lZXQiIHZpZXdCb3g9IjAgMCAzNTAgMzUwIj48c3R5bGU+LmJhc2UgeyBmaWxsOiB3aGl0ZTsgZm9udC1mYW1pbHk6IHNlcmlmOyBmb250LXNpemU6IDE0cHg7IH08L3N0eWxlPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9ImJsYWNrIiAvPjx0ZXh0IHg9IjEwIiB5PSIyMCIgY2xhc3M9ImJhc2UiPkNoZXJyeSBCYXJpdG9uZSBRaW5xaW48L3RleHQ+PHRleHQgeD0iMTAiIHk9IjQwIiBjbGFzcz0iYmFzZSI+VHdlbHZlIFN0cmluZ3M8L3RleHQ+PHRleHQgeD0iMTAiIHk9IjYwIiBjbGFzcz0iYmFzZSI+VGVuIEZyZXRzPC90ZXh0Pjx0ZXh0IHg9IjEwIiB5PSI4MCIgY2xhc3M9ImJhc2UiPkphZGUgSW5sYXk8L3RleHQ+PC9zdmc+",
          attributes: [
            { trait_type: "Type", value: "Qinqin" },
            { trait_type: "Range", value: "Baritone" },
            { trait_type: "Material", value: "Cherry" },
            { trait_type: "Major Modifier", value: "Twelve Strings" },
            { trait_type: "Minor Modifier", value: "Ten Frets" },
            { trait_type: "Decoration", value: "Jade Inlay" },
            { trait_type: "Order", value: "Brilliance" },
          ],
        })
      );
    });
  });

  xdescribe("token URI", () => {
    it("generates base64 JSON data", async function () {
      const json = JSON.stringify({
        name: "Lute #0",
        description:
          "I hear that you and your bard have sold your lutes and bought flutes.",
        image:
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaW5ZTWluIG1lZXQiIHZpZXdCb3g9IjAgMCAzNTAgMzUwIj48c3R5bGU+LmJhc2UgeyBmaWxsOiB3aGl0ZTsgZm9udC1mYW1pbHk6IHNlcmlmOyBmb250LXNpemU6IDE0cHg7IH08L3N0eWxlPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9ImJsYWNrIiAvPjx0ZXh0IHg9IjEwIiB5PSIyMCIgY2xhc3M9ImJhc2UiPkNoZXJyeSBCYXJpdG9uZSBRaW5xaW48L3RleHQ+PHRleHQgeD0iMTAiIHk9IjQwIiBjbGFzcz0iYmFzZSI+VHdlbHZlIFN0cmluZ3M8L3RleHQ+PHRleHQgeD0iMTAiIHk9IjYwIiBjbGFzcz0iYmFzZSI+VGVuIEZyZXRzPC90ZXh0Pjx0ZXh0IHg9IjEwIiB5PSI4MCIgY2xhc3M9ImJhc2UiPkphZGUgSW5sYXk8L3RleHQ+PC9zdmc+",
        attributes: [
          { trait_type: "Type", value: "Qinqin" },
          { trait_type: "Range", value: "Baritone" },
          { trait_type: "Material", value: "Cherry" },
          { trait_type: "Major Modifier", value: "Twelve Strings" },
          { trait_type: "Minor Modifier", value: "Ten Frets" },
          { trait_type: "Decoration", value: "Jade Inlay" },
        ],
      });
      const base64 = Buffer.from(json).toString("base64");
      const tokenURI = await contracts.lute.tokenURI(0);
      const [mimeType, data] = tokenURI.split(",");
      expect(mimeType).to.equal("data:application/json;base64");
      expect(data).to.equal(base64);
    });
  });
});
