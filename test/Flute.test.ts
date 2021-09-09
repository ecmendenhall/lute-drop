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
  const flute = (await (await FluteFactory.deploy()).deployed()) as Flute;

  return { flute };
}

let contracts: Contracts;

describe("Flute", () => {
  beforeEach(async () => {
    contracts = await deploy();
  });

  describe("material", () => {
    it("gets flute material", async function () {
      expect(await contracts.flute.getMaterial(0)).to.equal("Brass");
    });

    it("flutes have different materials", async function () {
      expect(await contracts.flute.getMaterial(1)).to.equal("Jade");
      expect(await contracts.flute.getMaterial(2)).to.equal("Clay");
      expect(await contracts.flute.getMaterial(3)).to.equal("Bone");
      expect(await contracts.flute.getMaterial(4)).to.equal("Bone");
      expect(await contracts.flute.getMaterial(5)).to.equal("Brass");
      expect(await contracts.flute.getMaterial(6)).to.equal("Bamboo");
      expect(await contracts.flute.getMaterial(7)).to.equal("Ivory");
      expect(await contracts.flute.getMaterial(8)).to.equal("Tin");
      expect(await contracts.flute.getMaterial(9)).to.equal("Bone");
    });
  });

  describe("type", () => {
    it("gets flute type", async function () {
      expect(await contracts.flute.getType(0)).to.equal("Dizi");
    });

    it("flutes have different types", async function () {
      expect(await contracts.flute.getType(1)).to.equal("Fife");
      expect(await contracts.flute.getType(2)).to.equal("Flute");
      expect(await contracts.flute.getType(3)).to.equal("Recorder");
      expect(await contracts.flute.getType(4)).to.equal("Piccolo");
      expect(await contracts.flute.getType(5)).to.equal("Bombard");
      expect(await contracts.flute.getType(6)).to.equal("Ney");
      expect(await contracts.flute.getType(7)).to.equal("Panpipes");
      expect(await contracts.flute.getType(8)).to.equal("Recorder");
      expect(await contracts.flute.getType(9)).to.equal("Ocarina");
    });
  });

  describe("major modifier", () => {
    it("gets flute major modifier", async function () {
      expect(await contracts.flute.getMajorModifier(0)).to.equal("End Blown");
    });

    it("flutes have different major modifiers", async function () {
      expect(await contracts.flute.getMajorModifier(1)).to.equal("One Pipe");
      expect(await contracts.flute.getMajorModifier(2)).to.equal("Cross Blown");
      expect(await contracts.flute.getMajorModifier(3)).to.equal("Double Reed");
      expect(await contracts.flute.getMajorModifier(4)).to.equal("Cross Blown");
      expect(await contracts.flute.getMajorModifier(5)).to.equal("Three Pipes");
      expect(await contracts.flute.getMajorModifier(6)).to.equal("Two Pipes");
      expect(await contracts.flute.getMajorModifier(7)).to.equal("Side Blown");
      expect(await contracts.flute.getMajorModifier(8)).to.equal("One Pipe");
      expect(await contracts.flute.getMajorModifier(9)).to.equal("Two Pipes");
    });
  });

  describe("minor modifier", () => {
    it("gets flute minor modifier", async function () {
      expect(await contracts.flute.getMinorModifier(0)).to.equal("Seven Holes");
    });

    it("flutes have different minor modifiers", async function () {
      expect(await contracts.flute.getMinorModifier(1)).to.equal("Eight Holes");
      expect(await contracts.flute.getMinorModifier(2)).to.equal("Seven Holes");
      expect(await contracts.flute.getMinorModifier(3)).to.equal("Five Holes");
      expect(await contracts.flute.getMinorModifier(4)).to.equal("Three Holes");
      expect(await contracts.flute.getMinorModifier(5)).to.equal("Two Holes");
      expect(await contracts.flute.getMinorModifier(6)).to.equal("Nine Holes");
      expect(await contracts.flute.getMinorModifier(7)).to.equal("Ten Holes");
      expect(await contracts.flute.getMinorModifier(8)).to.equal("Seven Holes");
      expect(await contracts.flute.getMinorModifier(9)).to.equal("Slide");
    });
  });

  describe("range", () => {
    it("gets flute range", async function () {
      expect(await contracts.flute.getRange(0)).to.equal("Soprano");
    });

    it("flutes have different ranges", async function () {
      expect(await contracts.flute.getRange(1)).to.equal("Soprano");
      expect(await contracts.flute.getRange(2)).to.equal("Alto");
      expect(await contracts.flute.getRange(3)).to.equal("Alto");
      expect(await contracts.flute.getRange(4)).to.equal("Piccolo");
      expect(await contracts.flute.getRange(5)).to.equal("Soprano");
      expect(await contracts.flute.getRange(6)).to.equal("Alto");
      expect(await contracts.flute.getRange(7)).to.equal("Piccolo");
      expect(await contracts.flute.getRange(8)).to.equal("Soprano");
      expect(await contracts.flute.getRange(9)).to.equal("Alto");
    });
  });

  describe("name", () => {
    it("constructs full name", async function () {
      expect(await contracts.flute.getName(0)).to.equal("Brass Soprano Dizi");
    });
  });

  describe("SVG generation", () => {
    it("returns SVG as string", async function () {
      expect(await contracts.flute.tokenSVG(0)).to.equal(
        [
          '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350"><style>.base { fill: white; font-family: serif; font-size: 14px; }</style><rect width="100%" height="100%" fill="black" />',
          '<text x="10" y="20" class="base">Brass Soprano Dizi</text>',
          '<text x="10" y="40" class="base">End Blown</text>',
          '<text x="10" y="60" class="base">Seven Holes</text>',
          '<text x="10" y="80" class="base">Jade Inlay</text>',
          "</svg>",
        ].join("")
      );
    });
  });

  describe("JSON generation", () => {
    it("returns attributes JSON as string", async function () {
      expect(await contracts.flute.attributesJSON(0)).to.equal(
        JSON.stringify([
          { trait_type: "Type", value: "Dizi" },
          { trait_type: "Range", value: "Soprano" },
          { trait_type: "Material", value: "Brass" },
          { trait_type: "Major Modifier", value: "End Blown" },
          { trait_type: "Minor Modifier", value: "Seven Holes" },
          { trait_type: "Decoration", value: "Jade Inlay" },
        ])
      );
    });

    it("returns JSON as string", async function () {
      expect(await contracts.flute.tokenJSON(0)).to.equal(
        JSON.stringify({
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
        })
      );
    });
  });

  describe("token URI", () => {
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
