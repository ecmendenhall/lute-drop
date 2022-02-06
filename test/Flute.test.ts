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
          '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 400">',
          "<style>.base { fill: rgb(153 27 27); font-family: Luminari, serif; font-size: 16px; }</style>",
          '<rect width="100%" height="100%" fill="rgb(253 240 221)" />',
          '<svg x="25" y="10"><path fill="#ff9811" d="M164.4 202.98c-19.89-7.32-45.63-16.06-55.33-16.06-7.82 0-15.2 2.56-20.77 7.2-5.75 4.8-8.91 11.22-8.91 18.08 0 5.81 2.36 11.48 6.64 15.96a30.53 30.53 0 0 0 14.3 8.21l5.38 14.45c1.25 3.92 4.28 6.45 7.75 6.45 3.47 0 6.51-2.53 7.76-6.46l6.18-16.97c11.93-3.4 26.6-8.58 37-12.42 3.9-1.44 6.43-5.05 6.43-9.22s-2.52-7.78-6.43-9.22z"/><path fill="#bf720d" d="M164.4 202.98c-11.83-4.36-25.73-9.21-37.1-12.43v43.54l.1-.25c11.93-3.4 26.6-8.58 37-12.42 3.9-1.43 6.43-5.05 6.43-9.22s-2.52-7.78-6.43-9.22z"/><g fill="#50412e" transform="translate(79.39 176.38) scale(.1786)"><circle cx="86.17" cy="200.61" r="18.46"/><circle cx="196.95" cy="194.45" r="18.46"/><circle cx="258.5" cy="219.07" r="18.46"/><circle cx="307.74" cy="182.15" r="18.46"/><circle cx="369.28" cy="194.45" r="18.46"/><circle cx="135.4" cy="151.37" r="18.46"/><circle cx="135.4" cy="249.85" r="18.46"/></g><path fill="#ea348b" d="M123.74 111.31a10.4 10.4 0 0 1-10.39-10.39V96.3h6.93v4.62a3.47 3.47 0 0 0 6.93 0h6.93a10.4 10.4 0 0 1-10.4 10.4Z"/><path fill="#b02768" d="M127.2 100.92a3.47 3.47 0 0 1-6.92 0V96.3h-3.46v12.36a10.4 10.4 0 0 0 17.32-7.74h-6.93z"/><path fill="#ccf8f3" d="M128.36 97.46V26.69l-3.3-16.98h-16.49l-3.3 16.98v70.77z"/><path fill="#00d7df" d="M125.06 9.71h-8.24v87.75h11.54V26.69z"/><path fill="#50412e" d="M113.35 35.11h6.93v6.93h-6.93z"/><path fill="#f7b239" d="M92.1 123.17h77.81v12.9h-77.8zm51.88 60.42H131v-4.52h-12.97v-4.51h-12.97v-4.52H92.1v-28.72h77.81v51.32h-12.97v-4.52h-12.96z"/><path fill="#4d4d4d" d="M101.8 123.17h3.27v46.87h-3.27zm12.97 0h3.27v51.39h-3.27zm12.97 0H131v55.9h-3.27zm12.96 0h3.27v60.42h-3.27zm12.97 0h3.27v64.95h-3.27zm12.97 0h3.27v69.47h-3.27z" opacity=".26"/><path fill="#3a88d6" d="M87.66 145.58v-11.85h86.7v11.85H92.1z"/><path fill="#4d4d4d" d="M167.86 145.58v-11.85h6.5v11.85h-6.17z" opacity=".25"/><path fill="#f95428" d="m240.12 170.3.32.47-2.6 19.05h-7.78l-2.6-19.05.31-.47a5.98 5.98 0 0 0 2.3.47h7.74a5.88 5.88 0 0 0 2.3-.47z"/><path fill="#f7b239" d="M256.61 27.42h-45.33a6.34 6.34 0 0 0-6.34 6.34v.38c0 3.2 2.37 5.84 5.45 6.27v.06s13.77 10.88 13.77 26.83v100.65a5.92 5.92 0 0 0 3.61 5.45 5.98 5.98 0 0 0 2.3.47h7.74a5.87 5.87 0 0 0 2.3-.47c2.13-.9 3.62-3 3.62-5.45V67.3c0-15.96 13.78-26.83 13.78-26.83l-.01-.06a6.32 6.32 0 0 0 5.44-6.27v-.38c0-3.5-2.83-6.34-6.33-6.34z"/><path fill="#4d4d4d" d="M256.61 27.42h-23.14c3.5 0 6.33 2.84 6.33 6.34v.38c0 3.2-2.36 5.84-5.44 6.27a5.81 5.81 0 0 1-.9.06h6.28s-4.47 10.88-4.47 26.83v100.65a5.93 5.93 0 0 1-5.52 5.9l.33.02h7.73a5.87 5.87 0 0 0 2.3-.47c2.13-.9 3.62-3 3.62-5.45V67.29c0-15.95 13.78-26.82 13.78-26.82l-.01-.06a6.32 6.32 0 0 0 5.44-6.27v-.38c0-3.5-2.83-6.34-6.33-6.34z" opacity=".25"/><path fill="#4d4d4d" d="M234.95 80.81a2.64 2.64 0 0 0-3.33 3.68c1.16 2.2 4.54 1.6 4.93-.83a2.66 2.66 0 0 0-1.6-2.85zm0 67.42a2.72 2.72 0 0 0-1-.2c-2.3.03-3.5 2.86-1.87 4.5 1.57 1.59 4.36.51 4.5-1.7a2.67 2.67 0 0 0-1.63-2.6zm0-16.85a2.64 2.64 0 1 0-.75 5.06 2.66 2.66 0 0 0 2.34-2.17 2.66 2.66 0 0 0-1.59-2.9zm0-16.86c-1-.4-2.17-.17-2.92.62-.8.83-.95 2.12-.38 3.12 1.2 2.11 4.45 1.54 4.89-.84a2.66 2.66 0 0 0-1.59-2.9zm-1.52-17a2.66 2.66 0 0 0-2.13 2.58c0 1.02.61 1.97 1.53 2.4a2.7 2.7 0 0 0 3.03-.58c.76-.8.94-2.04.43-3.02a2.65 2.65 0 0 0-2.86-1.38c-.17.03.17-.04 0 0z"/><path fill="#bc8b4b" d="M276.18 235.21c0 2.4-1.95 4.34-4.5 4.5h-11.07c-2.4 0-4.34-1.95-4.49-4.5V76.27c0-2.4 1.95-4.34 4.5-4.5h11.07c2.4 0 4.34 1.95 4.49 4.5z"/><path fill="#ce9959" d="M256.12 76.27V235.2c0 2.4 1.95 4.34 4.5 4.5h3.88c2.4 0 4.34-1.95 4.5-4.5V76.27c0-2.4-1.95-4.34-4.5-4.5h-3.89a4.6 4.6 0 0 0-4.49 4.5z"/><g fill="#7a5427" transform="rotate(-45 275.42 -133.2) scale(.26458)"><circle cx="112.8" cy="356.8" r="8.8"/><circle cx="153.6" cy="316" r="8.8"/><circle cx="194.4" cy="275.2" r="8.8"/><path d="M244 234.4c0 4.8-4 8.8-8.8 8.8-4.8 0-8.8-4-8.8-8.8 0-4.8 4-8.8 8.8-8.8 4.8-.8 8.8 3.2 8.8 8.8z"/><circle cx="276" cy="192.8" r="8.8"/><circle cx="316.8" cy="152" r="8.8"/><circle cx="358.4" cy="111.2" r="8.8"/><circle cx="399.2" cy="70.4" r="8.8"/></g><path fill="#a8773d" d="M276.18 215.46h-20.06v19.75c0 2.4 1.95 4.34 4.5 4.5h11.07c2.4 0 4.34-1.95 4.49-4.5z"/><path fill="#bc8b4b" d="M256.12 215.46v19.75c0 2.4 1.95 4.34 4.5 4.5h3.88c2.4 0 4.34-1.95 4.5-4.5v-19.75Z"/><path fill="#593a1c" d="M271.09 239.7v-14.06c0-2.4-1.95-4.34-4.5-4.5l-1.04-.14c-2.4 0-4.34 1.94-4.49 4.49v14.06Z"/><path fill="#382210" d="M266.75 221h-1.2c-2.4 0-4.34 1.94-4.49 4.49v14.06h3.3c2.39 0 4.33-1.94 4.48-4.49V221.6c-.6-.3-1.34-.44-2.1-.6z"/><path fill="#4d4d4d" d="M77.02 200.6H61.21v-10.21l7.97-8.35 7.84 8.35z"/><path fill="#f7b239" d="M79.32 27.13v163.26H58.9v-20.5l.42.01c4.82 0 8.73-3.9 8.73-8.73H58.9V27.13Z"/><path fill="#4d4d4d" d="M72.06 190.39h7.26V27.13h-7.26z" opacity=".25"/><path fill="#4d4d4d" d="M64.23 63.61a2.57 2.57 0 0 0 1.16 2.81 2.55 2.55 0 0 0 3.53-3.44c-1.12-1.98-4.14-1.54-4.7.63zm-.07 24.71a2.56 2.56 0 0 0 4.34 2.07c.9-.9.98-2.37.2-3.37-1.37-1.79-4.3-.92-4.54 1.3zm.02-12.28a2.56 2.56 0 0 0 1.37 2.65c.97.48 2.18.3 2.95-.47.87-.87.99-2.28.28-3.28-1.3-1.84-4.27-1.13-4.6 1.1zm1.9-38.63a2.58 2.58 0 0 0-1.93 2.35c-.12 2.28 2.74 3.54 4.35 1.93.84-.84.98-2.18.35-3.17a2.57 2.57 0 0 0-2.77-1.11zm-1.9 62.95a2.58 2.58 0 0 0 1.37 2.68 2.55 2.55 0 0 0 3.34-3.59c-1.2-2.01-4.34-1.38-4.71.91zm-.03-48.4c-.09 2.27 2.75 3.5 4.35 1.9.87-.87.99-2.27.28-3.27-1.36-1.95-4.54-1.02-4.63 1.37zm0 72.97c-.17 2.3 2.72 3.62 4.35 1.99.89-.89.99-2.32.25-3.32-1.37-1.87-4.42-.97-4.6 1.33zm.02-12.36a2.57 2.57 0 0 0 1.55 2.72c.94.4 2.06.17 2.78-.55.84-.83.98-2.17.35-3.16-1.24-1.98-4.34-1.29-4.68.99z"/><path fill="#f99c38" d="M190.7 256h16.04a3.65 3.65 0 0 0 3.65-3.65V90.51a3.65 3.65 0 0 0-3.65-3.65H190.7a3.65 3.65 0 0 0-3.64 3.65v15.4a6.2 6.2 0 0 1 0 12.38v13.22a6.2 6.2 0 1 1 0 12.38v13.22a6.2 6.2 0 1 1 0 12.38v13.22a6.2 6.2 0 1 1 0 12.39v57.25a3.65 3.65 0 0 0 3.64 3.65z"/><path fill="#d17519" d="M212.2 211.02a3.16 3.16 0 0 1-2.24.93h-22.47a3.18 3.18 0 0 1 0-6.35h22.47a3.18 3.18 0 0 1 3.17 3.17 3.17 3.17 0 0 1-.93 2.25zm0-112.87a3.16 3.16 0 0 1-2.24.93h-22.47a3.18 3.18 0 0 1 0-6.35h22.47a3.18 3.18 0 0 1 3.17 3.18 3.17 3.17 0 0 1-.93 2.24zm0 122.4a3.16 3.16 0 0 1-2.24.92h-22.47a3.18 3.18 0 0 1 0-6.35h22.47a3.18 3.18 0 0 1 3.17 3.18 3.17 3.17 0 0 1-.93 2.24zm0 28.25a3.16 3.16 0 0 1-2.24.93h-22.47a3.18 3.18 0 0 1 0-6.35h22.47a3.18 3.18 0 0 1 3.17 3.17 3.17 3.17 0 0 1-.93 2.25z"/><path fill="#f9e17a" d="m200.01 226.65-1.29 1.29-1.29-1.3a3.18 3.18 0 0 0-4.49 4.5l1.3 1.29-1.3 1.29a3.18 3.18 0 0 0 4.5 4.49l1.28-1.3 1.3 1.3a3.18 3.18 0 0 0 4.48-4.5l-1.29-1.28 1.3-1.3a3.18 3.18 0 0 0-4.5-4.48z"/><g transform="rotate(-45 116.22 -96.96) scale(.26458)"><path fill="#8fa6b4" d="m256.74 7.96 32.3 32.3L42.07 287.22l-32.3-32.3z"/><path fill="#5d7486" d="M281 32.22 34.03 279.2l8.04 8.04L289.04 40.26l-32.3-32.3z"/><path fill="#34495e" d="m285.13 44.17-32.3-32.3 9.76-9.76a7.2 7.2 0 0 1 10.18 0l22.12 22.12a7.2 7.2 0 0 1 0 10.18z"/><path fill="#34495e" d="M294.89 24.23 272.77 2.11a7.2 7.2 0 0 0-7.2-1.8l18.32 18.34a7.2 7.2 0 0 1 0 10.18l-7.05 7.05 8.3 8.3 9.75-9.77a7.2 7.2 0 0 0 0-10.18z" opacity=".3"/><path fill="#34495e" d="M32.3 297A32.3 32.3 0 0 1 0 264.7l14.85-14.85 32.3 32.3L32.3 297z"/><path fill="#34495e" d="m39.6 274.6-12.63 12.63A32.24 32.24 0 0 1 1.7 275.04 32.31 32.31 0 0 0 32.3 297l14.85-14.85a53767.39 53767.39 0 0 0-7.55-7.55z" opacity=".3"/><path fill="#34495e" d="m75.42 189.28 14.85-14.85 24.48 24.48-14.85 14.85z"/><path fill="#293c4c" d="m114.75 198.91 7.82 7.82-14.85 14.85-7.81-7.82z"/><circle cx="243.19" cy="53.81" r="10.5" fill="#2b2b2b"/><circle cx="214.4" cy="82.6" r="10.5" fill="#2b2b2b"/><circle cx="185.62" cy="111.38" r="10.5" fill="#2b2b2b"/><circle cx="156.83" cy="140.17" r="10.5" fill="#2b2b2b"/><path fill="#2b2b2b" d="m40.33 249.53 7.14 7.14a5.45 5.45 0 0 0 7.7 0l8.7-8.7a5.45 5.45 0 0 0 0-7.71l-7.13-7.14a5.45 5.45 0 0 0-7.71 0l-8.7 8.7a5.45 5.45 0 0 0 0 7.71z"/></g><path fill="#a36300" d="M39.99 250.88H28.55a2.31 2.31 0 0 1-2.31-2.31v-21.94a2.31 2.31 0 0 1 2.3-2.31H40a2.31 2.31 0 0 1 2.3 2.3v21.95a2.31 2.31 0 0 1-2.3 2.3z"/><path fill="#c57300" d="M44.07 77.1h-19.6a3.17 3.17 0 0 0-3.18 3.17v119.75h13.13c0 7.25-5.88 13.12-13.13 13.12v12.94a3.17 3.17 0 0 0 3.18 3.18h19.6a3.17 3.17 0 0 0 3.17-3.18V80.27a3.17 3.17 0 0 0-3.17-3.18z"/><path fill="#a36300" d="M44.07 77.1h-9.65v152.16h9.65a3.17 3.17 0 0 0 3.17-3.18V80.27a3.17 3.17 0 0 0-3.17-3.18z"/><g fill="#5e3c16" transform="rotate(-45 164.51 155.15) scale(.26458)"><circle cx="428.52" cy="84.31" r="17.51"/><circle cx="375.07" cy="137.75" r="17.51"/><circle cx="321.62" cy="191.2" r="17.51"/><circle cx="268.17" cy="244.65" r="17.51"/><circle cx="214.73" cy="298.11" r="17.51"/></g><path fill="#844d00" d="M42.3 235.28H26.24v-6.02H42.3z"/></svg>',
          '<text x="170" y="300" class="base" text-anchor="middle">Wood Soprano Flute of Brilliance</text>',
          '<text x="170" y="325" class="base" text-anchor="middle">Reed</text>',
          '<text x="170" y="350" class="base" text-anchor="middle">Three Holes</text>',
          '<text x="170" y="375" class="base" text-anchor="middle">Pearl Inlay</text>',
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

    it("returns JSON as string", async function () {
      expect(await contracts.flute.tokenJSON(0)).to.equal(
        JSON.stringify({
          name: "Flute #0",
          description:
            "I hear that you and your bard have sold your lutes and bought flutes.",
          image:
            "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaW5ZTWluIG1lZXQiIHZpZXdCb3g9IjAgMCAzNTAgNDAwIj48c3R5bGU+LmJhc2UgeyBmaWxsOiByZ2IoMTUzIDI3IDI3KTsgZm9udC1mYW1pbHk6IEx1bWluYXJpLCBzZXJpZjsgZm9udC1zaXplOiAxNnB4OyB9PC9zdHlsZT48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJyZ2IoMjUzIDI0MCAyMjEpIiAvPjxzdmcgeD0iMjUiIHk9IjEwIj48cGF0aCBmaWxsPSIjZmY5ODExIiBkPSJNMTY0LjQgMjAyLjk4Yy0xOS44OS03LjMyLTQ1LjYzLTE2LjA2LTU1LjMzLTE2LjA2LTcuODIgMC0xNS4yIDIuNTYtMjAuNzcgNy4yLTUuNzUgNC44LTguOTEgMTEuMjItOC45MSAxOC4wOCAwIDUuODEgMi4zNiAxMS40OCA2LjY0IDE1Ljk2YTMwLjUzIDMwLjUzIDAgMCAwIDE0LjMgOC4yMWw1LjM4IDE0LjQ1YzEuMjUgMy45MiA0LjI4IDYuNDUgNy43NSA2LjQ1IDMuNDcgMCA2LjUxLTIuNTMgNy43Ni02LjQ2bDYuMTgtMTYuOTdjMTEuOTMtMy40IDI2LjYtOC41OCAzNy0xMi40MiAzLjktMS40NCA2LjQzLTUuMDUgNi40My05LjIycy0yLjUyLTcuNzgtNi40My05LjIyeiIvPjxwYXRoIGZpbGw9IiNiZjcyMGQiIGQ9Ik0xNjQuNCAyMDIuOThjLTExLjgzLTQuMzYtMjUuNzMtOS4yMS0zNy4xLTEyLjQzdjQzLjU0bC4xLS4yNWMxMS45My0zLjQgMjYuNi04LjU4IDM3LTEyLjQyIDMuOS0xLjQzIDYuNDMtNS4wNSA2LjQzLTkuMjJzLTIuNTItNy43OC02LjQzLTkuMjJ6Ii8+PGcgZmlsbD0iIzUwNDEyZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNzkuMzkgMTc2LjM4KSBzY2FsZSguMTc4NikiPjxjaXJjbGUgY3g9Ijg2LjE3IiBjeT0iMjAwLjYxIiByPSIxOC40NiIvPjxjaXJjbGUgY3g9IjE5Ni45NSIgY3k9IjE5NC40NSIgcj0iMTguNDYiLz48Y2lyY2xlIGN4PSIyNTguNSIgY3k9IjIxOS4wNyIgcj0iMTguNDYiLz48Y2lyY2xlIGN4PSIzMDcuNzQiIGN5PSIxODIuMTUiIHI9IjE4LjQ2Ii8+PGNpcmNsZSBjeD0iMzY5LjI4IiBjeT0iMTk0LjQ1IiByPSIxOC40NiIvPjxjaXJjbGUgY3g9IjEzNS40IiBjeT0iMTUxLjM3IiByPSIxOC40NiIvPjxjaXJjbGUgY3g9IjEzNS40IiBjeT0iMjQ5Ljg1IiByPSIxOC40NiIvPjwvZz48cGF0aCBmaWxsPSIjZWEzNDhiIiBkPSJNMTIzLjc0IDExMS4zMWExMC40IDEwLjQgMCAwIDEtMTAuMzktMTAuMzlWOTYuM2g2LjkzdjQuNjJhMy40NyAzLjQ3IDAgMCAwIDYuOTMgMGg2LjkzYTEwLjQgMTAuNCAwIDAgMS0xMC40IDEwLjRaIi8+PHBhdGggZmlsbD0iI2IwMjc2OCIgZD0iTTEyNy4yIDEwMC45MmEzLjQ3IDMuNDcgMCAwIDEtNi45MiAwVjk2LjNoLTMuNDZ2MTIuMzZhMTAuNCAxMC40IDAgMCAwIDE3LjMyLTcuNzRoLTYuOTN6Ii8+PHBhdGggZmlsbD0iI2NjZjhmMyIgZD0iTTEyOC4zNiA5Ny40NlYyNi42OWwtMy4zLTE2Ljk4aC0xNi40OWwtMy4zIDE2Ljk4djcwLjc3eiIvPjxwYXRoIGZpbGw9IiMwMGQ3ZGYiIGQ9Ik0xMjUuMDYgOS43MWgtOC4yNHY4Ny43NWgxMS41NFYyNi42OXoiLz48cGF0aCBmaWxsPSIjNTA0MTJlIiBkPSJNMTEzLjM1IDM1LjExaDYuOTN2Ni45M2gtNi45M3oiLz48cGF0aCBmaWxsPSIjZjdiMjM5IiBkPSJNOTIuMSAxMjMuMTdoNzcuODF2MTIuOWgtNzcuOHptNTEuODggNjAuNDJIMTMxdi00LjUyaC0xMi45N3YtNC41MWgtMTIuOTd2LTQuNTJIOTIuMXYtMjguNzJoNzcuODF2NTEuMzJoLTEyLjk3di00LjUyaC0xMi45NnoiLz48cGF0aCBmaWxsPSIjNGQ0ZDRkIiBkPSJNMTAxLjggMTIzLjE3aDMuMjd2NDYuODdoLTMuMjd6bTEyLjk3IDBoMy4yN3Y1MS4zOWgtMy4yN3ptMTIuOTcgMEgxMzF2NTUuOWgtMy4yN3ptMTIuOTYgMGgzLjI3djYwLjQyaC0zLjI3em0xMi45NyAwaDMuMjd2NjQuOTVoLTMuMjd6bTEyLjk3IDBoMy4yN3Y2OS40N2gtMy4yN3oiIG9wYWNpdHk9Ii4yNiIvPjxwYXRoIGZpbGw9IiMzYTg4ZDYiIGQ9Ik04Ny42NiAxNDUuNTh2LTExLjg1aDg2Ljd2MTEuODVIOTIuMXoiLz48cGF0aCBmaWxsPSIjNGQ0ZDRkIiBkPSJNMTY3Ljg2IDE0NS41OHYtMTEuODVoNi41djExLjg1aC02LjE3eiIgb3BhY2l0eT0iLjI1Ii8+PHBhdGggZmlsbD0iI2Y5NTQyOCIgZD0ibTI0MC4xMiAxNzAuMy4zMi40Ny0yLjYgMTkuMDVoLTcuNzhsLTIuNi0xOS4wNS4zMS0uNDdhNS45OCA1Ljk4IDAgMCAwIDIuMy40N2g3Ljc0YTUuODggNS44OCAwIDAgMCAyLjMtLjQ3eiIvPjxwYXRoIGZpbGw9IiNmN2IyMzkiIGQ9Ik0yNTYuNjEgMjcuNDJoLTQ1LjMzYTYuMzQgNi4zNCAwIDAgMC02LjM0IDYuMzR2LjM4YzAgMy4yIDIuMzcgNS44NCA1LjQ1IDYuMjd2LjA2czEzLjc3IDEwLjg4IDEzLjc3IDI2LjgzdjEwMC42NWE1LjkyIDUuOTIgMCAwIDAgMy42MSA1LjQ1IDUuOTggNS45OCAwIDAgMCAyLjMuNDdoNy43NGE1Ljg3IDUuODcgMCAwIDAgMi4zLS40N2MyLjEzLS45IDMuNjItMyAzLjYyLTUuNDVWNjcuM2MwLTE1Ljk2IDEzLjc4LTI2LjgzIDEzLjc4LTI2LjgzbC0uMDEtLjA2YTYuMzIgNi4zMiAwIDAgMCA1LjQ0LTYuMjd2LS4zOGMwLTMuNS0yLjgzLTYuMzQtNi4zMy02LjM0eiIvPjxwYXRoIGZpbGw9IiM0ZDRkNGQiIGQ9Ik0yNTYuNjEgMjcuNDJoLTIzLjE0YzMuNSAwIDYuMzMgMi44NCA2LjMzIDYuMzR2LjM4YzAgMy4yLTIuMzYgNS44NC01LjQ0IDYuMjdhNS44MSA1LjgxIDAgMCAxLS45LjA2aDYuMjhzLTQuNDcgMTAuODgtNC40NyAyNi44M3YxMDAuNjVhNS45MyA1LjkzIDAgMCAxLTUuNTIgNS45bC4zMy4wMmg3LjczYTUuODcgNS44NyAwIDAgMCAyLjMtLjQ3YzIuMTMtLjkgMy42Mi0zIDMuNjItNS40NVY2Ny4yOWMwLTE1Ljk1IDEzLjc4LTI2LjgyIDEzLjc4LTI2LjgybC0uMDEtLjA2YTYuMzIgNi4zMiAwIDAgMCA1LjQ0LTYuMjd2LS4zOGMwLTMuNS0yLjgzLTYuMzQtNi4zMy02LjM0eiIgb3BhY2l0eT0iLjI1Ii8+PHBhdGggZmlsbD0iIzRkNGQ0ZCIgZD0iTTIzNC45NSA4MC44MWEyLjY0IDIuNjQgMCAwIDAtMy4zMyAzLjY4YzEuMTYgMi4yIDQuNTQgMS42IDQuOTMtLjgzYTIuNjYgMi42NiAwIDAgMC0xLjYtMi44NXptMCA2Ny40MmEyLjcyIDIuNzIgMCAwIDAtMS0uMmMtMi4zLjAzLTMuNSAyLjg2LTEuODcgNC41IDEuNTcgMS41OSA0LjM2LjUxIDQuNS0xLjdhMi42NyAyLjY3IDAgMCAwLTEuNjMtMi42em0wLTE2Ljg1YTIuNjQgMi42NCAwIDEgMC0uNzUgNS4wNiAyLjY2IDIuNjYgMCAwIDAgMi4zNC0yLjE3IDIuNjYgMi42NiAwIDAgMC0xLjU5LTIuOXptMC0xNi44NmMtMS0uNC0yLjE3LS4xNy0yLjkyLjYyLS44LjgzLS45NSAyLjEyLS4zOCAzLjEyIDEuMiAyLjExIDQuNDUgMS41NCA0Ljg5LS44NGEyLjY2IDIuNjYgMCAwIDAtMS41OS0yLjl6bS0xLjUyLTE3YTIuNjYgMi42NiAwIDAgMC0yLjEzIDIuNThjMCAxLjAyLjYxIDEuOTcgMS41MyAyLjRhMi43IDIuNyAwIDAgMCAzLjAzLS41OGMuNzYtLjguOTQtMi4wNC40My0zLjAyYTIuNjUgMi42NSAwIDAgMC0yLjg2LTEuMzhjLS4xNy4wMy4xNy0uMDQgMCAweiIvPjxwYXRoIGZpbGw9IiNiYzhiNGIiIGQ9Ik0yNzYuMTggMjM1LjIxYzAgMi40LTEuOTUgNC4zNC00LjUgNC41aC0xMS4wN2MtMi40IDAtNC4zNC0xLjk1LTQuNDktNC41Vjc2LjI3YzAtMi40IDEuOTUtNC4zNCA0LjUtNC41aDExLjA3YzIuNCAwIDQuMzQgMS45NSA0LjQ5IDQuNXoiLz48cGF0aCBmaWxsPSIjY2U5OTU5IiBkPSJNMjU2LjEyIDc2LjI3VjIzNS4yYzAgMi40IDEuOTUgNC4zNCA0LjUgNC41aDMuODhjMi40IDAgNC4zNC0xLjk1IDQuNS00LjVWNzYuMjdjMC0yLjQtMS45NS00LjM0LTQuNS00LjVoLTMuODlhNC42IDQuNiAwIDAgMC00LjQ5IDQuNXoiLz48ZyBmaWxsPSIjN2E1NDI3IiB0cmFuc2Zvcm09InJvdGF0ZSgtNDUgMjc1LjQyIC0xMzMuMikgc2NhbGUoLjI2NDU4KSI+PGNpcmNsZSBjeD0iMTEyLjgiIGN5PSIzNTYuOCIgcj0iOC44Ii8+PGNpcmNsZSBjeD0iMTUzLjYiIGN5PSIzMTYiIHI9IjguOCIvPjxjaXJjbGUgY3g9IjE5NC40IiBjeT0iMjc1LjIiIHI9IjguOCIvPjxwYXRoIGQ9Ik0yNDQgMjM0LjRjMCA0LjgtNCA4LjgtOC44IDguOC00LjggMC04LjgtNC04LjgtOC44IDAtNC44IDQtOC44IDguOC04LjggNC44LS44IDguOCAzLjIgOC44IDguOHoiLz48Y2lyY2xlIGN4PSIyNzYiIGN5PSIxOTIuOCIgcj0iOC44Ii8+PGNpcmNsZSBjeD0iMzE2LjgiIGN5PSIxNTIiIHI9IjguOCIvPjxjaXJjbGUgY3g9IjM1OC40IiBjeT0iMTExLjIiIHI9IjguOCIvPjxjaXJjbGUgY3g9IjM5OS4yIiBjeT0iNzAuNCIgcj0iOC44Ii8+PC9nPjxwYXRoIGZpbGw9IiNhODc3M2QiIGQ9Ik0yNzYuMTggMjE1LjQ2aC0yMC4wNnYxOS43NWMwIDIuNCAxLjk1IDQuMzQgNC41IDQuNWgxMS4wN2MyLjQgMCA0LjM0LTEuOTUgNC40OS00LjV6Ii8+PHBhdGggZmlsbD0iI2JjOGI0YiIgZD0iTTI1Ni4xMiAyMTUuNDZ2MTkuNzVjMCAyLjQgMS45NSA0LjM0IDQuNSA0LjVoMy44OGMyLjQgMCA0LjM0LTEuOTUgNC41LTQuNXYtMTkuNzVaIi8+PHBhdGggZmlsbD0iIzU5M2ExYyIgZD0iTTI3MS4wOSAyMzkuN3YtMTQuMDZjMC0yLjQtMS45NS00LjM0LTQuNS00LjVsLTEuMDQtLjE0Yy0yLjQgMC00LjM0IDEuOTQtNC40OSA0LjQ5djE0LjA2WiIvPjxwYXRoIGZpbGw9IiMzODIyMTAiIGQ9Ik0yNjYuNzUgMjIxaC0xLjJjLTIuNCAwLTQuMzQgMS45NC00LjQ5IDQuNDl2MTQuMDZoMy4zYzIuMzkgMCA0LjMzLTEuOTQgNC40OC00LjQ5VjIyMS42Yy0uNi0uMy0xLjM0LS40NC0yLjEtLjZ6Ii8+PHBhdGggZmlsbD0iIzRkNGQ0ZCIgZD0iTTc3LjAyIDIwMC42SDYxLjIxdi0xMC4yMWw3Ljk3LTguMzUgNy44NCA4LjM1eiIvPjxwYXRoIGZpbGw9IiNmN2IyMzkiIGQ9Ik03OS4zMiAyNy4xM3YxNjMuMjZINTguOXYtMjAuNWwuNDIuMDFjNC44MiAwIDguNzMtMy45IDguNzMtOC43M0g1OC45VjI3LjEzWiIvPjxwYXRoIGZpbGw9IiM0ZDRkNGQiIGQ9Ik03Mi4wNiAxOTAuMzloNy4yNlYyNy4xM2gtNy4yNnoiIG9wYWNpdHk9Ii4yNSIvPjxwYXRoIGZpbGw9IiM0ZDRkNGQiIGQ9Ik02NC4yMyA2My42MWEyLjU3IDIuNTcgMCAwIDAgMS4xNiAyLjgxIDIuNTUgMi41NSAwIDAgMCAzLjUzLTMuNDRjLTEuMTItMS45OC00LjE0LTEuNTQtNC43LjYzem0tLjA3IDI0LjcxYTIuNTYgMi41NiAwIDAgMCA0LjM0IDIuMDdjLjktLjkuOTgtMi4zNy4yLTMuMzctMS4zNy0xLjc5LTQuMy0uOTItNC41NCAxLjN6bS4wMi0xMi4yOGEyLjU2IDIuNTYgMCAwIDAgMS4zNyAyLjY1Yy45Ny40OCAyLjE4LjMgMi45NS0uNDcuODctLjg3Ljk5LTIuMjguMjgtMy4yOC0xLjMtMS44NC00LjI3LTEuMTMtNC42IDEuMXptMS45LTM4LjYzYTIuNTggMi41OCAwIDAgMC0xLjkzIDIuMzVjLS4xMiAyLjI4IDIuNzQgMy41NCA0LjM1IDEuOTMuODQtLjg0Ljk4LTIuMTguMzUtMy4xN2EyLjU3IDIuNTcgMCAwIDAtMi43Ny0xLjExem0tMS45IDYyLjk1YTIuNTggMi41OCAwIDAgMCAxLjM3IDIuNjggMi41NSAyLjU1IDAgMCAwIDMuMzQtMy41OWMtMS4yLTIuMDEtNC4zNC0xLjM4LTQuNzEuOTF6bS0uMDMtNDguNGMtLjA5IDIuMjcgMi43NSAzLjUgNC4zNSAxLjkuODctLjg3Ljk5LTIuMjcuMjgtMy4yNy0xLjM2LTEuOTUtNC41NC0xLjAyLTQuNjMgMS4zN3ptMCA3Mi45N2MtLjE3IDIuMyAyLjcyIDMuNjIgNC4zNSAxLjk5Ljg5LS44OS45OS0yLjMyLjI1LTMuMzItMS4zNy0xLjg3LTQuNDItLjk3LTQuNiAxLjMzem0uMDItMTIuMzZhMi41NyAyLjU3IDAgMCAwIDEuNTUgMi43MmMuOTQuNCAyLjA2LjE3IDIuNzgtLjU1Ljg0LS44My45OC0yLjE3LjM1LTMuMTYtMS4yNC0xLjk4LTQuMzQtMS4yOS00LjY4Ljk5eiIvPjxwYXRoIGZpbGw9IiNmOTljMzgiIGQ9Ik0xOTAuNyAyNTZoMTYuMDRhMy42NSAzLjY1IDAgMCAwIDMuNjUtMy42NVY5MC41MWEzLjY1IDMuNjUgMCAwIDAtMy42NS0zLjY1SDE5MC43YTMuNjUgMy42NSAwIDAgMC0zLjY0IDMuNjV2MTUuNGE2LjIgNi4yIDAgMCAxIDAgMTIuMzh2MTMuMjJhNi4yIDYuMiAwIDEgMSAwIDEyLjM4djEzLjIyYTYuMiA2LjIgMCAxIDEgMCAxMi4zOHYxMy4yMmE2LjIgNi4yIDAgMSAxIDAgMTIuMzl2NTcuMjVhMy42NSAzLjY1IDAgMCAwIDMuNjQgMy42NXoiLz48cGF0aCBmaWxsPSIjZDE3NTE5IiBkPSJNMjEyLjIgMjExLjAyYTMuMTYgMy4xNiAwIDAgMS0yLjI0LjkzaC0yMi40N2EzLjE4IDMuMTggMCAwIDEgMC02LjM1aDIyLjQ3YTMuMTggMy4xOCAwIDAgMSAzLjE3IDMuMTcgMy4xNyAzLjE3IDAgMCAxLS45MyAyLjI1em0wLTExMi44N2EzLjE2IDMuMTYgMCAwIDEtMi4yNC45M2gtMjIuNDdhMy4xOCAzLjE4IDAgMCAxIDAtNi4zNWgyMi40N2EzLjE4IDMuMTggMCAwIDEgMy4xNyAzLjE4IDMuMTcgMy4xNyAwIDAgMS0uOTMgMi4yNHptMCAxMjIuNGEzLjE2IDMuMTYgMCAwIDEtMi4yNC45MmgtMjIuNDdhMy4xOCAzLjE4IDAgMCAxIDAtNi4zNWgyMi40N2EzLjE4IDMuMTggMCAwIDEgMy4xNyAzLjE4IDMuMTcgMy4xNyAwIDAgMS0uOTMgMi4yNHptMCAyOC4yNWEzLjE2IDMuMTYgMCAwIDEtMi4yNC45M2gtMjIuNDdhMy4xOCAzLjE4IDAgMCAxIDAtNi4zNWgyMi40N2EzLjE4IDMuMTggMCAwIDEgMy4xNyAzLjE3IDMuMTcgMy4xNyAwIDAgMS0uOTMgMi4yNXoiLz48cGF0aCBmaWxsPSIjZjllMTdhIiBkPSJtMjAwLjAxIDIyNi42NS0xLjI5IDEuMjktMS4yOS0xLjNhMy4xOCAzLjE4IDAgMCAwLTQuNDkgNC41bDEuMyAxLjI5LTEuMyAxLjI5YTMuMTggMy4xOCAwIDAgMCA0LjUgNC40OWwxLjI4LTEuMyAxLjMgMS4zYTMuMTggMy4xOCAwIDAgMCA0LjQ4LTQuNWwtMS4yOS0xLjI4IDEuMy0xLjNhMy4xOCAzLjE4IDAgMCAwLTQuNS00LjQ4eiIvPjxnIHRyYW5zZm9ybT0icm90YXRlKC00NSAxMTYuMjIgLTk2Ljk2KSBzY2FsZSguMjY0NTgpIj48cGF0aCBmaWxsPSIjOGZhNmI0IiBkPSJtMjU2Ljc0IDcuOTYgMzIuMyAzMi4zTDQyLjA3IDI4Ny4yMmwtMzIuMy0zMi4zeiIvPjxwYXRoIGZpbGw9IiM1ZDc0ODYiIGQ9Ik0yODEgMzIuMjIgMzQuMDMgMjc5LjJsOC4wNCA4LjA0TDI4OS4wNCA0MC4yNmwtMzIuMy0zMi4zeiIvPjxwYXRoIGZpbGw9IiMzNDQ5NWUiIGQ9Im0yODUuMTMgNDQuMTctMzIuMy0zMi4zIDkuNzYtOS43NmE3LjIgNy4yIDAgMCAxIDEwLjE4IDBsMjIuMTIgMjIuMTJhNy4yIDcuMiAwIDAgMSAwIDEwLjE4eiIvPjxwYXRoIGZpbGw9IiMzNDQ5NWUiIGQ9Ik0yOTQuODkgMjQuMjMgMjcyLjc3IDIuMTFhNy4yIDcuMiAwIDAgMC03LjItMS44bDE4LjMyIDE4LjM0YTcuMiA3LjIgMCAwIDEgMCAxMC4xOGwtNy4wNSA3LjA1IDguMyA4LjMgOS43NS05Ljc3YTcuMiA3LjIgMCAwIDAgMC0xMC4xOHoiIG9wYWNpdHk9Ii4zIi8+PHBhdGggZmlsbD0iIzM0NDk1ZSIgZD0iTTMyLjMgMjk3QTMyLjMgMzIuMyAwIDAgMSAwIDI2NC43bDE0Ljg1LTE0Ljg1IDMyLjMgMzIuM0wzMi4zIDI5N3oiLz48cGF0aCBmaWxsPSIjMzQ0OTVlIiBkPSJtMzkuNiAyNzQuNi0xMi42MyAxMi42M0EzMi4yNCAzMi4yNCAwIDAgMSAxLjcgMjc1LjA0IDMyLjMxIDMyLjMxIDAgMCAwIDMyLjMgMjk3bDE0Ljg1LTE0Ljg1YTUzNzY3LjM5IDUzNzY3LjM5IDAgMCAwLTcuNTUtNy41NXoiIG9wYWNpdHk9Ii4zIi8+PHBhdGggZmlsbD0iIzM0NDk1ZSIgZD0ibTc1LjQyIDE4OS4yOCAxNC44NS0xNC44NSAyNC40OCAyNC40OC0xNC44NSAxNC44NXoiLz48cGF0aCBmaWxsPSIjMjkzYzRjIiBkPSJtMTE0Ljc1IDE5OC45MSA3LjgyIDcuODItMTQuODUgMTQuODUtNy44MS03LjgyeiIvPjxjaXJjbGUgY3g9IjI0My4xOSIgY3k9IjUzLjgxIiByPSIxMC41IiBmaWxsPSIjMmIyYjJiIi8+PGNpcmNsZSBjeD0iMjE0LjQiIGN5PSI4Mi42IiByPSIxMC41IiBmaWxsPSIjMmIyYjJiIi8+PGNpcmNsZSBjeD0iMTg1LjYyIiBjeT0iMTExLjM4IiByPSIxMC41IiBmaWxsPSIjMmIyYjJiIi8+PGNpcmNsZSBjeD0iMTU2LjgzIiBjeT0iMTQwLjE3IiByPSIxMC41IiBmaWxsPSIjMmIyYjJiIi8+PHBhdGggZmlsbD0iIzJiMmIyYiIgZD0ibTQwLjMzIDI0OS41MyA3LjE0IDcuMTRhNS40NSA1LjQ1IDAgMCAwIDcuNyAwbDguNy04LjdhNS40NSA1LjQ1IDAgMCAwIDAtNy43MWwtNy4xMy03LjE0YTUuNDUgNS40NSAwIDAgMC03LjcxIDBsLTguNyA4LjdhNS40NSA1LjQ1IDAgMCAwIDAgNy43MXoiLz48L2c+PHBhdGggZmlsbD0iI2EzNjMwMCIgZD0iTTM5Ljk5IDI1MC44OEgyOC41NWEyLjMxIDIuMzEgMCAwIDEtMi4zMS0yLjMxdi0yMS45NGEyLjMxIDIuMzEgMCAwIDEgMi4zLTIuMzFINDBhMi4zMSAyLjMxIDAgMCAxIDIuMyAyLjN2MjEuOTVhMi4zMSAyLjMxIDAgMCAxLTIuMyAyLjN6Ii8+PHBhdGggZmlsbD0iI2M1NzMwMCIgZD0iTTQ0LjA3IDc3LjFoLTE5LjZhMy4xNyAzLjE3IDAgMCAwLTMuMTggMy4xN3YxMTkuNzVoMTMuMTNjMCA3LjI1LTUuODggMTMuMTItMTMuMTMgMTMuMTJ2MTIuOTRhMy4xNyAzLjE3IDAgMCAwIDMuMTggMy4xOGgxOS42YTMuMTcgMy4xNyAwIDAgMCAzLjE3LTMuMThWODAuMjdhMy4xNyAzLjE3IDAgMCAwLTMuMTctMy4xOHoiLz48cGF0aCBmaWxsPSIjYTM2MzAwIiBkPSJNNDQuMDcgNzcuMWgtOS42NXYxNTIuMTZoOS42NWEzLjE3IDMuMTcgMCAwIDAgMy4xNy0zLjE4VjgwLjI3YTMuMTcgMy4xNyAwIDAgMC0zLjE3LTMuMTh6Ii8+PGcgZmlsbD0iIzVlM2MxNiIgdHJhbnNmb3JtPSJyb3RhdGUoLTQ1IDE2NC41MSAxNTUuMTUpIHNjYWxlKC4yNjQ1OCkiPjxjaXJjbGUgY3g9IjQyOC41MiIgY3k9Ijg0LjMxIiByPSIxNy41MSIvPjxjaXJjbGUgY3g9IjM3NS4wNyIgY3k9IjEzNy43NSIgcj0iMTcuNTEiLz48Y2lyY2xlIGN4PSIzMjEuNjIiIGN5PSIxOTEuMiIgcj0iMTcuNTEiLz48Y2lyY2xlIGN4PSIyNjguMTciIGN5PSIyNDQuNjUiIHI9IjE3LjUxIi8+PGNpcmNsZSBjeD0iMjE0LjczIiBjeT0iMjk4LjExIiByPSIxNy41MSIvPjwvZz48cGF0aCBmaWxsPSIjODQ0ZDAwIiBkPSJNNDIuMyAyMzUuMjhIMjYuMjR2LTYuMDJINDIuM3oiLz48L3N2Zz48dGV4dCB4PSIxNzAiIHk9IjMwMCIgY2xhc3M9ImJhc2UiIHRleHQtYW5jaG9yPSJtaWRkbGUiPldvb2QgU29wcmFubyBGbHV0ZSBvZiBCcmlsbGlhbmNlPC90ZXh0Pjx0ZXh0IHg9IjE3MCIgeT0iMzI1IiBjbGFzcz0iYmFzZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UmVlZDwvdGV4dD48dGV4dCB4PSIxNzAiIHk9IjM1MCIgY2xhc3M9ImJhc2UiIHRleHQtYW5jaG9yPSJtaWRkbGUiPlRocmVlIEhvbGVzPC90ZXh0Pjx0ZXh0IHg9IjE3MCIgeT0iMzc1IiBjbGFzcz0iYmFzZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UGVhcmwgSW5sYXk8L3RleHQ+PC9zdmc+",
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

  describe("token URI", () => {
    it("generates base64 JSON data", async function () {
      const json = JSON.stringify({
        name: "Flute #0",
        description:
          "I hear that you and your bard have sold your lutes and bought flutes.",
        image:
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaW5ZTWluIG1lZXQiIHZpZXdCb3g9IjAgMCAzNTAgNDAwIj48c3R5bGU+LmJhc2UgeyBmaWxsOiByZ2IoMTUzIDI3IDI3KTsgZm9udC1mYW1pbHk6IEx1bWluYXJpLCBzZXJpZjsgZm9udC1zaXplOiAxNnB4OyB9PC9zdHlsZT48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJyZ2IoMjUzIDI0MCAyMjEpIiAvPjxzdmcgeD0iMjUiIHk9IjEwIj48cGF0aCBmaWxsPSIjZmY5ODExIiBkPSJNMTY0LjQgMjAyLjk4Yy0xOS44OS03LjMyLTQ1LjYzLTE2LjA2LTU1LjMzLTE2LjA2LTcuODIgMC0xNS4yIDIuNTYtMjAuNzcgNy4yLTUuNzUgNC44LTguOTEgMTEuMjItOC45MSAxOC4wOCAwIDUuODEgMi4zNiAxMS40OCA2LjY0IDE1Ljk2YTMwLjUzIDMwLjUzIDAgMCAwIDE0LjMgOC4yMWw1LjM4IDE0LjQ1YzEuMjUgMy45MiA0LjI4IDYuNDUgNy43NSA2LjQ1IDMuNDcgMCA2LjUxLTIuNTMgNy43Ni02LjQ2bDYuMTgtMTYuOTdjMTEuOTMtMy40IDI2LjYtOC41OCAzNy0xMi40MiAzLjktMS40NCA2LjQzLTUuMDUgNi40My05LjIycy0yLjUyLTcuNzgtNi40My05LjIyeiIvPjxwYXRoIGZpbGw9IiNiZjcyMGQiIGQ9Ik0xNjQuNCAyMDIuOThjLTExLjgzLTQuMzYtMjUuNzMtOS4yMS0zNy4xLTEyLjQzdjQzLjU0bC4xLS4yNWMxMS45My0zLjQgMjYuNi04LjU4IDM3LTEyLjQyIDMuOS0xLjQzIDYuNDMtNS4wNSA2LjQzLTkuMjJzLTIuNTItNy43OC02LjQzLTkuMjJ6Ii8+PGcgZmlsbD0iIzUwNDEyZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNzkuMzkgMTc2LjM4KSBzY2FsZSguMTc4NikiPjxjaXJjbGUgY3g9Ijg2LjE3IiBjeT0iMjAwLjYxIiByPSIxOC40NiIvPjxjaXJjbGUgY3g9IjE5Ni45NSIgY3k9IjE5NC40NSIgcj0iMTguNDYiLz48Y2lyY2xlIGN4PSIyNTguNSIgY3k9IjIxOS4wNyIgcj0iMTguNDYiLz48Y2lyY2xlIGN4PSIzMDcuNzQiIGN5PSIxODIuMTUiIHI9IjE4LjQ2Ii8+PGNpcmNsZSBjeD0iMzY5LjI4IiBjeT0iMTk0LjQ1IiByPSIxOC40NiIvPjxjaXJjbGUgY3g9IjEzNS40IiBjeT0iMTUxLjM3IiByPSIxOC40NiIvPjxjaXJjbGUgY3g9IjEzNS40IiBjeT0iMjQ5Ljg1IiByPSIxOC40NiIvPjwvZz48cGF0aCBmaWxsPSIjZWEzNDhiIiBkPSJNMTIzLjc0IDExMS4zMWExMC40IDEwLjQgMCAwIDEtMTAuMzktMTAuMzlWOTYuM2g2LjkzdjQuNjJhMy40NyAzLjQ3IDAgMCAwIDYuOTMgMGg2LjkzYTEwLjQgMTAuNCAwIDAgMS0xMC40IDEwLjRaIi8+PHBhdGggZmlsbD0iI2IwMjc2OCIgZD0iTTEyNy4yIDEwMC45MmEzLjQ3IDMuNDcgMCAwIDEtNi45MiAwVjk2LjNoLTMuNDZ2MTIuMzZhMTAuNCAxMC40IDAgMCAwIDE3LjMyLTcuNzRoLTYuOTN6Ii8+PHBhdGggZmlsbD0iI2NjZjhmMyIgZD0iTTEyOC4zNiA5Ny40NlYyNi42OWwtMy4zLTE2Ljk4aC0xNi40OWwtMy4zIDE2Ljk4djcwLjc3eiIvPjxwYXRoIGZpbGw9IiMwMGQ3ZGYiIGQ9Ik0xMjUuMDYgOS43MWgtOC4yNHY4Ny43NWgxMS41NFYyNi42OXoiLz48cGF0aCBmaWxsPSIjNTA0MTJlIiBkPSJNMTEzLjM1IDM1LjExaDYuOTN2Ni45M2gtNi45M3oiLz48cGF0aCBmaWxsPSIjZjdiMjM5IiBkPSJNOTIuMSAxMjMuMTdoNzcuODF2MTIuOWgtNzcuOHptNTEuODggNjAuNDJIMTMxdi00LjUyaC0xMi45N3YtNC41MWgtMTIuOTd2LTQuNTJIOTIuMXYtMjguNzJoNzcuODF2NTEuMzJoLTEyLjk3di00LjUyaC0xMi45NnoiLz48cGF0aCBmaWxsPSIjNGQ0ZDRkIiBkPSJNMTAxLjggMTIzLjE3aDMuMjd2NDYuODdoLTMuMjd6bTEyLjk3IDBoMy4yN3Y1MS4zOWgtMy4yN3ptMTIuOTcgMEgxMzF2NTUuOWgtMy4yN3ptMTIuOTYgMGgzLjI3djYwLjQyaC0zLjI3em0xMi45NyAwaDMuMjd2NjQuOTVoLTMuMjd6bTEyLjk3IDBoMy4yN3Y2OS40N2gtMy4yN3oiIG9wYWNpdHk9Ii4yNiIvPjxwYXRoIGZpbGw9IiMzYTg4ZDYiIGQ9Ik04Ny42NiAxNDUuNTh2LTExLjg1aDg2Ljd2MTEuODVIOTIuMXoiLz48cGF0aCBmaWxsPSIjNGQ0ZDRkIiBkPSJNMTY3Ljg2IDE0NS41OHYtMTEuODVoNi41djExLjg1aC02LjE3eiIgb3BhY2l0eT0iLjI1Ii8+PHBhdGggZmlsbD0iI2Y5NTQyOCIgZD0ibTI0MC4xMiAxNzAuMy4zMi40Ny0yLjYgMTkuMDVoLTcuNzhsLTIuNi0xOS4wNS4zMS0uNDdhNS45OCA1Ljk4IDAgMCAwIDIuMy40N2g3Ljc0YTUuODggNS44OCAwIDAgMCAyLjMtLjQ3eiIvPjxwYXRoIGZpbGw9IiNmN2IyMzkiIGQ9Ik0yNTYuNjEgMjcuNDJoLTQ1LjMzYTYuMzQgNi4zNCAwIDAgMC02LjM0IDYuMzR2LjM4YzAgMy4yIDIuMzcgNS44NCA1LjQ1IDYuMjd2LjA2czEzLjc3IDEwLjg4IDEzLjc3IDI2LjgzdjEwMC42NWE1LjkyIDUuOTIgMCAwIDAgMy42MSA1LjQ1IDUuOTggNS45OCAwIDAgMCAyLjMuNDdoNy43NGE1Ljg3IDUuODcgMCAwIDAgMi4zLS40N2MyLjEzLS45IDMuNjItMyAzLjYyLTUuNDVWNjcuM2MwLTE1Ljk2IDEzLjc4LTI2LjgzIDEzLjc4LTI2LjgzbC0uMDEtLjA2YTYuMzIgNi4zMiAwIDAgMCA1LjQ0LTYuMjd2LS4zOGMwLTMuNS0yLjgzLTYuMzQtNi4zMy02LjM0eiIvPjxwYXRoIGZpbGw9IiM0ZDRkNGQiIGQ9Ik0yNTYuNjEgMjcuNDJoLTIzLjE0YzMuNSAwIDYuMzMgMi44NCA2LjMzIDYuMzR2LjM4YzAgMy4yLTIuMzYgNS44NC01LjQ0IDYuMjdhNS44MSA1LjgxIDAgMCAxLS45LjA2aDYuMjhzLTQuNDcgMTAuODgtNC40NyAyNi44M3YxMDAuNjVhNS45MyA1LjkzIDAgMCAxLTUuNTIgNS45bC4zMy4wMmg3LjczYTUuODcgNS44NyAwIDAgMCAyLjMtLjQ3YzIuMTMtLjkgMy42Mi0zIDMuNjItNS40NVY2Ny4yOWMwLTE1Ljk1IDEzLjc4LTI2LjgyIDEzLjc4LTI2LjgybC0uMDEtLjA2YTYuMzIgNi4zMiAwIDAgMCA1LjQ0LTYuMjd2LS4zOGMwLTMuNS0yLjgzLTYuMzQtNi4zMy02LjM0eiIgb3BhY2l0eT0iLjI1Ii8+PHBhdGggZmlsbD0iIzRkNGQ0ZCIgZD0iTTIzNC45NSA4MC44MWEyLjY0IDIuNjQgMCAwIDAtMy4zMyAzLjY4YzEuMTYgMi4yIDQuNTQgMS42IDQuOTMtLjgzYTIuNjYgMi42NiAwIDAgMC0xLjYtMi44NXptMCA2Ny40MmEyLjcyIDIuNzIgMCAwIDAtMS0uMmMtMi4zLjAzLTMuNSAyLjg2LTEuODcgNC41IDEuNTcgMS41OSA0LjM2LjUxIDQuNS0xLjdhMi42NyAyLjY3IDAgMCAwLTEuNjMtMi42em0wLTE2Ljg1YTIuNjQgMi42NCAwIDEgMC0uNzUgNS4wNiAyLjY2IDIuNjYgMCAwIDAgMi4zNC0yLjE3IDIuNjYgMi42NiAwIDAgMC0xLjU5LTIuOXptMC0xNi44NmMtMS0uNC0yLjE3LS4xNy0yLjkyLjYyLS44LjgzLS45NSAyLjEyLS4zOCAzLjEyIDEuMiAyLjExIDQuNDUgMS41NCA0Ljg5LS44NGEyLjY2IDIuNjYgMCAwIDAtMS41OS0yLjl6bS0xLjUyLTE3YTIuNjYgMi42NiAwIDAgMC0yLjEzIDIuNThjMCAxLjAyLjYxIDEuOTcgMS41MyAyLjRhMi43IDIuNyAwIDAgMCAzLjAzLS41OGMuNzYtLjguOTQtMi4wNC40My0zLjAyYTIuNjUgMi42NSAwIDAgMC0yLjg2LTEuMzhjLS4xNy4wMy4xNy0uMDQgMCAweiIvPjxwYXRoIGZpbGw9IiNiYzhiNGIiIGQ9Ik0yNzYuMTggMjM1LjIxYzAgMi40LTEuOTUgNC4zNC00LjUgNC41aC0xMS4wN2MtMi40IDAtNC4zNC0xLjk1LTQuNDktNC41Vjc2LjI3YzAtMi40IDEuOTUtNC4zNCA0LjUtNC41aDExLjA3YzIuNCAwIDQuMzQgMS45NSA0LjQ5IDQuNXoiLz48cGF0aCBmaWxsPSIjY2U5OTU5IiBkPSJNMjU2LjEyIDc2LjI3VjIzNS4yYzAgMi40IDEuOTUgNC4zNCA0LjUgNC41aDMuODhjMi40IDAgNC4zNC0xLjk1IDQuNS00LjVWNzYuMjdjMC0yLjQtMS45NS00LjM0LTQuNS00LjVoLTMuODlhNC42IDQuNiAwIDAgMC00LjQ5IDQuNXoiLz48ZyBmaWxsPSIjN2E1NDI3IiB0cmFuc2Zvcm09InJvdGF0ZSgtNDUgMjc1LjQyIC0xMzMuMikgc2NhbGUoLjI2NDU4KSI+PGNpcmNsZSBjeD0iMTEyLjgiIGN5PSIzNTYuOCIgcj0iOC44Ii8+PGNpcmNsZSBjeD0iMTUzLjYiIGN5PSIzMTYiIHI9IjguOCIvPjxjaXJjbGUgY3g9IjE5NC40IiBjeT0iMjc1LjIiIHI9IjguOCIvPjxwYXRoIGQ9Ik0yNDQgMjM0LjRjMCA0LjgtNCA4LjgtOC44IDguOC00LjggMC04LjgtNC04LjgtOC44IDAtNC44IDQtOC44IDguOC04LjggNC44LS44IDguOCAzLjIgOC44IDguOHoiLz48Y2lyY2xlIGN4PSIyNzYiIGN5PSIxOTIuOCIgcj0iOC44Ii8+PGNpcmNsZSBjeD0iMzE2LjgiIGN5PSIxNTIiIHI9IjguOCIvPjxjaXJjbGUgY3g9IjM1OC40IiBjeT0iMTExLjIiIHI9IjguOCIvPjxjaXJjbGUgY3g9IjM5OS4yIiBjeT0iNzAuNCIgcj0iOC44Ii8+PC9nPjxwYXRoIGZpbGw9IiNhODc3M2QiIGQ9Ik0yNzYuMTggMjE1LjQ2aC0yMC4wNnYxOS43NWMwIDIuNCAxLjk1IDQuMzQgNC41IDQuNWgxMS4wN2MyLjQgMCA0LjM0LTEuOTUgNC40OS00LjV6Ii8+PHBhdGggZmlsbD0iI2JjOGI0YiIgZD0iTTI1Ni4xMiAyMTUuNDZ2MTkuNzVjMCAyLjQgMS45NSA0LjM0IDQuNSA0LjVoMy44OGMyLjQgMCA0LjM0LTEuOTUgNC41LTQuNXYtMTkuNzVaIi8+PHBhdGggZmlsbD0iIzU5M2ExYyIgZD0iTTI3MS4wOSAyMzkuN3YtMTQuMDZjMC0yLjQtMS45NS00LjM0LTQuNS00LjVsLTEuMDQtLjE0Yy0yLjQgMC00LjM0IDEuOTQtNC40OSA0LjQ5djE0LjA2WiIvPjxwYXRoIGZpbGw9IiMzODIyMTAiIGQ9Ik0yNjYuNzUgMjIxaC0xLjJjLTIuNCAwLTQuMzQgMS45NC00LjQ5IDQuNDl2MTQuMDZoMy4zYzIuMzkgMCA0LjMzLTEuOTQgNC40OC00LjQ5VjIyMS42Yy0uNi0uMy0xLjM0LS40NC0yLjEtLjZ6Ii8+PHBhdGggZmlsbD0iIzRkNGQ0ZCIgZD0iTTc3LjAyIDIwMC42SDYxLjIxdi0xMC4yMWw3Ljk3LTguMzUgNy44NCA4LjM1eiIvPjxwYXRoIGZpbGw9IiNmN2IyMzkiIGQ9Ik03OS4zMiAyNy4xM3YxNjMuMjZINTguOXYtMjAuNWwuNDIuMDFjNC44MiAwIDguNzMtMy45IDguNzMtOC43M0g1OC45VjI3LjEzWiIvPjxwYXRoIGZpbGw9IiM0ZDRkNGQiIGQ9Ik03Mi4wNiAxOTAuMzloNy4yNlYyNy4xM2gtNy4yNnoiIG9wYWNpdHk9Ii4yNSIvPjxwYXRoIGZpbGw9IiM0ZDRkNGQiIGQ9Ik02NC4yMyA2My42MWEyLjU3IDIuNTcgMCAwIDAgMS4xNiAyLjgxIDIuNTUgMi41NSAwIDAgMCAzLjUzLTMuNDRjLTEuMTItMS45OC00LjE0LTEuNTQtNC43LjYzem0tLjA3IDI0LjcxYTIuNTYgMi41NiAwIDAgMCA0LjM0IDIuMDdjLjktLjkuOTgtMi4zNy4yLTMuMzctMS4zNy0xLjc5LTQuMy0uOTItNC41NCAxLjN6bS4wMi0xMi4yOGEyLjU2IDIuNTYgMCAwIDAgMS4zNyAyLjY1Yy45Ny40OCAyLjE4LjMgMi45NS0uNDcuODctLjg3Ljk5LTIuMjguMjgtMy4yOC0xLjMtMS44NC00LjI3LTEuMTMtNC42IDEuMXptMS45LTM4LjYzYTIuNTggMi41OCAwIDAgMC0xLjkzIDIuMzVjLS4xMiAyLjI4IDIuNzQgMy41NCA0LjM1IDEuOTMuODQtLjg0Ljk4LTIuMTguMzUtMy4xN2EyLjU3IDIuNTcgMCAwIDAtMi43Ny0xLjExem0tMS45IDYyLjk1YTIuNTggMi41OCAwIDAgMCAxLjM3IDIuNjggMi41NSAyLjU1IDAgMCAwIDMuMzQtMy41OWMtMS4yLTIuMDEtNC4zNC0xLjM4LTQuNzEuOTF6bS0uMDMtNDguNGMtLjA5IDIuMjcgMi43NSAzLjUgNC4zNSAxLjkuODctLjg3Ljk5LTIuMjcuMjgtMy4yNy0xLjM2LTEuOTUtNC41NC0xLjAyLTQuNjMgMS4zN3ptMCA3Mi45N2MtLjE3IDIuMyAyLjcyIDMuNjIgNC4zNSAxLjk5Ljg5LS44OS45OS0yLjMyLjI1LTMuMzItMS4zNy0xLjg3LTQuNDItLjk3LTQuNiAxLjMzem0uMDItMTIuMzZhMi41NyAyLjU3IDAgMCAwIDEuNTUgMi43MmMuOTQuNCAyLjA2LjE3IDIuNzgtLjU1Ljg0LS44My45OC0yLjE3LjM1LTMuMTYtMS4yNC0xLjk4LTQuMzQtMS4yOS00LjY4Ljk5eiIvPjxwYXRoIGZpbGw9IiNmOTljMzgiIGQ9Ik0xOTAuNyAyNTZoMTYuMDRhMy42NSAzLjY1IDAgMCAwIDMuNjUtMy42NVY5MC41MWEzLjY1IDMuNjUgMCAwIDAtMy42NS0zLjY1SDE5MC43YTMuNjUgMy42NSAwIDAgMC0zLjY0IDMuNjV2MTUuNGE2LjIgNi4yIDAgMCAxIDAgMTIuMzh2MTMuMjJhNi4yIDYuMiAwIDEgMSAwIDEyLjM4djEzLjIyYTYuMiA2LjIgMCAxIDEgMCAxMi4zOHYxMy4yMmE2LjIgNi4yIDAgMSAxIDAgMTIuMzl2NTcuMjVhMy42NSAzLjY1IDAgMCAwIDMuNjQgMy42NXoiLz48cGF0aCBmaWxsPSIjZDE3NTE5IiBkPSJNMjEyLjIgMjExLjAyYTMuMTYgMy4xNiAwIDAgMS0yLjI0LjkzaC0yMi40N2EzLjE4IDMuMTggMCAwIDEgMC02LjM1aDIyLjQ3YTMuMTggMy4xOCAwIDAgMSAzLjE3IDMuMTcgMy4xNyAzLjE3IDAgMCAxLS45MyAyLjI1em0wLTExMi44N2EzLjE2IDMuMTYgMCAwIDEtMi4yNC45M2gtMjIuNDdhMy4xOCAzLjE4IDAgMCAxIDAtNi4zNWgyMi40N2EzLjE4IDMuMTggMCAwIDEgMy4xNyAzLjE4IDMuMTcgMy4xNyAwIDAgMS0uOTMgMi4yNHptMCAxMjIuNGEzLjE2IDMuMTYgMCAwIDEtMi4yNC45MmgtMjIuNDdhMy4xOCAzLjE4IDAgMCAxIDAtNi4zNWgyMi40N2EzLjE4IDMuMTggMCAwIDEgMy4xNyAzLjE4IDMuMTcgMy4xNyAwIDAgMS0uOTMgMi4yNHptMCAyOC4yNWEzLjE2IDMuMTYgMCAwIDEtMi4yNC45M2gtMjIuNDdhMy4xOCAzLjE4IDAgMCAxIDAtNi4zNWgyMi40N2EzLjE4IDMuMTggMCAwIDEgMy4xNyAzLjE3IDMuMTcgMy4xNyAwIDAgMS0uOTMgMi4yNXoiLz48cGF0aCBmaWxsPSIjZjllMTdhIiBkPSJtMjAwLjAxIDIyNi42NS0xLjI5IDEuMjktMS4yOS0xLjNhMy4xOCAzLjE4IDAgMCAwLTQuNDkgNC41bDEuMyAxLjI5LTEuMyAxLjI5YTMuMTggMy4xOCAwIDAgMCA0LjUgNC40OWwxLjI4LTEuMyAxLjMgMS4zYTMuMTggMy4xOCAwIDAgMCA0LjQ4LTQuNWwtMS4yOS0xLjI4IDEuMy0xLjNhMy4xOCAzLjE4IDAgMCAwLTQuNS00LjQ4eiIvPjxnIHRyYW5zZm9ybT0icm90YXRlKC00NSAxMTYuMjIgLTk2Ljk2KSBzY2FsZSguMjY0NTgpIj48cGF0aCBmaWxsPSIjOGZhNmI0IiBkPSJtMjU2Ljc0IDcuOTYgMzIuMyAzMi4zTDQyLjA3IDI4Ny4yMmwtMzIuMy0zMi4zeiIvPjxwYXRoIGZpbGw9IiM1ZDc0ODYiIGQ9Ik0yODEgMzIuMjIgMzQuMDMgMjc5LjJsOC4wNCA4LjA0TDI4OS4wNCA0MC4yNmwtMzIuMy0zMi4zeiIvPjxwYXRoIGZpbGw9IiMzNDQ5NWUiIGQ9Im0yODUuMTMgNDQuMTctMzIuMy0zMi4zIDkuNzYtOS43NmE3LjIgNy4yIDAgMCAxIDEwLjE4IDBsMjIuMTIgMjIuMTJhNy4yIDcuMiAwIDAgMSAwIDEwLjE4eiIvPjxwYXRoIGZpbGw9IiMzNDQ5NWUiIGQ9Ik0yOTQuODkgMjQuMjMgMjcyLjc3IDIuMTFhNy4yIDcuMiAwIDAgMC03LjItMS44bDE4LjMyIDE4LjM0YTcuMiA3LjIgMCAwIDEgMCAxMC4xOGwtNy4wNSA3LjA1IDguMyA4LjMgOS43NS05Ljc3YTcuMiA3LjIgMCAwIDAgMC0xMC4xOHoiIG9wYWNpdHk9Ii4zIi8+PHBhdGggZmlsbD0iIzM0NDk1ZSIgZD0iTTMyLjMgMjk3QTMyLjMgMzIuMyAwIDAgMSAwIDI2NC43bDE0Ljg1LTE0Ljg1IDMyLjMgMzIuM0wzMi4zIDI5N3oiLz48cGF0aCBmaWxsPSIjMzQ0OTVlIiBkPSJtMzkuNiAyNzQuNi0xMi42MyAxMi42M0EzMi4yNCAzMi4yNCAwIDAgMSAxLjcgMjc1LjA0IDMyLjMxIDMyLjMxIDAgMCAwIDMyLjMgMjk3bDE0Ljg1LTE0Ljg1YTUzNzY3LjM5IDUzNzY3LjM5IDAgMCAwLTcuNTUtNy41NXoiIG9wYWNpdHk9Ii4zIi8+PHBhdGggZmlsbD0iIzM0NDk1ZSIgZD0ibTc1LjQyIDE4OS4yOCAxNC44NS0xNC44NSAyNC40OCAyNC40OC0xNC44NSAxNC44NXoiLz48cGF0aCBmaWxsPSIjMjkzYzRjIiBkPSJtMTE0Ljc1IDE5OC45MSA3LjgyIDcuODItMTQuODUgMTQuODUtNy44MS03LjgyeiIvPjxjaXJjbGUgY3g9IjI0My4xOSIgY3k9IjUzLjgxIiByPSIxMC41IiBmaWxsPSIjMmIyYjJiIi8+PGNpcmNsZSBjeD0iMjE0LjQiIGN5PSI4Mi42IiByPSIxMC41IiBmaWxsPSIjMmIyYjJiIi8+PGNpcmNsZSBjeD0iMTg1LjYyIiBjeT0iMTExLjM4IiByPSIxMC41IiBmaWxsPSIjMmIyYjJiIi8+PGNpcmNsZSBjeD0iMTU2LjgzIiBjeT0iMTQwLjE3IiByPSIxMC41IiBmaWxsPSIjMmIyYjJiIi8+PHBhdGggZmlsbD0iIzJiMmIyYiIgZD0ibTQwLjMzIDI0OS41MyA3LjE0IDcuMTRhNS40NSA1LjQ1IDAgMCAwIDcuNyAwbDguNy04LjdhNS40NSA1LjQ1IDAgMCAwIDAtNy43MWwtNy4xMy03LjE0YTUuNDUgNS40NSAwIDAgMC03LjcxIDBsLTguNyA4LjdhNS40NSA1LjQ1IDAgMCAwIDAgNy43MXoiLz48L2c+PHBhdGggZmlsbD0iI2EzNjMwMCIgZD0iTTM5Ljk5IDI1MC44OEgyOC41NWEyLjMxIDIuMzEgMCAwIDEtMi4zMS0yLjMxdi0yMS45NGEyLjMxIDIuMzEgMCAwIDEgMi4zLTIuMzFINDBhMi4zMSAyLjMxIDAgMCAxIDIuMyAyLjN2MjEuOTVhMi4zMSAyLjMxIDAgMCAxLTIuMyAyLjN6Ii8+PHBhdGggZmlsbD0iI2M1NzMwMCIgZD0iTTQ0LjA3IDc3LjFoLTE5LjZhMy4xNyAzLjE3IDAgMCAwLTMuMTggMy4xN3YxMTkuNzVoMTMuMTNjMCA3LjI1LTUuODggMTMuMTItMTMuMTMgMTMuMTJ2MTIuOTRhMy4xNyAzLjE3IDAgMCAwIDMuMTggMy4xOGgxOS42YTMuMTcgMy4xNyAwIDAgMCAzLjE3LTMuMThWODAuMjdhMy4xNyAzLjE3IDAgMCAwLTMuMTctMy4xOHoiLz48cGF0aCBmaWxsPSIjYTM2MzAwIiBkPSJNNDQuMDcgNzcuMWgtOS42NXYxNTIuMTZoOS42NWEzLjE3IDMuMTcgMCAwIDAgMy4xNy0zLjE4VjgwLjI3YTMuMTcgMy4xNyAwIDAgMC0zLjE3LTMuMTh6Ii8+PGcgZmlsbD0iIzVlM2MxNiIgdHJhbnNmb3JtPSJyb3RhdGUoLTQ1IDE2NC41MSAxNTUuMTUpIHNjYWxlKC4yNjQ1OCkiPjxjaXJjbGUgY3g9IjQyOC41MiIgY3k9Ijg0LjMxIiByPSIxNy41MSIvPjxjaXJjbGUgY3g9IjM3NS4wNyIgY3k9IjEzNy43NSIgcj0iMTcuNTEiLz48Y2lyY2xlIGN4PSIzMjEuNjIiIGN5PSIxOTEuMiIgcj0iMTcuNTEiLz48Y2lyY2xlIGN4PSIyNjguMTciIGN5PSIyNDQuNjUiIHI9IjE3LjUxIi8+PGNpcmNsZSBjeD0iMjE0LjczIiBjeT0iMjk4LjExIiByPSIxNy41MSIvPjwvZz48cGF0aCBmaWxsPSIjODQ0ZDAwIiBkPSJNNDIuMyAyMzUuMjhIMjYuMjR2LTYuMDJINDIuM3oiLz48L3N2Zz48dGV4dCB4PSIxNzAiIHk9IjMwMCIgY2xhc3M9ImJhc2UiIHRleHQtYW5jaG9yPSJtaWRkbGUiPldvb2QgU29wcmFubyBGbHV0ZSBvZiBCcmlsbGlhbmNlPC90ZXh0Pjx0ZXh0IHg9IjE3MCIgeT0iMzI1IiBjbGFzcz0iYmFzZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UmVlZDwvdGV4dD48dGV4dCB4PSIxNzAiIHk9IjM1MCIgY2xhc3M9ImJhc2UiIHRleHQtYW5jaG9yPSJtaWRkbGUiPlRocmVlIEhvbGVzPC90ZXh0Pjx0ZXh0IHg9IjE3MCIgeT0iMzc1IiBjbGFzcz0iYmFzZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UGVhcmwgSW5sYXk8L3RleHQ+PC9zdmc+",
        attributes: [
          { trait_type: "Type", value: "Flute" },
          { trait_type: "Range", value: "Soprano" },
          { trait_type: "Material", value: "Wood" },
          { trait_type: "Major Modifier", value: "Reed" },
          { trait_type: "Minor Modifier", value: "Three Holes" },
          { trait_type: "Decoration", value: "Pearl Inlay" },
          { trait_type: "Order", value: "Brilliance" },
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
