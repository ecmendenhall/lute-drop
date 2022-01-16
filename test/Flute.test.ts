import { expect } from "chai";
import { ethers } from "hardhat";

import { Flute } from "../typechain";

interface Contracts {
  flute: Flute;
}

async function deploy(): Promise<Contracts> {
  const ItemLibFactory = await ethers.getContractFactory("ItemLib");
  const itemlib = await (await ItemLibFactory.deploy()).deployed();

  const FluteFactory = await ethers.getContractFactory("Flute", {
    libraries: {
      ItemLib: itemlib.address,
    },
  });
  const flute = (await (await FluteFactory.deploy(false)).deployed()) as Flute;

  return { flute };
}

const CRAFTER_ROLE = ethers.utils.keccak256(
  ethers.utils.toUtf8Bytes("CRAFTER_ROLE")
);
let contracts: Contracts;

describe("Flute", () => {
  beforeEach(async () => {
    const [owner] = await ethers.getSigners();
    contracts = await deploy();
    await contracts.flute.grantRole(CRAFTER_ROLE, owner.address);
    for (let i = 0; i < 10; i++) {
      await contracts.flute.craft(owner.address);
    }
  });

  describe("material", () => {
    it("gets flute material", async function () {
      expect(await contracts.flute.getMaterial(0)).to.equal("Wood");
    });

    it("flutes have different materials", async function () {
      expect(await contracts.flute.getMaterial(1)).to.equal("Tin");
      expect(await contracts.flute.getMaterial(2)).to.equal("Brass");
      expect(await contracts.flute.getMaterial(3)).to.equal("Ivory");
      expect(await contracts.flute.getMaterial(4)).to.equal("Brass");
      expect(await contracts.flute.getMaterial(5)).to.equal("Ivory");
      expect(await contracts.flute.getMaterial(6)).to.equal("Crystal");
      expect(await contracts.flute.getMaterial(7)).to.equal("Brass");
      expect(await contracts.flute.getMaterial(8)).to.equal("Gold");
      expect(await contracts.flute.getMaterial(9)).to.equal("Tin");
    });
  });

  describe("type", () => {
    it("gets flute type", async function () {
      expect(await contracts.flute.getType(0)).to.equal("Flute");
    });

    it("flutes have different types", async function () {
      expect(await contracts.flute.getType(1)).to.equal("Fife");
      expect(await contracts.flute.getType(2)).to.equal("Flute");
      expect(await contracts.flute.getType(3)).to.equal("Panpipes");
      expect(await contracts.flute.getType(4)).to.equal("Bombard");
      expect(await contracts.flute.getType(5)).to.equal("Recorder");
      expect(await contracts.flute.getType(6)).to.equal("Whistle");
      expect(await contracts.flute.getType(7)).to.equal("Ney");
      expect(await contracts.flute.getType(8)).to.equal("Panpipes");
      expect(await contracts.flute.getType(9)).to.equal("Flute");
    });
  });

  describe("major modifier", () => {
    it("gets flute major modifier", async function () {
      expect(await contracts.flute.getMajorModifier(0)).to.equal("Reed");
    });

    it("flutes have different major modifiers", async function () {
      expect(await contracts.flute.getMajorModifier(1)).to.equal("End Blown");
      expect(await contracts.flute.getMajorModifier(2)).to.equal("Three Pipes");
      expect(await contracts.flute.getMajorModifier(3)).to.equal("Double Reed");
      expect(await contracts.flute.getMajorModifier(4)).to.equal("Three Pipes");
      expect(await contracts.flute.getMajorModifier(5)).to.equal("Reed");
      expect(await contracts.flute.getMajorModifier(6)).to.equal("Reed");
      expect(await contracts.flute.getMajorModifier(7)).to.equal("Two Pipes");
      expect(await contracts.flute.getMajorModifier(8)).to.equal("One Pipe");
      expect(await contracts.flute.getMajorModifier(9)).to.equal("Three Pipes");
    });
  });

  describe("minor modifier", () => {
    it("gets flute minor modifier", async function () {
      expect(await contracts.flute.getMinorModifier(0)).to.equal("Three Holes");
    });

    it("flutes have different minor modifiers", async function () {
      expect(await contracts.flute.getMinorModifier(1)).to.equal("Three Holes");
      expect(await contracts.flute.getMinorModifier(2)).to.equal("Three Holes");
      expect(await contracts.flute.getMinorModifier(3)).to.equal("Six Holes");
      expect(await contracts.flute.getMinorModifier(4)).to.equal("Slide");
      expect(await contracts.flute.getMinorModifier(5)).to.equal("Slide");
      expect(await contracts.flute.getMinorModifier(6)).to.equal("Four Holes");
      expect(await contracts.flute.getMinorModifier(7)).to.equal("Two Holes");
      expect(await contracts.flute.getMinorModifier(8)).to.equal("Slide");
      expect(await contracts.flute.getMinorModifier(9)).to.equal("Slide");
    });
  });

  describe("range", () => {
    it("gets flute range", async function () {
      expect(await contracts.flute.getRange(0)).to.equal("Soprano");
    });

    it("flutes have different ranges", async function () {
      expect(await contracts.flute.getRange(1)).to.equal("Alto");
      expect(await contracts.flute.getRange(2)).to.equal("Piccolo");
      expect(await contracts.flute.getRange(3)).to.equal("Piccolo");
      expect(await contracts.flute.getRange(4)).to.equal("Soprano");
      expect(await contracts.flute.getRange(5)).to.equal("Alto");
      expect(await contracts.flute.getRange(6)).to.equal("Piccolo");
      expect(await contracts.flute.getRange(7)).to.equal("Alto");
      expect(await contracts.flute.getRange(8)).to.equal("Alto");
      expect(await contracts.flute.getRange(9)).to.equal("Alto");
    });
  });

  describe("decoration", () => {
    it("gets flute decoration", async function () {
      expect(await contracts.flute.getDecoration(0)).to.equal("Pearl Inlay");
    });

    it("flutes have different decorations", async function () {
      expect(await contracts.flute.getDecoration(1)).to.equal(
        "Colorful Ribbon"
      );
      expect(await contracts.flute.getDecoration(2)).to.equal("Pearl Inlay");
      expect(await contracts.flute.getDecoration(3)).to.equal(
        "Brass Mouthpiece"
      );
      expect(await contracts.flute.getDecoration(4)).to.equal(
        "Colorful Ribbon"
      );
      expect(await contracts.flute.getDecoration(5)).to.equal(
        "Silver Mouthpiece"
      );
      expect(await contracts.flute.getDecoration(6)).to.equal("Brass Keys");
      expect(await contracts.flute.getDecoration(7)).to.equal("Gold Keys");
      expect(await contracts.flute.getDecoration(8)).to.equal(
        "Brass Mouthpiece"
      );
      expect(await contracts.flute.getDecoration(9)).to.equal("Silver Trim");
    });
  });

  describe("order", () => {
    it("gets flute order", async function () {
      expect(await contracts.flute.getOrder(0)).to.equal("Brilliance");
    });

    it("flutes have different ranges", async function () {
      expect(await contracts.flute.getOrder(1)).to.equal("Fury");
      expect(await contracts.flute.getOrder(2)).to.equal("Anger");
      expect(await contracts.flute.getOrder(3)).to.equal("the Twins");
      expect(await contracts.flute.getOrder(4)).to.equal("Perfection");
      expect(await contracts.flute.getOrder(5)).to.equal("Rage");
      expect(await contracts.flute.getOrder(6)).to.equal("the Twins");
      expect(await contracts.flute.getOrder(7)).to.equal("the Fox");
      expect(await contracts.flute.getOrder(8)).to.equal("Titans");
      expect(await contracts.flute.getOrder(9)).to.equal("Perfection");
    });
  });

  describe("name", () => {
    it("constructs full name", async function () {
      expect(await contracts.flute.getName(0)).to.equal(
        "Wood Soprano Flute of Brilliance"
      );
    });
  });

  describe("SVG generation", () => {
    it("returns SVG as string", async function () {
      expect(await contracts.flute.tokenSVG(0)).to.equal(
        [
          '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350">',
          '<defs><linearGradient id="b" gradientTransform="rotate(105)"><stop offset="5%" stop-color="rgb(254 251 248)"/><stop offset="30%" stop-color="rgb(253 240 221)"/></linearGradient></defs>',
          '<style>.base { fill: rgb(153 27 27); font-family: Luminari, serif; font-size: 16px; }</style>',
          '<rect width="100%" height="100%" fill="url(#b)" />',
          '<text x="10" y="25" class="base" text-anchor="start">Wood Soprano Flute of Brilliance</text>',
          '<text x="10" y="50" class="base" text-anchor="start">Reed</text>',
          '<text x="10" y="75" class="base" text-anchor="start">Three Holes</text>',
          '<text x="10" y="100" class="base" text-anchor="start">Pearl Inlay</text>',
          '<g transform="rotate(25 6.116 294.42) scale(.5)"><path style="fill:#ff9811" d="M204.8 0h102.4v512H204.8z"/><path style="fill:#bf720d" d="M256 0h51.2v512H256z"/><path style="fill:#50412e" d="M238.933 34.133h34.133v22.756h-34.133zm0 147.911h34.133v34.133h-34.133z"/><circle style="fill:#50412e" cx="256" cy="136.533" r="17.067"/><circle style="fill:#50412e" cx="256" cy="261.689" r="17.067"/><circle style="fill:#50412e" cx="256" cy="318.578" r="17.067"/><circle style="fill:#50412e" cx="256" cy="375.467" r="17.067"/><path style="fill:#786145" d="M204.8 443.733h102.4v34.133H204.8z"/><path style="fill:#50412e" d="M256 443.733h51.2v34.133H256z"/></g>',
          "</svg>",
        ].join("")
      );
    });
  });

  describe("JSON generation", () => {
    it("returns attributes JSON as string", async function () {
      expect(await contracts.flute.attributesJSON(0)).to.equal(
        JSON.stringify([
          { trait_type: "Type", value: "Flute" },
          { trait_type: "Range", value: "Soprano" },
          { trait_type: "Material", value: "Wood" },
          { trait_type: "Major Modifier", value: "Reed" },
          { trait_type: "Minor Modifier", value: "Three Holes" },
          { trait_type: "Decoration", value: "Pearl Inlay" },
          { trait_type: "Order", value: "Brilliance" },
        ])
      );
    });

    xit("returns JSON as string", async function () {
      expect(await contracts.flute.tokenJSON(0)).to.equal(
        JSON.stringify({
          name: "Flute #0",
          description:
            "I hear that you and your bard have sold your lutes and bought flutes.",
          image:
            "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaW5ZTWluIG1lZXQiIHZpZXdCb3g9IjAgMCAzNTAgMzUwIj48c3R5bGU+LmJhc2UgeyBmaWxsOiB3aGl0ZTsgZm9udC1mYW1pbHk6IHNlcmlmOyBmb250LXNpemU6IDE0cHg7IH08L3N0eWxlPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9ImJsYWNrIiAvPjx0ZXh0IHg9IjEwIiB5PSIyMCIgY2xhc3M9ImJhc2UiPkJyYXNzIFNvcHJhbm8gRGl6aTwvdGV4dD48dGV4dCB4PSIxMCIgeT0iNDAiIGNsYXNzPSJiYXNlIj5FbmQgQmxvd248L3RleHQ+PHRleHQgeD0iMTAiIHk9IjYwIiBjbGFzcz0iYmFzZSI+U2V2ZW4gSG9sZXM8L3RleHQ+PHRleHQgeD0iMTAiIHk9IjgwIiBjbGFzcz0iYmFzZSI+SmFkZSBJbmxheTwvdGV4dD48L3N2Zz4=",
          attributes: [
            { trait_type: "Type", value: "Flute" },
            { trait_type: "Range", value: "Soprano" },
            { trait_type: "Material", value: "Wood" },
            { trait_type: "Major Modifier", value: "Reed" },
            { trait_type: "Minor Modifier", value: "Three Holes" },
            { trait_type: "Decoration", value: "Pearl Inlay" },
            { trait_type: "Order", value: "Brilliance" },
          ],
        })
      );
    });
  });

  xdescribe("token URI", () => {
    it("generates base64 JSON data", async function () {
      const json = JSON.stringify({
        name: "Flute #0",
        description:
          "I hear that you and your bard have sold your lutes and bought flutes.",
        image:
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaW5ZTWluIG1lZXQiIHZpZXdCb3g9IjAgMCAzNTAgMzUwIj48c3R5bGU+LmJhc2UgeyBmaWxsOiB3aGl0ZTsgZm9udC1mYW1pbHk6IHNlcmlmOyBmb250LXNpemU6IDE0cHg7IH08L3N0eWxlPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9ImJsYWNrIiAvPjx0ZXh0IHg9IjEwIiB5PSIyMCIgY2xhc3M9ImJhc2UiPkJyYXNzIFNvcHJhbm8gRGl6aTwvdGV4dD48dGV4dCB4PSIxMCIgeT0iNDAiIGNsYXNzPSJiYXNlIj5FbmQgQmxvd248L3RleHQ+PHRleHQgeD0iMTAiIHk9IjYwIiBjbGFzcz0iYmFzZSI+U2V2ZW4gSG9sZXM8L3RleHQ+PHRleHQgeD0iMTAiIHk9IjgwIiBjbGFzcz0iYmFzZSI+SmFkZSBJbmxheTwvdGV4dD48L3N2Zz4=",
        attributes: [
          { trait_type: "Type", value: "Dizi" },
          { trait_type: "Range", value: "Soprano" },
          { trait_type: "Material", value: "Brass" },
          { trait_type: "Major Modifier", value: "End Blown" },
          { trait_type: "Minor Modifier", value: "Seven Holes" },
          { trait_type: "Decoration", value: "Jade Inlay" },
        ],
      });
      const base64 = Buffer.from(json).toString("base64");
      const tokenURI = await contracts.flute.tokenURI(0);
      const [mimeType, data] = tokenURI.split(",");
      expect(mimeType).to.equal("data:application/json;base64");
      expect(data).to.equal(base64);
    });
  });
});
