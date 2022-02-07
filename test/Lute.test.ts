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
          '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 400">',
          "<style>.base { fill: rgb(30 58 138); font-family: Luminari, serif; font-size: 16px; }</style>",
          '<rect width="100%" height="100%" fill="rgb(253 240 221)" />',
          '<svg x="25" y="10"><path fill="#ff9811" d="m164 132.94-3.42-2.52-3.41 2.52c-1.5 1.1-36.86 27.5-36.86 57.62 0 9.15 4.36 17.67 12.27 23.99 7.54 6.01 17.48 9.32 28 9.32s20.47-3.3 28-9.32c7.92-6.32 12.28-14.84 12.28-23.99 0-30.11-35.36-56.51-36.86-57.62z"/><path fill="#bf720d" d="m164 132.94-3.42-2.52v93.45c10.52 0 20.47-3.3 28-9.32 7.92-6.32 12.28-14.84 12.28-23.99 0-30.11-35.36-56.51-36.86-57.62z"/><g fill="#50412e" transform="translate(75.24 53.19) scale(.33337)"><path d="M227.24 0v103.55h11.5v207.1h34.52v-207.1h11.5V0zm-17.26 396.94h92.04v34.52h-92.04z"/><circle cx="256" cy="350.92" r="17.26"/></g><path fill="#f7b239" d="m109.02 203.97-9.96.06-32.08 54.48 74.68-.39z"/><path fill="#c49270" d="m98.75 144.3 9.95-.05.32 59.72.07 13.32-9.96.05-.07-13.31z"/><path fill="#f7b239" d="m98.8 154.67-3.93-22.6 17.58-.09-3.7 22.64z"/><g fill="#4d4d4d" transform="rotate(-45.3 260.43 83.56) scale(.23813)"><circle cx="176.11" cy="335.89" r="31.98"/><path d="m145.9 410.42-44.31-44.3 12.08-12.09 44.3 44.3z"/></g><path fill="#ff9811" d="M86.4 160.12a15.83 15.83 0 0 1-1.56-9.5 17.24 17.24 0 0 0 .2-2.56c0-8.75-6.61-15.87-14.74-15.87-8.12 0-14.73 7.12-14.73 15.87 0 .86.06 1.72.19 2.56.48 3.22-.07 6.6-1.56 9.5a18.1 18.1 0 0 0 16.1 26.32 18.1 18.1 0 0 0 16.1-26.32z"/><path fill="#bf720d" d="M86.4 160.12a15.83 15.83 0 0 1-1.56-9.5 17.24 17.24 0 0 0 .2-2.56c0-8.7-6.54-15.79-14.6-15.87v54.25a18.1 18.1 0 0 0 15.96-26.32z"/><path fill="#50412e" d="m65.28 97.03-1 22.1h3.14v40.18h6.03v-40.18h2.88l-1-22.1zm-1 69.32h12.05v6.02H64.27z"/><g transform="translate(172.73 147) scale(.19844)"><circle cx="256" cy="149.57" r="57.53" fill="#bf720d"/><path fill="#ff9811" d="M306.9 305.97c-17.23-9.08-29.94-25.59-34.87-45.3l-33.98 1.54a69.84 69.84 0 0 1-34.19 44.42 108.8 108.8 0 0 0-57.1 99.97 108.93 108.93 0 0 0 31.3 72.62A108.8 108.8 0 0 0 256.1 512a108.3 108.3 0 0 0 75.12-30 108.32 108.32 0 0 0 34.1-79.3c0-40.68-22.38-77.75-58.4-96.73z"/><path fill="#bf720d" d="M306.9 305.97c-17.23-9.08-29.94-25.59-34.87-45.3l-16.8.77v250.55l.85.01a108.3 108.3 0 0 0 75.13-30 108.32 108.32 0 0 0 34.1-79.3c0-40.68-22.38-77.75-58.4-96.73z"/><path fill="#50412e" d="M238.74 310.65h34.52V57.53h11.5V0h-57.52v57.53h11.5zm-11.5 63.28h57.52v34.52h-57.53zm11.5 86.3v50.39a108.48 108.48 0 0 0 34.52.02v-50.42z"/></g><g transform="rotate(-45 175.15 157.94) scale(.26458)"><path fill="#cc582f" d="m22.72 498.28-9-9 24.5-24.48 9 9zM9 475.97l-9-9 20.2-20.2 9 9zM45.03 512l-9-9 20.2-20.2 9 9z"/><path fill="#cc582f" d="M247.04 303.81c26.55 51.38 7.76 128.35-33.86 169.97-48.31 48.32-126.65 48.33-174.96.02-48.31-48.32-48.31-126.65 0-174.96 41.64-41.65 118.6-60.42 170-33.85z"/><path fill="#4d4d4d" d="m135.6 443.73-67.32-67.31 9-9 67.31 67.32z"/><path fill="#e0b08c" d="m397.18 84.71 30 1.4.12 28.72a11.43 11.43 0 0 0-2.44 1.95L247.04 303.82l-29.71 31.23-40.35-40.34L208.22 265h.02L395.22 87.14a11.68 11.68 0 0 0 1.95-2.44z"/><path fill="#666" d="m414.38 68.33-37.02-37.02 9-9 37.02 37.02zm66.32 66.32-37-37.02 9-9 37.01 37.02zm-44.3-88.92L399.66 9.01l9-9 36.72 36.73zm66.6 66.62-36.72-36.73 9-9L512 103.35z"/><path fill="#cc582f" d="M414.37 59.32c6.99-5.82 15.44-13.74 22.01-22.58a67.79 67.79 0 0 0 6.85-11.12c1.4-2.9 5.34-3.33 8.85-.88a2500.88 2500.88 0 0 0 16.79 11.57 31.4 31.4 0 0 1 6.84 6.84c3 4.38 7.27 10.62 11.57 16.78 2.44 3.52 2 7.46-.9 8.85a68.41 68.41 0 0 0-11.1 6.84c-8.84 6.57-16.75 15.03-22.58 22.03a186.1 186.1 0 0 0-8.5 10.97 7.54 7.54 0 0 1-4.77 3l-7.88 1.59a13.1 13.1 0 0 0-4.25 1.62L397.18 84.7l-.01-.01a12.9 12.9 0 0 0 1.63-4.23l1.58-7.9a7.55 7.55 0 0 1 3-4.76 184 184 0 0 0 10.99-8.5z"/><circle cx="151.03" cy="360.99" r="18.19" fill="#4d4d4d"/></g><path fill="#c49270" d="M273.49 217.02h-3.74l.02-6.79h3.73z"/><path fill="#666" d="M266.28 151.61H255.3v-3.73h10.98zm-.01-25.53H255.3v-3.73h10.97zm.01 16.77H255.3v-3.74h10.97zm0-6.48H255.3v-3.73h10.98zm-.01-25.91H255.3v-3.74h10.97zm0-13.34H255.3v-3.73h10.97zm0-5.72H255.3v-3.73h10.97z"/><path fill="#f7b239" d="m262.54 158.03 9.92-8.47 8.47 8.47a24.96 24.96 0 0 0 9.36 19.48c4.55 3.65 7.36 8.63 7.36 14.12 0 11.17-11.6 20.23-25.91 20.23s-25.91-9.06-25.92-20.23c0-5.5 2.8-10.47 7.36-14.12a24.96 24.96 0 0 0 9.36-19.48zm18.39-77.6v7.96h-14.91v-7.96z"/><path fill="#c49270" d="M280.93 158.03h-18.39V86.11l18.39.33z"/><path fill="#666" d="M281.98 200.39h-20.5v-3.74h20.5zm0-9.15h-20.5v-3.73h20.5zm0-6.47h-20.5v-3.74h20.5z"/><path fill="#ff9811" d="M197.6 10.06h15.05v9.03H197.6z"/><path fill="#bf720d" d="M205.12 128.97h9.03V138h-9.03zm0-126.44h9.03V77.8h-9.03z"/><path fill="#ff9811" d="M209.64 130.47c-15.77 0-28.6-12.83-28.6-28.6s12.83-28.6 28.6-28.6 28.6 12.83 28.6 28.6-12.83 28.6-28.6 28.6z"/><path fill="#bf720d" d="M209.64 73.27c15.77 0 28.6 12.83 28.6 28.6s-12.83 28.6-28.6 28.6"/><path fill="#fff0b4" d="M209.64 118.43c-9.13 0-16.56-7.43-16.56-16.56s7.43-16.56 16.56-16.56a16.57 16.57 0 0 1 0 33.12z"/><path fill="#ffda44" d="M209.64 85.32a16.56 16.56 0 0 1 0 33.11"/><path fill="#50412e" d="M205.12 97.36h9.03v9.03h-9.03z"/><path fill="#ff9811" d="m123.66 53.07-2.82-4.94-2.82 4.94c-.73 1.27-17.77 31.28-17.77 47.13 0 15.09 18.65 22.26 19.45 22.55l1.14.43 1.14-.43a42.3 42.3 0 0 0 9.48-5.32c6.52-4.89 9.97-10.85 9.97-17.23 0-15.85-17.04-45.86-17.77-47.13z"/><path fill="#bf720d" d="m120.84 123.18 1.14-.43a42.3 42.3 0 0 0 9.48-5.32c6.52-4.89 9.97-10.85 9.97-17.23 0-15.85-17.04-45.86-17.77-47.13l-2.82-4.94"/><g fill="#50412e" transform="translate(72.07 26.5) scale(.1905)"><path d="M290.13 68.27C290.13 49.42 256 0 256 0s-34.13 49.42-34.13 68.27a34.11 34.11 0 0 0 17.06 29.55v254.9h34.14V97.81a34.11 34.11 0 0 0 17.06-29.55z"/><circle cx="227.56" cy="392.53" r="17.07"/><circle cx="284.44" cy="392.53" r="17.07"/><path d="M238.93 432.36h34.14V512h-34.14z"/></g></svg>',
          '<text x="170" y="300" class="base" text-anchor="middle">Pine Baritone Lute of Brilliance</text>',
          '<text x="170" y="325" class="base" text-anchor="middle">Twelve Strings</text>',
          '<text x="170" y="350" class="base" text-anchor="middle">Eight Frets</text>',
          '<text x="170" y="375" class="base" text-anchor="middle">Hardwood Inlay</text>',
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

    it("returns JSON as string", async function () {
      expect(await contracts.lute.tokenJSON(0)).to.equal(
        JSON.stringify({
          name: "Lute #0",
          description:
            "I hear that you and your bard have sold your lutes and bought flutes.",
          image:
            "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaW5ZTWluIG1lZXQiIHZpZXdCb3g9IjAgMCAzNTAgNDAwIj48c3R5bGU+LmJhc2UgeyBmaWxsOiByZ2IoMzAgNTggMTM4KTsgZm9udC1mYW1pbHk6IEx1bWluYXJpLCBzZXJpZjsgZm9udC1zaXplOiAxNnB4OyB9PC9zdHlsZT48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJyZ2IoMjUzIDI0MCAyMjEpIiAvPjxzdmcgeD0iMjUiIHk9IjEwIj48cGF0aCBmaWxsPSIjZmY5ODExIiBkPSJtMTY0IDEzMi45NC0zLjQyLTIuNTItMy40MSAyLjUyYy0xLjUgMS4xLTM2Ljg2IDI3LjUtMzYuODYgNTcuNjIgMCA5LjE1IDQuMzYgMTcuNjcgMTIuMjcgMjMuOTkgNy41NCA2LjAxIDE3LjQ4IDkuMzIgMjggOS4zMnMyMC40Ny0zLjMgMjgtOS4zMmM3LjkyLTYuMzIgMTIuMjgtMTQuODQgMTIuMjgtMjMuOTkgMC0zMC4xMS0zNS4zNi01Ni41MS0zNi44Ni01Ny42MnoiLz48cGF0aCBmaWxsPSIjYmY3MjBkIiBkPSJtMTY0IDEzMi45NC0zLjQyLTIuNTJ2OTMuNDVjMTAuNTIgMCAyMC40Ny0zLjMgMjgtOS4zMiA3LjkyLTYuMzIgMTIuMjgtMTQuODQgMTIuMjgtMjMuOTkgMC0zMC4xMS0zNS4zNi01Ni41MS0zNi44Ni01Ny42MnoiLz48ZyBmaWxsPSIjNTA0MTJlIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg3NS4yNCA1My4xOSkgc2NhbGUoLjMzMzM3KSI+PHBhdGggZD0iTTIyNy4yNCAwdjEwMy41NWgxMS41djIwNy4xaDM0LjUydi0yMDcuMWgxMS41VjB6bS0xNy4yNiAzOTYuOTRoOTIuMDR2MzQuNTJoLTkyLjA0eiIvPjxjaXJjbGUgY3g9IjI1NiIgY3k9IjM1MC45MiIgcj0iMTcuMjYiLz48L2c+PHBhdGggZmlsbD0iI2Y3YjIzOSIgZD0ibTEwOS4wMiAyMDMuOTctOS45Ni4wNi0zMi4wOCA1NC40OCA3NC42OC0uMzl6Ii8+PHBhdGggZmlsbD0iI2M0OTI3MCIgZD0ibTk4Ljc1IDE0NC4zIDkuOTUtLjA1LjMyIDU5LjcyLjA3IDEzLjMyLTkuOTYuMDUtLjA3LTEzLjMxeiIvPjxwYXRoIGZpbGw9IiNmN2IyMzkiIGQ9Im05OC44IDE1NC42Ny0zLjkzLTIyLjYgMTcuNTgtLjA5LTMuNyAyMi42NHoiLz48ZyBmaWxsPSIjNGQ0ZDRkIiB0cmFuc2Zvcm09InJvdGF0ZSgtNDUuMyAyNjAuNDMgODMuNTYpIHNjYWxlKC4yMzgxMykiPjxjaXJjbGUgY3g9IjE3Ni4xMSIgY3k9IjMzNS44OSIgcj0iMzEuOTgiLz48cGF0aCBkPSJtMTQ1LjkgNDEwLjQyLTQ0LjMxLTQ0LjMgMTIuMDgtMTIuMDkgNDQuMyA0NC4zeiIvPjwvZz48cGF0aCBmaWxsPSIjZmY5ODExIiBkPSJNODYuNCAxNjAuMTJhMTUuODMgMTUuODMgMCAwIDEtMS41Ni05LjUgMTcuMjQgMTcuMjQgMCAwIDAgLjItMi41NmMwLTguNzUtNi42MS0xNS44Ny0xNC43NC0xNS44Ny04LjEyIDAtMTQuNzMgNy4xMi0xNC43MyAxNS44NyAwIC44Ni4wNiAxLjcyLjE5IDIuNTYuNDggMy4yMi0uMDcgNi42LTEuNTYgOS41YTE4LjEgMTguMSAwIDAgMCAxNi4xIDI2LjMyIDE4LjEgMTguMSAwIDAgMCAxNi4xLTI2LjMyeiIvPjxwYXRoIGZpbGw9IiNiZjcyMGQiIGQ9Ik04Ni40IDE2MC4xMmExNS44MyAxNS44MyAwIDAgMS0xLjU2LTkuNSAxNy4yNCAxNy4yNCAwIDAgMCAuMi0yLjU2YzAtOC43LTYuNTQtMTUuNzktMTQuNi0xNS44N3Y1NC4yNWExOC4xIDE4LjEgMCAwIDAgMTUuOTYtMjYuMzJ6Ii8+PHBhdGggZmlsbD0iIzUwNDEyZSIgZD0ibTY1LjI4IDk3LjAzLTEgMjIuMWgzLjE0djQwLjE4aDYuMDN2LTQwLjE4aDIuODhsLTEtMjIuMXptLTEgNjkuMzJoMTIuMDV2Ni4wMkg2NC4yN3oiLz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNzIuNzMgMTQ3KSBzY2FsZSguMTk4NDQpIj48Y2lyY2xlIGN4PSIyNTYiIGN5PSIxNDkuNTciIHI9IjU3LjUzIiBmaWxsPSIjYmY3MjBkIi8+PHBhdGggZmlsbD0iI2ZmOTgxMSIgZD0iTTMwNi45IDMwNS45N2MtMTcuMjMtOS4wOC0yOS45NC0yNS41OS0zNC44Ny00NS4zbC0zMy45OCAxLjU0YTY5Ljg0IDY5Ljg0IDAgMCAxLTM0LjE5IDQ0LjQyIDEwOC44IDEwOC44IDAgMCAwLTU3LjEgOTkuOTcgMTA4LjkzIDEwOC45MyAwIDAgMCAzMS4zIDcyLjYyQTEwOC44IDEwOC44IDAgMCAwIDI1Ni4xIDUxMmExMDguMyAxMDguMyAwIDAgMCA3NS4xMi0zMCAxMDguMzIgMTA4LjMyIDAgMCAwIDM0LjEtNzkuM2MwLTQwLjY4LTIyLjM4LTc3Ljc1LTU4LjQtOTYuNzN6Ii8+PHBhdGggZmlsbD0iI2JmNzIwZCIgZD0iTTMwNi45IDMwNS45N2MtMTcuMjMtOS4wOC0yOS45NC0yNS41OS0zNC44Ny00NS4zbC0xNi44Ljc3djI1MC41NWwuODUuMDFhMTA4LjMgMTA4LjMgMCAwIDAgNzUuMTMtMzAgMTA4LjMyIDEwOC4zMiAwIDAgMCAzNC4xLTc5LjNjMC00MC42OC0yMi4zOC03Ny43NS01OC40LTk2LjczeiIvPjxwYXRoIGZpbGw9IiM1MDQxMmUiIGQ9Ik0yMzguNzQgMzEwLjY1aDM0LjUyVjU3LjUzaDExLjVWMGgtNTcuNTJ2NTcuNTNoMTEuNXptLTExLjUgNjMuMjhoNTcuNTJ2MzQuNTJoLTU3LjUzem0xMS41IDg2LjN2NTAuMzlhMTA4LjQ4IDEwOC40OCAwIDAgMCAzNC41Mi4wMnYtNTAuNDJ6Ii8+PC9nPjxnIHRyYW5zZm9ybT0icm90YXRlKC00NSAxNzUuMTUgMTU3Ljk0KSBzY2FsZSguMjY0NTgpIj48cGF0aCBmaWxsPSIjY2M1ODJmIiBkPSJtMjIuNzIgNDk4LjI4LTktOSAyNC41LTI0LjQ4IDkgOXpNOSA0NzUuOTdsLTktOSAyMC4yLTIwLjIgOSA5ek00NS4wMyA1MTJsLTktOSAyMC4yLTIwLjIgOSA5eiIvPjxwYXRoIGZpbGw9IiNjYzU4MmYiIGQ9Ik0yNDcuMDQgMzAzLjgxYzI2LjU1IDUxLjM4IDcuNzYgMTI4LjM1LTMzLjg2IDE2OS45Ny00OC4zMSA0OC4zMi0xMjYuNjUgNDguMzMtMTc0Ljk2LjAyLTQ4LjMxLTQ4LjMyLTQ4LjMxLTEyNi42NSAwLTE3NC45NiA0MS42NC00MS42NSAxMTguNi02MC40MiAxNzAtMzMuODV6Ii8+PHBhdGggZmlsbD0iIzRkNGQ0ZCIgZD0ibTEzNS42IDQ0My43My02Ny4zMi02Ny4zMSA5LTkgNjcuMzEgNjcuMzJ6Ii8+PHBhdGggZmlsbD0iI2UwYjA4YyIgZD0ibTM5Ny4xOCA4NC43MSAzMCAxLjQuMTIgMjguNzJhMTEuNDMgMTEuNDMgMCAwIDAtMi40NCAxLjk1TDI0Ny4wNCAzMDMuODJsLTI5LjcxIDMxLjIzLTQwLjM1LTQwLjM0TDIwOC4yMiAyNjVoLjAyTDM5NS4yMiA4Ny4xNGExMS42OCAxMS42OCAwIDAgMCAxLjk1LTIuNDR6Ii8+PHBhdGggZmlsbD0iIzY2NiIgZD0ibTQxNC4zOCA2OC4zMy0zNy4wMi0zNy4wMiA5LTkgMzcuMDIgMzcuMDJ6bTY2LjMyIDY2LjMyLTM3LTM3LjAyIDktOSAzNy4wMSAzNy4wMnptLTQ0LjMtODguOTJMMzk5LjY2IDkuMDFsOS05IDM2LjcyIDM2Ljczem02Ni42IDY2LjYyLTM2LjcyLTM2LjczIDktOUw1MTIgMTAzLjM1eiIvPjxwYXRoIGZpbGw9IiNjYzU4MmYiIGQ9Ik00MTQuMzcgNTkuMzJjNi45OS01LjgyIDE1LjQ0LTEzLjc0IDIyLjAxLTIyLjU4YTY3Ljc5IDY3Ljc5IDAgMCAwIDYuODUtMTEuMTJjMS40LTIuOSA1LjM0LTMuMzMgOC44NS0uODhhMjUwMC44OCAyNTAwLjg4IDAgMCAwIDE2Ljc5IDExLjU3IDMxLjQgMzEuNCAwIDAgMSA2Ljg0IDYuODRjMyA0LjM4IDcuMjcgMTAuNjIgMTEuNTcgMTYuNzggMi40NCAzLjUyIDIgNy40Ni0uOSA4Ljg1YTY4LjQxIDY4LjQxIDAgMCAwLTExLjEgNi44NGMtOC44NCA2LjU3LTE2Ljc1IDE1LjAzLTIyLjU4IDIyLjAzYTE4Ni4xIDE4Ni4xIDAgMCAwLTguNSAxMC45NyA3LjU0IDcuNTQgMCAwIDEtNC43NyAzbC03Ljg4IDEuNTlhMTMuMSAxMy4xIDAgMCAwLTQuMjUgMS42MkwzOTcuMTggODQuN2wtLjAxLS4wMWExMi45IDEyLjkgMCAwIDAgMS42My00LjIzbDEuNTgtNy45YTcuNTUgNy41NSAwIDAgMSAzLTQuNzYgMTg0IDE4NCAwIDAgMCAxMC45OS04LjV6Ii8+PGNpcmNsZSBjeD0iMTUxLjAzIiBjeT0iMzYwLjk5IiByPSIxOC4xOSIgZmlsbD0iIzRkNGQ0ZCIvPjwvZz48cGF0aCBmaWxsPSIjYzQ5MjcwIiBkPSJNMjczLjQ5IDIxNy4wMmgtMy43NGwuMDItNi43OWgzLjczeiIvPjxwYXRoIGZpbGw9IiM2NjYiIGQ9Ik0yNjYuMjggMTUxLjYxSDI1NS4zdi0zLjczaDEwLjk4em0tLjAxLTI1LjUzSDI1NS4zdi0zLjczaDEwLjk3em0uMDEgMTYuNzdIMjU1LjN2LTMuNzRoMTAuOTd6bTAtNi40OEgyNTUuM3YtMy43M2gxMC45OHptLS4wMS0yNS45MUgyNTUuM3YtMy43NGgxMC45N3ptMC0xMy4zNEgyNTUuM3YtMy43M2gxMC45N3ptMC01LjcySDI1NS4zdi0zLjczaDEwLjk3eiIvPjxwYXRoIGZpbGw9IiNmN2IyMzkiIGQ9Im0yNjIuNTQgMTU4LjAzIDkuOTItOC40NyA4LjQ3IDguNDdhMjQuOTYgMjQuOTYgMCAwIDAgOS4zNiAxOS40OGM0LjU1IDMuNjUgNy4zNiA4LjYzIDcuMzYgMTQuMTIgMCAxMS4xNy0xMS42IDIwLjIzLTI1LjkxIDIwLjIzcy0yNS45MS05LjA2LTI1LjkyLTIwLjIzYzAtNS41IDIuOC0xMC40NyA3LjM2LTE0LjEyYTI0Ljk2IDI0Ljk2IDAgMCAwIDkuMzYtMTkuNDh6bTE4LjM5LTc3LjZ2Ny45NmgtMTQuOTF2LTcuOTZ6Ii8+PHBhdGggZmlsbD0iI2M0OTI3MCIgZD0iTTI4MC45MyAxNTguMDNoLTE4LjM5Vjg2LjExbDE4LjM5LjMzeiIvPjxwYXRoIGZpbGw9IiM2NjYiIGQ9Ik0yODEuOTggMjAwLjM5aC0yMC41di0zLjc0aDIwLjV6bTAtOS4xNWgtMjAuNXYtMy43M2gyMC41em0wLTYuNDdoLTIwLjV2LTMuNzRoMjAuNXoiLz48cGF0aCBmaWxsPSIjZmY5ODExIiBkPSJNMTk3LjYgMTAuMDZoMTUuMDV2OS4wM0gxOTcuNnoiLz48cGF0aCBmaWxsPSIjYmY3MjBkIiBkPSJNMjA1LjEyIDEyOC45N2g5LjAzVjEzOGgtOS4wM3ptMC0xMjYuNDRoOS4wM1Y3Ny44aC05LjAzeiIvPjxwYXRoIGZpbGw9IiNmZjk4MTEiIGQ9Ik0yMDkuNjQgMTMwLjQ3Yy0xNS43NyAwLTI4LjYtMTIuODMtMjguNi0yOC42czEyLjgzLTI4LjYgMjguNi0yOC42IDI4LjYgMTIuODMgMjguNiAyOC42LTEyLjgzIDI4LjYtMjguNiAyOC42eiIvPjxwYXRoIGZpbGw9IiNiZjcyMGQiIGQ9Ik0yMDkuNjQgNzMuMjdjMTUuNzcgMCAyOC42IDEyLjgzIDI4LjYgMjguNnMtMTIuODMgMjguNi0yOC42IDI4LjYiLz48cGF0aCBmaWxsPSIjZmZmMGI0IiBkPSJNMjA5LjY0IDExOC40M2MtOS4xMyAwLTE2LjU2LTcuNDMtMTYuNTYtMTYuNTZzNy40My0xNi41NiAxNi41Ni0xNi41NmExNi41NyAxNi41NyAwIDAgMSAwIDMzLjEyeiIvPjxwYXRoIGZpbGw9IiNmZmRhNDQiIGQ9Ik0yMDkuNjQgODUuMzJhMTYuNTYgMTYuNTYgMCAwIDEgMCAzMy4xMSIvPjxwYXRoIGZpbGw9IiM1MDQxMmUiIGQ9Ik0yMDUuMTIgOTcuMzZoOS4wM3Y5LjAzaC05LjAzeiIvPjxwYXRoIGZpbGw9IiNmZjk4MTEiIGQ9Im0xMjMuNjYgNTMuMDctMi44Mi00Ljk0LTIuODIgNC45NGMtLjczIDEuMjctMTcuNzcgMzEuMjgtMTcuNzcgNDcuMTMgMCAxNS4wOSAxOC42NSAyMi4yNiAxOS40NSAyMi41NWwxLjE0LjQzIDEuMTQtLjQzYTQyLjMgNDIuMyAwIDAgMCA5LjQ4LTUuMzJjNi41Mi00Ljg5IDkuOTctMTAuODUgOS45Ny0xNy4yMyAwLTE1Ljg1LTE3LjA0LTQ1Ljg2LTE3Ljc3LTQ3LjEzeiIvPjxwYXRoIGZpbGw9IiNiZjcyMGQiIGQ9Im0xMjAuODQgMTIzLjE4IDEuMTQtLjQzYTQyLjMgNDIuMyAwIDAgMCA5LjQ4LTUuMzJjNi41Mi00Ljg5IDkuOTctMTAuODUgOS45Ny0xNy4yMyAwLTE1Ljg1LTE3LjA0LTQ1Ljg2LTE3Ljc3LTQ3LjEzbC0yLjgyLTQuOTQiLz48ZyBmaWxsPSIjNTA0MTJlIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg3Mi4wNyAyNi41KSBzY2FsZSguMTkwNSkiPjxwYXRoIGQ9Ik0yOTAuMTMgNjguMjdDMjkwLjEzIDQ5LjQyIDI1NiAwIDI1NiAwcy0zNC4xMyA0OS40Mi0zNC4xMyA2OC4yN2EzNC4xMSAzNC4xMSAwIDAgMCAxNy4wNiAyOS41NXYyNTQuOWgzNC4xNFY5Ny44MWEzNC4xMSAzNC4xMSAwIDAgMCAxNy4wNi0yOS41NXoiLz48Y2lyY2xlIGN4PSIyMjcuNTYiIGN5PSIzOTIuNTMiIHI9IjE3LjA3Ii8+PGNpcmNsZSBjeD0iMjg0LjQ0IiBjeT0iMzkyLjUzIiByPSIxNy4wNyIvPjxwYXRoIGQ9Ik0yMzguOTMgNDMyLjM2aDM0LjE0VjUxMmgtMzQuMTR6Ii8+PC9nPjwvc3ZnPjx0ZXh0IHg9IjE3MCIgeT0iMzAwIiBjbGFzcz0iYmFzZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UGluZSBCYXJpdG9uZSBMdXRlIG9mIEJyaWxsaWFuY2U8L3RleHQ+PHRleHQgeD0iMTcwIiB5PSIzMjUiIGNsYXNzPSJiYXNlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5Ud2VsdmUgU3RyaW5nczwvdGV4dD48dGV4dCB4PSIxNzAiIHk9IjM1MCIgY2xhc3M9ImJhc2UiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkVpZ2h0IEZyZXRzPC90ZXh0Pjx0ZXh0IHg9IjE3MCIgeT0iMzc1IiBjbGFzcz0iYmFzZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SGFyZHdvb2QgSW5sYXk8L3RleHQ+PC9zdmc+",
          attributes: [
            { trait_type: "Type", value: "Lute" },
            { trait_type: "Range", value: "Baritone" },
            { trait_type: "Material", value: "Pine" },
            { trait_type: "Major Modifier", value: "Twelve Strings" },
            { trait_type: "Minor Modifier", value: "Eight Frets" },
            { trait_type: "Decoration", value: "Hardwood Inlay" },
            { trait_type: "Order", value: "Brilliance" },
          ],
        })
      );
    });
  });

  describe("token URI", () => {
    it("generates base64 JSON data", async function () {
      const json = JSON.stringify({
        name: "Lute #0",
        description:
          "I hear that you and your bard have sold your lutes and bought flutes.",
        image:
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaW5ZTWluIG1lZXQiIHZpZXdCb3g9IjAgMCAzNTAgNDAwIj48c3R5bGU+LmJhc2UgeyBmaWxsOiByZ2IoMzAgNTggMTM4KTsgZm9udC1mYW1pbHk6IEx1bWluYXJpLCBzZXJpZjsgZm9udC1zaXplOiAxNnB4OyB9PC9zdHlsZT48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJyZ2IoMjUzIDI0MCAyMjEpIiAvPjxzdmcgeD0iMjUiIHk9IjEwIj48cGF0aCBmaWxsPSIjZmY5ODExIiBkPSJtMTY0IDEzMi45NC0zLjQyLTIuNTItMy40MSAyLjUyYy0xLjUgMS4xLTM2Ljg2IDI3LjUtMzYuODYgNTcuNjIgMCA5LjE1IDQuMzYgMTcuNjcgMTIuMjcgMjMuOTkgNy41NCA2LjAxIDE3LjQ4IDkuMzIgMjggOS4zMnMyMC40Ny0zLjMgMjgtOS4zMmM3LjkyLTYuMzIgMTIuMjgtMTQuODQgMTIuMjgtMjMuOTkgMC0zMC4xMS0zNS4zNi01Ni41MS0zNi44Ni01Ny42MnoiLz48cGF0aCBmaWxsPSIjYmY3MjBkIiBkPSJtMTY0IDEzMi45NC0zLjQyLTIuNTJ2OTMuNDVjMTAuNTIgMCAyMC40Ny0zLjMgMjgtOS4zMiA3LjkyLTYuMzIgMTIuMjgtMTQuODQgMTIuMjgtMjMuOTkgMC0zMC4xMS0zNS4zNi01Ni41MS0zNi44Ni01Ny42MnoiLz48ZyBmaWxsPSIjNTA0MTJlIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg3NS4yNCA1My4xOSkgc2NhbGUoLjMzMzM3KSI+PHBhdGggZD0iTTIyNy4yNCAwdjEwMy41NWgxMS41djIwNy4xaDM0LjUydi0yMDcuMWgxMS41VjB6bS0xNy4yNiAzOTYuOTRoOTIuMDR2MzQuNTJoLTkyLjA0eiIvPjxjaXJjbGUgY3g9IjI1NiIgY3k9IjM1MC45MiIgcj0iMTcuMjYiLz48L2c+PHBhdGggZmlsbD0iI2Y3YjIzOSIgZD0ibTEwOS4wMiAyMDMuOTctOS45Ni4wNi0zMi4wOCA1NC40OCA3NC42OC0uMzl6Ii8+PHBhdGggZmlsbD0iI2M0OTI3MCIgZD0ibTk4Ljc1IDE0NC4zIDkuOTUtLjA1LjMyIDU5LjcyLjA3IDEzLjMyLTkuOTYuMDUtLjA3LTEzLjMxeiIvPjxwYXRoIGZpbGw9IiNmN2IyMzkiIGQ9Im05OC44IDE1NC42Ny0zLjkzLTIyLjYgMTcuNTgtLjA5LTMuNyAyMi42NHoiLz48ZyBmaWxsPSIjNGQ0ZDRkIiB0cmFuc2Zvcm09InJvdGF0ZSgtNDUuMyAyNjAuNDMgODMuNTYpIHNjYWxlKC4yMzgxMykiPjxjaXJjbGUgY3g9IjE3Ni4xMSIgY3k9IjMzNS44OSIgcj0iMzEuOTgiLz48cGF0aCBkPSJtMTQ1LjkgNDEwLjQyLTQ0LjMxLTQ0LjMgMTIuMDgtMTIuMDkgNDQuMyA0NC4zeiIvPjwvZz48cGF0aCBmaWxsPSIjZmY5ODExIiBkPSJNODYuNCAxNjAuMTJhMTUuODMgMTUuODMgMCAwIDEtMS41Ni05LjUgMTcuMjQgMTcuMjQgMCAwIDAgLjItMi41NmMwLTguNzUtNi42MS0xNS44Ny0xNC43NC0xNS44Ny04LjEyIDAtMTQuNzMgNy4xMi0xNC43MyAxNS44NyAwIC44Ni4wNiAxLjcyLjE5IDIuNTYuNDggMy4yMi0uMDcgNi42LTEuNTYgOS41YTE4LjEgMTguMSAwIDAgMCAxNi4xIDI2LjMyIDE4LjEgMTguMSAwIDAgMCAxNi4xLTI2LjMyeiIvPjxwYXRoIGZpbGw9IiNiZjcyMGQiIGQ9Ik04Ni40IDE2MC4xMmExNS44MyAxNS44MyAwIDAgMS0xLjU2LTkuNSAxNy4yNCAxNy4yNCAwIDAgMCAuMi0yLjU2YzAtOC43LTYuNTQtMTUuNzktMTQuNi0xNS44N3Y1NC4yNWExOC4xIDE4LjEgMCAwIDAgMTUuOTYtMjYuMzJ6Ii8+PHBhdGggZmlsbD0iIzUwNDEyZSIgZD0ibTY1LjI4IDk3LjAzLTEgMjIuMWgzLjE0djQwLjE4aDYuMDN2LTQwLjE4aDIuODhsLTEtMjIuMXptLTEgNjkuMzJoMTIuMDV2Ni4wMkg2NC4yN3oiLz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNzIuNzMgMTQ3KSBzY2FsZSguMTk4NDQpIj48Y2lyY2xlIGN4PSIyNTYiIGN5PSIxNDkuNTciIHI9IjU3LjUzIiBmaWxsPSIjYmY3MjBkIi8+PHBhdGggZmlsbD0iI2ZmOTgxMSIgZD0iTTMwNi45IDMwNS45N2MtMTcuMjMtOS4wOC0yOS45NC0yNS41OS0zNC44Ny00NS4zbC0zMy45OCAxLjU0YTY5Ljg0IDY5Ljg0IDAgMCAxLTM0LjE5IDQ0LjQyIDEwOC44IDEwOC44IDAgMCAwLTU3LjEgOTkuOTcgMTA4LjkzIDEwOC45MyAwIDAgMCAzMS4zIDcyLjYyQTEwOC44IDEwOC44IDAgMCAwIDI1Ni4xIDUxMmExMDguMyAxMDguMyAwIDAgMCA3NS4xMi0zMCAxMDguMzIgMTA4LjMyIDAgMCAwIDM0LjEtNzkuM2MwLTQwLjY4LTIyLjM4LTc3Ljc1LTU4LjQtOTYuNzN6Ii8+PHBhdGggZmlsbD0iI2JmNzIwZCIgZD0iTTMwNi45IDMwNS45N2MtMTcuMjMtOS4wOC0yOS45NC0yNS41OS0zNC44Ny00NS4zbC0xNi44Ljc3djI1MC41NWwuODUuMDFhMTA4LjMgMTA4LjMgMCAwIDAgNzUuMTMtMzAgMTA4LjMyIDEwOC4zMiAwIDAgMCAzNC4xLTc5LjNjMC00MC42OC0yMi4zOC03Ny43NS01OC40LTk2LjczeiIvPjxwYXRoIGZpbGw9IiM1MDQxMmUiIGQ9Ik0yMzguNzQgMzEwLjY1aDM0LjUyVjU3LjUzaDExLjVWMGgtNTcuNTJ2NTcuNTNoMTEuNXptLTExLjUgNjMuMjhoNTcuNTJ2MzQuNTJoLTU3LjUzem0xMS41IDg2LjN2NTAuMzlhMTA4LjQ4IDEwOC40OCAwIDAgMCAzNC41Mi4wMnYtNTAuNDJ6Ii8+PC9nPjxnIHRyYW5zZm9ybT0icm90YXRlKC00NSAxNzUuMTUgMTU3Ljk0KSBzY2FsZSguMjY0NTgpIj48cGF0aCBmaWxsPSIjY2M1ODJmIiBkPSJtMjIuNzIgNDk4LjI4LTktOSAyNC41LTI0LjQ4IDkgOXpNOSA0NzUuOTdsLTktOSAyMC4yLTIwLjIgOSA5ek00NS4wMyA1MTJsLTktOSAyMC4yLTIwLjIgOSA5eiIvPjxwYXRoIGZpbGw9IiNjYzU4MmYiIGQ9Ik0yNDcuMDQgMzAzLjgxYzI2LjU1IDUxLjM4IDcuNzYgMTI4LjM1LTMzLjg2IDE2OS45Ny00OC4zMSA0OC4zMi0xMjYuNjUgNDguMzMtMTc0Ljk2LjAyLTQ4LjMxLTQ4LjMyLTQ4LjMxLTEyNi42NSAwLTE3NC45NiA0MS42NC00MS42NSAxMTguNi02MC40MiAxNzAtMzMuODV6Ii8+PHBhdGggZmlsbD0iIzRkNGQ0ZCIgZD0ibTEzNS42IDQ0My43My02Ny4zMi02Ny4zMSA5LTkgNjcuMzEgNjcuMzJ6Ii8+PHBhdGggZmlsbD0iI2UwYjA4YyIgZD0ibTM5Ny4xOCA4NC43MSAzMCAxLjQuMTIgMjguNzJhMTEuNDMgMTEuNDMgMCAwIDAtMi40NCAxLjk1TDI0Ny4wNCAzMDMuODJsLTI5LjcxIDMxLjIzLTQwLjM1LTQwLjM0TDIwOC4yMiAyNjVoLjAyTDM5NS4yMiA4Ny4xNGExMS42OCAxMS42OCAwIDAgMCAxLjk1LTIuNDR6Ii8+PHBhdGggZmlsbD0iIzY2NiIgZD0ibTQxNC4zOCA2OC4zMy0zNy4wMi0zNy4wMiA5LTkgMzcuMDIgMzcuMDJ6bTY2LjMyIDY2LjMyLTM3LTM3LjAyIDktOSAzNy4wMSAzNy4wMnptLTQ0LjMtODguOTJMMzk5LjY2IDkuMDFsOS05IDM2LjcyIDM2Ljczem02Ni42IDY2LjYyLTM2LjcyLTM2LjczIDktOUw1MTIgMTAzLjM1eiIvPjxwYXRoIGZpbGw9IiNjYzU4MmYiIGQ9Ik00MTQuMzcgNTkuMzJjNi45OS01LjgyIDE1LjQ0LTEzLjc0IDIyLjAxLTIyLjU4YTY3Ljc5IDY3Ljc5IDAgMCAwIDYuODUtMTEuMTJjMS40LTIuOSA1LjM0LTMuMzMgOC44NS0uODhhMjUwMC44OCAyNTAwLjg4IDAgMCAwIDE2Ljc5IDExLjU3IDMxLjQgMzEuNCAwIDAgMSA2Ljg0IDYuODRjMyA0LjM4IDcuMjcgMTAuNjIgMTEuNTcgMTYuNzggMi40NCAzLjUyIDIgNy40Ni0uOSA4Ljg1YTY4LjQxIDY4LjQxIDAgMCAwLTExLjEgNi44NGMtOC44NCA2LjU3LTE2Ljc1IDE1LjAzLTIyLjU4IDIyLjAzYTE4Ni4xIDE4Ni4xIDAgMCAwLTguNSAxMC45NyA3LjU0IDcuNTQgMCAwIDEtNC43NyAzbC03Ljg4IDEuNTlhMTMuMSAxMy4xIDAgMCAwLTQuMjUgMS42MkwzOTcuMTggODQuN2wtLjAxLS4wMWExMi45IDEyLjkgMCAwIDAgMS42My00LjIzbDEuNTgtNy45YTcuNTUgNy41NSAwIDAgMSAzLTQuNzYgMTg0IDE4NCAwIDAgMCAxMC45OS04LjV6Ii8+PGNpcmNsZSBjeD0iMTUxLjAzIiBjeT0iMzYwLjk5IiByPSIxOC4xOSIgZmlsbD0iIzRkNGQ0ZCIvPjwvZz48cGF0aCBmaWxsPSIjYzQ5MjcwIiBkPSJNMjczLjQ5IDIxNy4wMmgtMy43NGwuMDItNi43OWgzLjczeiIvPjxwYXRoIGZpbGw9IiM2NjYiIGQ9Ik0yNjYuMjggMTUxLjYxSDI1NS4zdi0zLjczaDEwLjk4em0tLjAxLTI1LjUzSDI1NS4zdi0zLjczaDEwLjk3em0uMDEgMTYuNzdIMjU1LjN2LTMuNzRoMTAuOTd6bTAtNi40OEgyNTUuM3YtMy43M2gxMC45OHptLS4wMS0yNS45MUgyNTUuM3YtMy43NGgxMC45N3ptMC0xMy4zNEgyNTUuM3YtMy43M2gxMC45N3ptMC01LjcySDI1NS4zdi0zLjczaDEwLjk3eiIvPjxwYXRoIGZpbGw9IiNmN2IyMzkiIGQ9Im0yNjIuNTQgMTU4LjAzIDkuOTItOC40NyA4LjQ3IDguNDdhMjQuOTYgMjQuOTYgMCAwIDAgOS4zNiAxOS40OGM0LjU1IDMuNjUgNy4zNiA4LjYzIDcuMzYgMTQuMTIgMCAxMS4xNy0xMS42IDIwLjIzLTI1LjkxIDIwLjIzcy0yNS45MS05LjA2LTI1LjkyLTIwLjIzYzAtNS41IDIuOC0xMC40NyA3LjM2LTE0LjEyYTI0Ljk2IDI0Ljk2IDAgMCAwIDkuMzYtMTkuNDh6bTE4LjM5LTc3LjZ2Ny45NmgtMTQuOTF2LTcuOTZ6Ii8+PHBhdGggZmlsbD0iI2M0OTI3MCIgZD0iTTI4MC45MyAxNTguMDNoLTE4LjM5Vjg2LjExbDE4LjM5LjMzeiIvPjxwYXRoIGZpbGw9IiM2NjYiIGQ9Ik0yODEuOTggMjAwLjM5aC0yMC41di0zLjc0aDIwLjV6bTAtOS4xNWgtMjAuNXYtMy43M2gyMC41em0wLTYuNDdoLTIwLjV2LTMuNzRoMjAuNXoiLz48cGF0aCBmaWxsPSIjZmY5ODExIiBkPSJNMTk3LjYgMTAuMDZoMTUuMDV2OS4wM0gxOTcuNnoiLz48cGF0aCBmaWxsPSIjYmY3MjBkIiBkPSJNMjA1LjEyIDEyOC45N2g5LjAzVjEzOGgtOS4wM3ptMC0xMjYuNDRoOS4wM1Y3Ny44aC05LjAzeiIvPjxwYXRoIGZpbGw9IiNmZjk4MTEiIGQ9Ik0yMDkuNjQgMTMwLjQ3Yy0xNS43NyAwLTI4LjYtMTIuODMtMjguNi0yOC42czEyLjgzLTI4LjYgMjguNi0yOC42IDI4LjYgMTIuODMgMjguNiAyOC42LTEyLjgzIDI4LjYtMjguNiAyOC42eiIvPjxwYXRoIGZpbGw9IiNiZjcyMGQiIGQ9Ik0yMDkuNjQgNzMuMjdjMTUuNzcgMCAyOC42IDEyLjgzIDI4LjYgMjguNnMtMTIuODMgMjguNi0yOC42IDI4LjYiLz48cGF0aCBmaWxsPSIjZmZmMGI0IiBkPSJNMjA5LjY0IDExOC40M2MtOS4xMyAwLTE2LjU2LTcuNDMtMTYuNTYtMTYuNTZzNy40My0xNi41NiAxNi41Ni0xNi41NmExNi41NyAxNi41NyAwIDAgMSAwIDMzLjEyeiIvPjxwYXRoIGZpbGw9IiNmZmRhNDQiIGQ9Ik0yMDkuNjQgODUuMzJhMTYuNTYgMTYuNTYgMCAwIDEgMCAzMy4xMSIvPjxwYXRoIGZpbGw9IiM1MDQxMmUiIGQ9Ik0yMDUuMTIgOTcuMzZoOS4wM3Y5LjAzaC05LjAzeiIvPjxwYXRoIGZpbGw9IiNmZjk4MTEiIGQ9Im0xMjMuNjYgNTMuMDctMi44Mi00Ljk0LTIuODIgNC45NGMtLjczIDEuMjctMTcuNzcgMzEuMjgtMTcuNzcgNDcuMTMgMCAxNS4wOSAxOC42NSAyMi4yNiAxOS40NSAyMi41NWwxLjE0LjQzIDEuMTQtLjQzYTQyLjMgNDIuMyAwIDAgMCA5LjQ4LTUuMzJjNi41Mi00Ljg5IDkuOTctMTAuODUgOS45Ny0xNy4yMyAwLTE1Ljg1LTE3LjA0LTQ1Ljg2LTE3Ljc3LTQ3LjEzeiIvPjxwYXRoIGZpbGw9IiNiZjcyMGQiIGQ9Im0xMjAuODQgMTIzLjE4IDEuMTQtLjQzYTQyLjMgNDIuMyAwIDAgMCA5LjQ4LTUuMzJjNi41Mi00Ljg5IDkuOTctMTAuODUgOS45Ny0xNy4yMyAwLTE1Ljg1LTE3LjA0LTQ1Ljg2LTE3Ljc3LTQ3LjEzbC0yLjgyLTQuOTQiLz48ZyBmaWxsPSIjNTA0MTJlIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg3Mi4wNyAyNi41KSBzY2FsZSguMTkwNSkiPjxwYXRoIGQ9Ik0yOTAuMTMgNjguMjdDMjkwLjEzIDQ5LjQyIDI1NiAwIDI1NiAwcy0zNC4xMyA0OS40Mi0zNC4xMyA2OC4yN2EzNC4xMSAzNC4xMSAwIDAgMCAxNy4wNiAyOS41NXYyNTQuOWgzNC4xNFY5Ny44MWEzNC4xMSAzNC4xMSAwIDAgMCAxNy4wNi0yOS41NXoiLz48Y2lyY2xlIGN4PSIyMjcuNTYiIGN5PSIzOTIuNTMiIHI9IjE3LjA3Ii8+PGNpcmNsZSBjeD0iMjg0LjQ0IiBjeT0iMzkyLjUzIiByPSIxNy4wNyIvPjxwYXRoIGQ9Ik0yMzguOTMgNDMyLjM2aDM0LjE0VjUxMmgtMzQuMTR6Ii8+PC9nPjwvc3ZnPjx0ZXh0IHg9IjE3MCIgeT0iMzAwIiBjbGFzcz0iYmFzZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UGluZSBCYXJpdG9uZSBMdXRlIG9mIEJyaWxsaWFuY2U8L3RleHQ+PHRleHQgeD0iMTcwIiB5PSIzMjUiIGNsYXNzPSJiYXNlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5Ud2VsdmUgU3RyaW5nczwvdGV4dD48dGV4dCB4PSIxNzAiIHk9IjM1MCIgY2xhc3M9ImJhc2UiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkVpZ2h0IEZyZXRzPC90ZXh0Pjx0ZXh0IHg9IjE3MCIgeT0iMzc1IiBjbGFzcz0iYmFzZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SGFyZHdvb2QgSW5sYXk8L3RleHQ+PC9zdmc+",
        attributes: [
          { trait_type: "Type", value: "Lute" },
          { trait_type: "Range", value: "Baritone" },
          { trait_type: "Material", value: "Pine" },
          { trait_type: "Major Modifier", value: "Twelve Strings" },
          { trait_type: "Minor Modifier", value: "Eight Frets" },
          { trait_type: "Decoration", value: "Hardwood Inlay" },
          { trait_type: "Order", value: "Brilliance" },
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
