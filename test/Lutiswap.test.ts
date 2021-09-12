import { BigNumber } from "@ethersproject/bignumber";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { parseEther } from "ethers/lib/utils";
import { ethers } from "hardhat";

import { Lutiswap, Lute, Flute } from "../typechain";

interface Contracts {
  lute: Lute;
  flute: Flute;
  lutiswap: Lutiswap;
}

async function deploy(): Promise<Contracts> {
  const ItemLibFactory = await ethers.getContractFactory("ItemLib");
  const itemlib = await (await ItemLibFactory.deploy()).deployed();

  const LuteFactory = await ethers.getContractFactory("Lute", {
    libraries: {
      ItemLib: itemlib.address,
    },
  });
  const lute = (await (await LuteFactory.deploy()).deployed()) as Lute;

  const FluteFactory = await ethers.getContractFactory("Flute", {
    libraries: {
      ItemLib: itemlib.address,
    },
  });
  const flute = (await (await FluteFactory.deploy()).deployed()) as Flute;

  const LutiswapFactory = await ethers.getContractFactory("Lutiswap");
  const lutiswap = (await (
    await LutiswapFactory.deploy(lute.address, flute.address)
  ).deployed()) as Lutiswap;
  return { lute, flute, lutiswap };
}

let contracts: Contracts;
let owner: SignerWithAddress,
  nonOwner: SignerWithAddress,
  fluteHolder: SignerWithAddress,
  luteHolder: SignerWithAddress,
  fluteWhale: SignerWithAddress,
  luteWhale: SignerWithAddress;

const CRAFTER_ROLE = ethers.utils.keccak256(
  ethers.utils.toUtf8Bytes("CRAFTER_ROLE")
);
const BURNER_ROLE = ethers.utils.keccak256(
  ethers.utils.toUtf8Bytes("BURNER_ROLE")
);

