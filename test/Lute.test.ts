import { expect } from "chai";
import { ethers } from "hardhat";

import { Lute } from "../typechain";

interface Contracts {
  lute: Lute;
}

async function deploy(): Promise<Contracts> {
  const LuteFactory = await ethers.getContractFactory("Lute");
  const lute = (await (await LuteFactory.deploy()).deployed()) as Lute;

  return { lute };
}

let contracts: Contracts;

describe("Lute", () => {
  beforeEach(async () => {
    contracts = await deploy();
  });

  describe("material", () => {
    it("gets lute material", async function () {
      expect(await contracts.lute.getMaterial(0)).to.equal("Ebony");
    });

    it("lutes have different materials", async function () {
      expect(await contracts.lute.getMaterial(1)).to.equal("Ebony");
      expect(await contracts.lute.getMaterial(2)).to.equal("Walnut");
      expect(await contracts.lute.getMaterial(3)).to.equal("Walnut");
      expect(await contracts.lute.getMaterial(4)).to.equal("Walnut");
      expect(await contracts.lute.getMaterial(5)).to.equal("Ebony");
      expect(await contracts.lute.getMaterial(6)).to.equal("Ebony");
      expect(await contracts.lute.getMaterial(7)).to.equal("Pine");
      expect(await contracts.lute.getMaterial(8)).to.equal("Pine");
      expect(await contracts.lute.getMaterial(9)).to.equal("Walnut");
    });
  });

  describe("type", () => {
    it("gets lute type", async function () {
      expect(await contracts.lute.getType(0)).to.equal("Oud");
    });

    it("lutes have different types", async function () {
      expect(await contracts.lute.getType(1)).to.equal("Oud");
      expect(await contracts.lute.getType(2)).to.equal("Lute");
      expect(await contracts.lute.getType(3)).to.equal("Mandolin");
      expect(await contracts.lute.getType(4)).to.equal("Mandolin");
      expect(await contracts.lute.getType(5)).to.equal("Oud");
      expect(await contracts.lute.getType(6)).to.equal("Lute");
      expect(await contracts.lute.getType(7)).to.equal("Oud");
      expect(await contracts.lute.getType(8)).to.equal("Mandolin");
      expect(await contracts.lute.getType(9)).to.equal("Mandolin");
    });
  });

  describe("major modifier", () => {
    it("gets lute major modifier", async function () {
      expect(await contracts.lute.getMajorModifier(0)).to.equal("Two Strings");
    });

    it("lutes have different major modifiers", async function () {
      expect(await contracts.lute.getMajorModifier(1)).to.equal("Two Strings");
      expect(await contracts.lute.getMajorModifier(2)).to.equal("Four Strings");
      expect(await contracts.lute.getMajorModifier(3)).to.equal("Four Strings");
      expect(await contracts.lute.getMajorModifier(4)).to.equal("Four Strings");
      expect(await contracts.lute.getMajorModifier(5)).to.equal("Four Strings");
      expect(await contracts.lute.getMajorModifier(6)).to.equal(
        "Three Strings"
      );
      expect(await contracts.lute.getMajorModifier(7)).to.equal(
        "Three Strings"
      );
      expect(await contracts.lute.getMajorModifier(8)).to.equal("Two Strings");
      expect(await contracts.lute.getMajorModifier(9)).to.equal(
        "Three Strings"
      );
    });
  });

  describe("minor modifier", () => {
    it("gets lute minor modifier", async function () {
      expect(await contracts.lute.getMinorModifier(0)).to.equal("Five Frets");
    });

    it("lutes have different minor modifiers", async function () {
      expect(await contracts.lute.getMinorModifier(1)).to.equal("Six Frets");
      expect(await contracts.lute.getMinorModifier(2)).to.equal("Five Frets");
      expect(await contracts.lute.getMinorModifier(3)).to.equal("Six Frets");
      expect(await contracts.lute.getMinorModifier(4)).to.equal("Seven Frets");
      expect(await contracts.lute.getMinorModifier(5)).to.equal("Six Frets");
      expect(await contracts.lute.getMinorModifier(6)).to.equal("Seven Frets");
      expect(await contracts.lute.getMinorModifier(7)).to.equal("Five Frets");
      expect(await contracts.lute.getMinorModifier(8)).to.equal("Five Frets");
      expect(await contracts.lute.getMinorModifier(9)).to.equal("Six Frets");
    });
  });

  describe("range", () => {
    it("gets lute range", async function () {
      expect(await contracts.lute.getRange(0)).to.equal("Baritone");
    });

    it("lutes have different ranges", async function () {
      expect(await contracts.lute.getRange(1)).to.equal("Baritone");
      expect(await contracts.lute.getRange(2)).to.equal("Bass");
      expect(await contracts.lute.getRange(3)).to.equal("Bass");
      expect(await contracts.lute.getRange(4)).to.equal("Tenor");
      expect(await contracts.lute.getRange(5)).to.equal("Baritone");
      expect(await contracts.lute.getRange(6)).to.equal("Bass");
      expect(await contracts.lute.getRange(7)).to.equal("Tenor");
      expect(await contracts.lute.getRange(8)).to.equal("Baritone");
      expect(await contracts.lute.getRange(9)).to.equal("Bass");
    });
  });

  describe("name", () => {
    it("constructs full name", async function () {
      expect(await contracts.lute.getName(0)).to.equal("Ebony Baritone Oud");
    });
  });

  describe("SVG generation", () => {
    it("returns SVG as string", async function () {
      expect(await contracts.lute.tokenSVG(0)).to.equal(
        [
          '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350"><style>.base { fill: white; font-family: serif; font-size: 14px; }</style><rect width="100%" height="100%" fill="black" />',
          '<text x="10" y="20" class="base">Ebony Baritone Oud</text>',
          '<text x="10" y="40" class="base">Two Strings</text>',
          '<text x="10" y="60" class="base">Five Frets</text>',
          '<text x="10" y="80" class="base">Decorative Carving</text>',
          "</svg>",
        ].join("")
      );
    });
  });

  describe("JSON generation", () => {
    it("returns attributes JSON as string", async function () {
      expect(await contracts.lute.attributesJSON(0)).to.equal(
        JSON.stringify([
          { trait_type: "Type", value: "Oud" },
          { trait_type: "Range", value: "Baritone" },
          { trait_type: "Material", value: "Ebony" },
          { trait_type: "Major Modifier", value: "Two Strings" },
          { trait_type: "Minor Modifier", value: "Five Frets" },
          { trait_type: "Decoration", value: "Decorative Carving" },
        ])
      );
    });

    it("returns JSON as string", async function () {
      expect(await contracts.lute.tokenJSON(0)).to.equal(
        JSON.stringify({
          name: "Lute #0",
          description:
            "I hear that you and your bard have sold your lutes and bought flutes. I hear that you and your bard have sold your flutes and bought lutes.",
          image:
            "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaW5ZTWluIG1lZXQiIHZpZXdCb3g9IjAgMCAzNTAgMzUwIj48c3R5bGU+LmJhc2UgeyBmaWxsOiB3aGl0ZTsgZm9udC1mYW1pbHk6IHNlcmlmOyBmb250LXNpemU6IDE0cHg7IH08L3N0eWxlPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9ImJsYWNrIiAvPjx0ZXh0IHg9IjEwIiB5PSIyMCIgY2xhc3M9ImJhc2UiPkVib255IEJhcml0b25lIE91ZDwvdGV4dD48dGV4dCB4PSIxMCIgeT0iNDAiIGNsYXNzPSJiYXNlIj5Ud28gU3RyaW5nczwvdGV4dD48dGV4dCB4PSIxMCIgeT0iNjAiIGNsYXNzPSJiYXNlIj5GaXZlIEZyZXRzPC90ZXh0Pjx0ZXh0IHg9IjEwIiB5PSI4MCIgY2xhc3M9ImJhc2UiPkRlY29yYXRpdmUgQ2FydmluZzwvdGV4dD48L3N2Zz4=",
          attributes: [
            { trait_type: "Type", value: "Oud" },
            { trait_type: "Range", value: "Baritone" },
            { trait_type: "Material", value: "Ebony" },
            { trait_type: "Major Modifier", value: "Two Strings" },
            { trait_type: "Minor Modifier", value: "Five Frets" },
            { trait_type: "Decoration", value: "Decorative Carving" },
          ],
        })
      );
    });
  });
});