describe("Lutiswap", () => {
  beforeEach(async () => {
    contracts = await deploy();
    [owner, nonOwner, fluteHolder, luteHolder, fluteWhale, luteWhale] =
      await ethers.getSigners();

    await contracts.flute.connect(owner).grantRole(CRAFTER_ROLE, owner.address);
    await contracts.lute.connect(owner).grantRole(CRAFTER_ROLE, owner.address);

    await contracts.flute.connect(owner).craft(fluteHolder.address);
    await contracts.lute.connect(owner).craft(luteHolder.address);

    await contracts.flute.connect(owner).craft(fluteWhale.address);
    await contracts.flute.connect(owner).craft(fluteWhale.address);
    await contracts.flute.connect(owner).craft(fluteWhale.address);

    await contracts.lute.connect(owner).craft(luteWhale.address);
    await contracts.lute.connect(owner).craft(luteWhale.address);
    await contracts.lute.connect(owner).craft(luteWhale.address);

    await contracts.flute
      .connect(owner)
      .grantRole(CRAFTER_ROLE, contracts.lutiswap.address);
    await contracts.flute
      .connect(owner)
      .grantRole(BURNER_ROLE, contracts.lutiswap.address);

    await contracts.lute
      .connect(owner)
      .grantRole(CRAFTER_ROLE, contracts.lutiswap.address);
    await contracts.lute
      .connect(owner)
      .grantRole(BURNER_ROLE, contracts.lutiswap.address);
  });

  describe("configuration", () => {
    it("stores the Lute contract", async () => {
      expect(await contracts.lutiswap.lute()).to.equal(contracts.lute.address);
    });

    it("stores the Flute contract", async () => {
      expect(await contracts.lutiswap.flute()).to.equal(
        contracts.flute.address
      );
    });
  });

  describe("swaps", () => {
    describe("flutes", () => {
      it("burns the swapped flute", async () => {
        expect(await contracts.flute.balanceOf(fluteHolder.address)).to.equal(
          1
        );
        expect(await contracts.flute.ownerOf(0)).to.equal(fluteHolder.address);
        await contracts.lutiswap.connect(fluteHolder).swapExactFluteForLute(0, {
          value: parseEther("0.133333333333333333"),
        });
        expect(await contracts.flute.balanceOf(fluteHolder.address)).to.equal(
          0
        );
      });

      it("mints a lute", async () => {
        expect(await contracts.lute.balanceOf(fluteHolder.address)).to.equal(0);
        await contracts.lutiswap.connect(fluteHolder).swapExactFluteForLute(0, {
          value: parseEther("0.133333333333333333"),
        });
        expect(await contracts.lute.balanceOf(fluteHolder.address)).to.equal(1);
      });

      it("cannot burn unowned flutes", async () => {
        await expect(
          contracts.lutiswap.connect(fluteHolder).swapExactFluteForLute(1, {
            value: parseEther("0.133333333333333333"),
          })
        ).to.be.revertedWith("Must own item to swap");
      });

      it("reverts on insufficient payment", async () => {
        await expect(
          contracts.lutiswap
            .connect(fluteHolder)
            .swapExactFluteForLute(0, { value: parseEther("0.01") })
        ).to.be.revertedWith("Insufficient payment");
      });

      it("refunds excess payment", async () => {
        const initialETHbalance = await ethers.provider.getBalance(
          fluteHolder.address
        );
        const tx = await contracts.lutiswap
          .connect(fluteHolder)
          .swapExactFluteForLute(0, {
            value: parseEther("10.013333333333333333"),
          });
        const receipt = await tx.wait();
        const gasSpent = receipt.gasUsed.mul(tx.gasPrice || 0);
        const finalETHbalance = await ethers.provider.getBalance(
          fluteHolder.address
        );
        expect(initialETHbalance.sub(finalETHbalance)).to.equal(
          parseEther("0.013333333333333333").add(gasSpent)
        );
      });

      it("can swap all owned flutes", async () => {
        expect(await contracts.flute.balanceOf(fluteWhale.address)).to.equal(3);
        expect(await contracts.flute.ownerOf(1)).to.equal(fluteWhale.address);
        expect(await contracts.flute.ownerOf(2)).to.equal(fluteWhale.address);
        expect(await contracts.flute.ownerOf(3)).to.equal(fluteWhale.address);

        for (let id = 1; id <= 3; id++) {
          const [, swapCost] = await contracts.lutiswap.latestSwapPrice();
          await contracts.lutiswap
            .connect(fluteWhale)
            .swapExactFluteForLute(id, { value: swapCost });
        }
        expect(await contracts.flute.balanceOf(fluteWhale.address)).to.equal(0);
        expect(await contracts.lute.balanceOf(fluteWhale.address)).to.equal(3);
      });

      it("swap price increases as supply decreases", async () => {
        let [, swapPrice] = await contracts.lutiswap.latestSwapPrice();
        expect(swapPrice).to.equal(parseEther("0.013333333333333333"));
        await contracts.lutiswap
          .connect(fluteWhale)
          .swapExactFluteForLute(1, { value: swapPrice });

        [, swapPrice] = await contracts.lutiswap.latestSwapPrice();
        expect(swapPrice).to.equal(parseEther("0.025000000000000000"));
        await contracts.lutiswap
          .connect(fluteWhale)
          .swapExactFluteForLute(2, { value: swapPrice });

        [, swapPrice] = await contracts.lutiswap.latestSwapPrice();
        expect(swapPrice).to.equal(parseEther("0.060000000000000000"));
        await contracts.lutiswap
          .connect(fluteWhale)
          .swapExactFluteForLute(3, { value: swapPrice });

        expect(contracts.lutiswap.latestSwapPrice()).to.be.revertedWith(
          "Invalid swap"
        );
      });

      it("swaps preserve total supply", async () => {
        expect(await contracts.lute.totalSupply()).to.equal(4);
        expect(await contracts.flute.totalSupply()).to.equal(4);

        let [, swapPrice] = await contracts.lutiswap.latestSwapPrice();
        await contracts.lutiswap.connect(fluteWhale).swapExactFluteForLute(1, {
          value: swapPrice,
        });
        expect(await contracts.lute.totalSupply()).to.equal(5);
        expect(await contracts.flute.totalSupply()).to.equal(3);

        [, swapPrice] = await contracts.lutiswap.latestSwapPrice();
        await contracts.lutiswap.connect(fluteWhale).swapExactFluteForLute(2, {
          value: swapPrice,
        });
        expect(await contracts.lute.totalSupply()).to.equal(6);
        expect(await contracts.flute.totalSupply()).to.equal(2);

        [, swapPrice] = await contracts.lutiswap.latestSwapPrice();
        await contracts.lutiswap.connect(fluteWhale).swapExactFluteForLute(3, {
          value: swapPrice,
        });
        expect(await contracts.lute.totalSupply()).to.equal(7);
        expect(await contracts.flute.totalSupply()).to.equal(1);
      });

      it("contract holds fees from swaps", async () => {
        expect(
          await ethers.provider.getBalance(contracts.lutiswap.address)
        ).to.equal(parseEther("0"));

        let [, swapPrice] = await contracts.lutiswap.latestSwapPrice();
        await contracts.lutiswap.connect(fluteWhale).swapExactFluteForLute(1, {
          value: swapPrice,
        });
        expect(
          await ethers.provider.getBalance(contracts.lutiswap.address)
        ).to.equal(parseEther("0.013333333333333333"));

        [, swapPrice] = await contracts.lutiswap.latestSwapPrice();
        await contracts.lutiswap.connect(fluteWhale).swapExactFluteForLute(2, {
          value: swapPrice,
        });
        expect(
          await ethers.provider.getBalance(contracts.lutiswap.address)
        ).to.equal(parseEther("0.038333333333333333"));

        [, swapPrice] = await contracts.lutiswap.latestSwapPrice();
        await contracts.lutiswap.connect(fluteWhale).swapExactFluteForLute(3, {
          value: swapPrice,
        });
        expect(
          await ethers.provider.getBalance(contracts.lutiswap.address)
        ).to.equal(parseEther("0.098333333333333333"));
      });
    });

    describe("lutes", () => {
      it("burns the swapped lute", async () => {
        expect(await contracts.lute.balanceOf(luteHolder.address)).to.equal(1);
        expect(await contracts.lute.ownerOf(0)).to.equal(luteHolder.address);
        await contracts.lutiswap.connect(luteHolder).swapExactLuteForFlute(0, {
          value: parseEther("0.013333333333333333"),
        });
        expect(await contracts.lute.balanceOf(luteHolder.address)).to.equal(0);
      });

      it("mints a flute", async () => {
        expect(await contracts.flute.balanceOf(luteHolder.address)).to.equal(0);
        await contracts.lutiswap.connect(luteHolder).swapExactLuteForFlute(0, {
          value: parseEther("0.013333333333333333"),
        });
        expect(await contracts.flute.balanceOf(luteHolder.address)).to.equal(1);
      });

      it("cannot burn unowned lutes", async () => {
        await expect(
          contracts.lutiswap.connect(luteHolder).swapExactLuteForFlute(1, {
            value: parseEther("0.013333333333333333"),
          })
        ).to.be.revertedWith("Must own item to swap");
      });

      it("reverts on insufficient payment", async () => {
        await expect(
          contracts.lutiswap
            .connect(luteHolder)
            .swapExactLuteForFlute(0, { value: parseEther("0.001") })
        ).to.be.revertedWith("Insufficient payment");
      });

      it("refunds excess payment", async () => {
        const initialETHbalance = await ethers.provider.getBalance(
          luteHolder.address
        );
        const tx = await contracts.lutiswap
          .connect(luteHolder)
          .swapExactLuteForFlute(0, {
            value: parseEther("10.013333333333333333"),
          });
        const receipt = await tx.wait();
        const gasSpent = receipt.gasUsed.mul(tx.gasPrice || 0);
        const finalETHbalance = await ethers.provider.getBalance(
          luteHolder.address
        );
        expect(initialETHbalance.sub(finalETHbalance)).to.equal(
          parseEther("0.013333333333333333").add(gasSpent)
        );
      });

      it("can swap all owned lutes", async () => {
        expect(await contracts.lute.balanceOf(luteWhale.address)).to.equal(3);
        expect(await contracts.lute.ownerOf(1)).to.equal(luteWhale.address);
        expect(await contracts.lute.ownerOf(2)).to.equal(luteWhale.address);
        expect(await contracts.lute.ownerOf(3)).to.equal(luteWhale.address);

        for (let id = 1; id <= 3; id++) {
          const [swapCost] = await contracts.lutiswap.latestSwapPrice();
          await contracts.lutiswap
            .connect(luteWhale)
            .swapExactLuteForFlute(id, { value: swapCost });
        }
        expect(await contracts.flute.balanceOf(luteWhale.address)).to.equal(3);
        expect(await contracts.lute.balanceOf(luteWhale.address)).to.equal(0);
      });

      it("swap price increases as supply decreases", async () => {
        let [swapPrice] = await contracts.lutiswap.latestSwapPrice();
        expect(swapPrice).to.equal(parseEther("0.013333333333333333"));
        await contracts.lutiswap
          .connect(luteWhale)
          .swapExactLuteForFlute(1, { value: swapPrice });

        [swapPrice] = await contracts.lutiswap.latestSwapPrice();
        expect(swapPrice).to.equal(parseEther("0.025000000000000000"));
        await contracts.lutiswap
          .connect(luteWhale)
          .swapExactLuteForFlute(2, { value: swapPrice });

        [swapPrice] = await contracts.lutiswap.latestSwapPrice();
        expect(swapPrice).to.equal(parseEther("0.060000000000000000"));
        await contracts.lutiswap
          .connect(luteWhale)
          .swapExactLuteForFlute(3, { value: swapPrice });

        expect(contracts.lutiswap.latestSwapPrice()).to.be.revertedWith(
          "Invalid swap"
        );
      });

      it("swaps preserve total supply", async () => {
        expect(await contracts.lute.totalSupply()).to.equal(4);
        expect(await contracts.flute.totalSupply()).to.equal(4);

        let [swapPrice] = await contracts.lutiswap.latestSwapPrice();
        await contracts.lutiswap.connect(luteWhale).swapExactLuteForFlute(1, {
          value: swapPrice,
        });
        expect(await contracts.lute.totalSupply()).to.equal(3);
        expect(await contracts.flute.totalSupply()).to.equal(5);

        [swapPrice] = await contracts.lutiswap.latestSwapPrice();
        await contracts.lutiswap.connect(luteWhale).swapExactLuteForFlute(2, {
          value: swapPrice,
        });
        expect(await contracts.lute.totalSupply()).to.equal(2);
        expect(await contracts.flute.totalSupply()).to.equal(6);

        [swapPrice] = await contracts.lutiswap.latestSwapPrice();
        await contracts.lutiswap.connect(luteWhale).swapExactLuteForFlute(3, {
          value: swapPrice,
        });
        expect(await contracts.lute.totalSupply()).to.equal(1);
        expect(await contracts.flute.totalSupply()).to.equal(7);
      });

      it("contract holds fees from swaps", async () => {
        expect(
          await ethers.provider.getBalance(contracts.lutiswap.address)
        ).to.equal(parseEther("0"));

        let [, swapPrice] = await contracts.lutiswap.latestSwapPrice();
        await contracts.lutiswap.connect(fluteWhale).swapExactFluteForLute(1, {
          value: swapPrice,
        });
        expect(
          await ethers.provider.getBalance(contracts.lutiswap.address)
        ).to.equal(parseEther("0.013333333333333333"));

        [, swapPrice] = await contracts.lutiswap.latestSwapPrice();
        await contracts.lutiswap.connect(fluteWhale).swapExactFluteForLute(2, {
          value: swapPrice,
        });
        expect(
          await ethers.provider.getBalance(contracts.lutiswap.address)
        ).to.equal(parseEther("0.038333333333333333"));

        [, swapPrice] = await contracts.lutiswap.latestSwapPrice();
        await contracts.lutiswap.connect(fluteWhale).swapExactFluteForLute(3, {
          value: swapPrice,
        });
        expect(
          await ethers.provider.getBalance(contracts.lutiswap.address)
        ).to.equal(parseEther("0.098333333333333333"));
      });
    });

    describe("swap price", () => {
      describe("flutes", () => {
        it("gets current swap price", async () => {
          const [, swapPrice] = await contracts.lutiswap.latestSwapPrice();
          expect(swapPrice).to.equal(parseEther("0.013333333333333333"));
        });

        describe("max supply", () => {
          it("Oops! all lutes", async () => {
            const [, swapPrice] = await contracts.lutiswap.swapPrice(24998, 2);
            expect(swapPrice).to.equal(parseEther("249.98"));
          });

          it("23,900 lutes", async () => {
            const [, swapPrice] = await contracts.lutiswap.swapPrice(
              23900,
              100
            );
            expect(swapPrice).to.equal(parseEther("2.414141414141414141"));
          });

          it("24,000 lutes", async () => {
            const [, swapPrice] = await contracts.lutiswap.swapPrice(
              24000,
              1000
            );
            expect(swapPrice).to.equal(parseEther("0.240240240240240240"));
          });

          it("22,500 lutes", async () => {
            const [, swapPrice] = await contracts.lutiswap.swapPrice(
              22500,
              2500
            );
            expect(swapPrice).to.equal(parseEther("0.090036014405762304"));
          });

          it("20,000 lutes", async () => {
            const [, swapPrice] = await contracts.lutiswap.swapPrice(
              20000,
              5000
            );
            expect(swapPrice).to.equal(parseEther("0.040008001600320064"));
          });

          it("18,000 lutes", async () => {
            const [, swapPrice] = await contracts.lutiswap.swapPrice(
              18000,
              7000
            );
            expect(swapPrice).to.equal(parseEther("0.025717959708529789"));
          });

          it("16,000 lutes", async () => {
            const [, swapPrice] = await contracts.lutiswap.swapPrice(
              16000,
              9000
            );
            expect(swapPrice).to.equal(parseEther("0.017779753305922880"));
          });

          it("14,000 lutes", async () => {
            const [, swapPrice] = await contracts.lutiswap.swapPrice(
              14000,
              11000
            );
            expect(swapPrice).to.equal(parseEther("0.012728429857259750"));
          });

          it("Equal supply", async () => {
            const [, swapPrice] = await contracts.lutiswap.swapPrice(
              12500,
              12500
            );
            expect(swapPrice).to.equal(parseEther("0.010000800064005120"));
          });

          it("10,000 lutes", async () => {
            const [, swapPrice] = await contracts.lutiswap.swapPrice(
              10000,
              15000
            );
            expect(swapPrice).to.equal(parseEther("0.006667111140742716"));
          });

          it("5,000 lutes", async () => {
            const [, swapPrice] = await contracts.lutiswap.swapPrice(
              5000,
              20000
            );
            expect(swapPrice).to.equal(parseEther("0.002500125006250312"));
          });

          it("2,500 lutes", async () => {
            const [, swapPrice] = await contracts.lutiswap.swapPrice(
              2500,
              22500
            );
            expect(swapPrice).to.equal(parseEther("0.001111160496022045"));
          });

          it("1,000 lutes", async () => {
            const [, swapPrice] = await contracts.lutiswap.swapPrice(
              1000,
              24000
            );
            expect(swapPrice).to.equal(parseEther("0.000416684028501187"));
          });

          it("100 lutes", async () => {
            const [, swapPrice] = await contracts.lutiswap.swapPrice(
              100,
              24900
            );

            expect(swapPrice).to.equal(parseEther("0.000040162255512269"));
          });

          it("Oops! all flutes", async () => {
            const [, swapPrice] = await contracts.lutiswap.swapPrice(2, 24998);
            expect(swapPrice).to.equal(parseEther("0.000000800096011521"));
          });
        });
      });

      describe("less than max supply", () => {
        it("Oops! all lutes", async () => {
          const [, swapPrice] = await contracts.lutiswap.swapPrice(2000, 2);
          expect(swapPrice).to.equal(parseEther("20.0000000000000000000"));
        });

        it("Oops! all flutes", async () => {
          const [, swapPrice] = await contracts.lutiswap.swapPrice(2, 2000);
          expect(swapPrice).to.equal(parseEther("0.0000010005002501250"));
        });

        it("Equal supply", async () => {
          const [, swapPrice] = await contracts.lutiswap.swapPrice(1000, 1000);
          expect(swapPrice).to.equal(parseEther("0.010010010010010010"));
        });

        it("10000 lutes, 2000 flutes", async () => {
          const [, swapPrice] = await contracts.lutiswap.swapPrice(10000, 2000);
          expect(swapPrice).to.equal(parseEther("0.050025012506253126"));
        });

        it("5000 lutes, 2000 flutes", async () => {
          const [, swapPrice] = await contracts.lutiswap.swapPrice(5000, 2000);
          expect(swapPrice).to.equal(parseEther("0.025012506253126563"));
        });

        it("30 lutes, 100 flutes", async () => {
          const [, swapPrice] = await contracts.lutiswap.swapPrice(30, 100);
          expect(swapPrice).to.equal(parseEther("0.0003030303030303030"));
        });

        it("10347 lutes, 11003 flutes", async () => {
          const [, swapPrice] = await contracts.lutiswap.swapPrice(
            10347,
            11003
          );
          expect(swapPrice).to.equal(parseEther("0.009404653699327395"));
        });
      });
    });
  });

  describe("fee withdrawals", () => {
    let fee: BigNumber;

    beforeEach(async () => {
      fee = parseEther("0.013333333333333333");
      await contracts.lutiswap.connect(luteHolder).swapExactLuteForFlute(0, {
        value: fee,
      });
    });

    it("owner can withdraw stored fees", async () => {
      const initialETHbalance = await ethers.provider.getBalance(owner.address);
      const tx = await contracts.lutiswap
        .connect(owner)
        .withdraw(owner.address, fee);
      const receipt = await tx.wait();
      const gasSpent = receipt.gasUsed.mul(tx.gasPrice || 0);
      const finalETHbalance = await ethers.provider.getBalance(owner.address);
      expect(finalETHbalance).to.equal(
        initialETHbalance.add(fee).sub(gasSpent)
      );
    });

    it("non-owner cannot withdraw stored fees", async () => {
      it("non-owner cannot withdraw ETH from tips", async () => {
        await expect(
          contracts.lutiswap.connect(nonOwner).withdraw(nonOwner.address, fee)
        ).to.be.revertedWith("caller is not the owner");
      });
    });
  });
});
