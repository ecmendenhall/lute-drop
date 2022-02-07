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
  const lute = (await (await LuteFactory.deploy(true)).deployed()) as Lute;

  const FluteFactory = await ethers.getContractFactory("Flute", {
    libraries: {
      ItemLib: itemlib.address,
    },
  });
  const flute = (await (await FluteFactory.deploy(true)).deployed()) as Flute;

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

describe("Lutiswap", () => {
  beforeEach(async () => {
    contracts = await deploy();
    [owner, nonOwner, fluteHolder, luteHolder, fluteWhale, luteWhale] =
      await ethers.getSigners();

    await contracts.flute.connect(owner).grantRole(CRAFTER_ROLE, owner.address);
    await contracts.lute.connect(owner).grantRole(CRAFTER_ROLE, owner.address);

    await contracts.flute.connect(owner).craft(fluteHolder.address);
    await contracts.lute.connect(owner).craft(contracts.lutiswap.address);

    await contracts.lute.connect(owner).craft(luteHolder.address);
    await contracts.flute.connect(owner).craft(contracts.lutiswap.address);

    await contracts.flute.connect(owner).craft(fluteWhale.address);
    await contracts.flute.connect(owner).craft(fluteWhale.address);
    await contracts.flute.connect(owner).craft(fluteWhale.address);
    await contracts.lute.connect(owner).craft(contracts.lutiswap.address);
    await contracts.lute.connect(owner).craft(contracts.lutiswap.address);
    await contracts.lute.connect(owner).craft(contracts.lutiswap.address);

    await contracts.lute.connect(owner).craft(luteWhale.address);
    await contracts.lute.connect(owner).craft(luteWhale.address);
    await contracts.lute.connect(owner).craft(luteWhale.address);
    await contracts.flute.connect(owner).craft(contracts.lutiswap.address);
    await contracts.flute.connect(owner).craft(contracts.lutiswap.address);
    await contracts.flute.connect(owner).craft(contracts.lutiswap.address);

    await contracts.flute
      .connect(owner)
      .grantRole(CRAFTER_ROLE, contracts.lutiswap.address);

    await contracts.lute
      .connect(owner)
      .grantRole(CRAFTER_ROLE, contracts.lutiswap.address);

    await contracts.lutiswap.connect(owner).setBaseFee(4);
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

  describe("nextFlute", () => {
    it("returns next flute", async () => {
      expect(await contracts.lutiswap.nextLute()).to.equal(0);
    });
  });

  describe("nextLute", () => {
    it("returns next lute", async () => {
      expect(await contracts.lutiswap.nextFlute()).to.equal(1);
    });
  });

  describe("swaps", () => {
    describe("flutes", () => {
      beforeEach(async () => {
        await contracts.flute
          .connect(fluteHolder)
          .setApprovalForAll(contracts.lutiswap.address, true);
      });

      it("transfers in the swapped flute", async () => {
        expect(await contracts.flute.balanceOf(fluteHolder.address)).to.equal(
          1
        );
        expect(await contracts.flute.ownerOf(0)).to.equal(fluteHolder.address);
        const [_luteFee, fluteFee] = await contracts.lutiswap.latestSwapPrice();
        await contracts.lutiswap.connect(fluteHolder).swapExactFluteForLute(0, {
          value: fluteFee,
        });
        expect(await contracts.flute.balanceOf(fluteHolder.address)).to.equal(
          0
        );
        expect(await contracts.flute.ownerOf(0)).to.equal(
          contracts.lutiswap.address
        );
      });

      it("transfers out a reserve lute", async () => {
        expect(await contracts.lute.ownerOf(0)).to.equal(
          contracts.lutiswap.address
        );
        expect(await contracts.lute.balanceOf(fluteHolder.address)).to.equal(0);
        const [_luteFee, fluteFee] = await contracts.lutiswap.latestSwapPrice();
        await contracts.lutiswap.connect(fluteHolder).swapExactFluteForLute(0, {
          value: fluteFee,
        });
        expect(await contracts.lute.balanceOf(fluteHolder.address)).to.equal(1);
        expect(await contracts.lute.ownerOf(0)).to.equal(fluteHolder.address);
      });

      it("emits Swap event", async () => {
        const [_luteFee, fluteFee] = await contracts.lutiswap.latestSwapPrice();
        await expect(
          contracts.lutiswap.connect(fluteHolder).swapExactFluteForLute(0, {
            value: fluteFee,
          })
        )
          .to.emit(contracts.lutiswap, "Swap")
          .withArgs(
            fluteHolder.address,
            contracts.flute.address,
            contracts.lute.address,
            0,
            0,
            fluteFee
          );
      });

      it("cannot swap unowned flutes", async () => {
        const [_luteFee, fluteFee] = await contracts.lutiswap.latestSwapPrice();
        await expect(
          contracts.lutiswap.connect(fluteHolder).swapExactFluteForLute(1, {
            value: fluteFee,
          })
        ).to.be.revertedWith("Must own item to swap");
      });

      it("reverts on insufficient payment", async () => {
        const [_luteFee, fluteFee] = await contracts.lutiswap.latestSwapPrice();
        await expect(
          contracts.lutiswap
            .connect(fluteHolder)
            .swapExactFluteForLute(0, { value: fluteFee.sub(1) })
        ).to.be.revertedWith("Insufficient payment");
      });

      it("refunds excess payment", async () => {
        const [_luteFee, fluteFee] = await contracts.lutiswap.latestSwapPrice();
        const initialETHbalance = await ethers.provider.getBalance(
          fluteHolder.address
        );
        const tx = await contracts.lutiswap
          .connect(fluteHolder)
          .swapExactFluteForLute(0, {
            value: fluteFee.add(parseEther("1")),
          });
        const receipt = await tx.wait();
        const gasSpent = receipt.gasUsed.mul(tx.gasPrice || 0);
        const finalETHbalance = await ethers.provider.getBalance(
          fluteHolder.address
        );
        expect(initialETHbalance.sub(finalETHbalance)).to.equal(
          fluteFee.add(gasSpent)
        );
      });

      it("can swap all owned flutes", async () => {
        expect(await contracts.flute.balanceOf(fluteWhale.address)).to.equal(3);
        expect(await contracts.flute.ownerOf(2)).to.equal(fluteWhale.address);
        expect(await contracts.flute.ownerOf(3)).to.equal(fluteWhale.address);
        expect(await contracts.flute.ownerOf(4)).to.equal(fluteWhale.address);

        for (let id = 2; id <= 4; id++) {
          const [, swapCost] = await contracts.lutiswap.latestSwapPrice();
          await contracts.flute
            .connect(fluteWhale)
            .approve(contracts.lutiswap.address, id);
          await contracts.lutiswap
            .connect(fluteWhale)
            .swapExactFluteForLute(id, { value: swapCost });
        }
        expect(await contracts.flute.balanceOf(fluteWhale.address)).to.equal(0);
        expect(await contracts.lute.balanceOf(fluteWhale.address)).to.equal(3);
      });

      it("swap price increases as reserve increases", async () => {
        let [, swapPrice] = await contracts.lutiswap.latestSwapPrice();
        expect(swapPrice).to.equal(parseEther("5.333333333333333332"));
        await contracts.flute
          .connect(fluteWhale)
          .approve(contracts.lutiswap.address, 2);
        await contracts.lutiswap
          .connect(fluteWhale)
          .swapExactFluteForLute(2, { value: swapPrice });

        [, swapPrice] = await contracts.lutiswap.latestSwapPrice();
        expect(swapPrice).to.equal(parseEther("10"));
        await contracts.flute
          .connect(fluteWhale)
          .approve(contracts.lutiswap.address, 3);
        await contracts.lutiswap
          .connect(fluteWhale)
          .swapExactFluteForLute(3, { value: swapPrice });

        [, swapPrice] = await contracts.lutiswap.latestSwapPrice();
        expect(swapPrice).to.equal(parseEther("24"));
        await contracts.flute
          .connect(fluteWhale)
          .approve(contracts.lutiswap.address, 4);
        await contracts.lutiswap
          .connect(fluteWhale)
          .swapExactFluteForLute(4, { value: swapPrice });

        await expect(contracts.lutiswap.latestSwapPrice()).to.be.revertedWith(
          "Invalid swap"
        );
      });

      it("swaps preserve total reserves", async () => {
        expect(await contracts.lute.totalSupply()).to.equal(8);
        expect(await contracts.flute.totalSupply()).to.equal(8);

        let [, swapPrice] = await contracts.lutiswap.latestSwapPrice();
        await contracts.flute
          .connect(fluteWhale)
          .approve(contracts.lutiswap.address, 2);
        await contracts.lutiswap.connect(fluteWhale).swapExactFluteForLute(2, {
          value: swapPrice,
        });
        expect(
          await contracts.lute.balanceOf(contracts.lutiswap.address)
        ).to.equal(3);
        expect(
          await contracts.flute.balanceOf(contracts.lutiswap.address)
        ).to.equal(5);

        [, swapPrice] = await contracts.lutiswap.latestSwapPrice();
        await contracts.flute
          .connect(fluteWhale)
          .approve(contracts.lutiswap.address, 3);
        await contracts.lutiswap.connect(fluteWhale).swapExactFluteForLute(3, {
          value: swapPrice,
        });
        expect(
          await contracts.lute.balanceOf(contracts.lutiswap.address)
        ).to.equal(2);
        expect(
          await contracts.flute.balanceOf(contracts.lutiswap.address)
        ).to.equal(6);

        [, swapPrice] = await contracts.lutiswap.latestSwapPrice();
        await contracts.flute
          .connect(fluteWhale)
          .approve(contracts.lutiswap.address, 4);
        await contracts.lutiswap.connect(fluteWhale).swapExactFluteForLute(4, {
          value: swapPrice,
        });
        expect(
          await contracts.lute.balanceOf(contracts.lutiswap.address)
        ).to.equal(1);
        expect(
          await contracts.flute.balanceOf(contracts.lutiswap.address)
        ).to.equal(7);
      });

      it("contract holds fees from swaps", async () => {
        expect(
          await ethers.provider.getBalance(contracts.lutiswap.address)
        ).to.equal(parseEther("0"));

        let [, swap1Price] = await contracts.lutiswap.latestSwapPrice();
        await contracts.flute
          .connect(fluteWhale)
          .approve(contracts.lutiswap.address, 2);
        await contracts.lutiswap.connect(fluteWhale).swapExactFluteForLute(2, {
          value: swap1Price,
        });
        expect(
          await ethers.provider.getBalance(contracts.lutiswap.address)
        ).to.equal(swap1Price);

        let [, swap2Price] = await contracts.lutiswap.latestSwapPrice();
        await contracts.flute
          .connect(fluteWhale)
          .approve(contracts.lutiswap.address, 3);
        await contracts.lutiswap.connect(fluteWhale).swapExactFluteForLute(3, {
          value: swap2Price,
        });
        expect(
          await ethers.provider.getBalance(contracts.lutiswap.address)
        ).to.equal(swap1Price.add(swap2Price));

        let [, swap3Price] = await contracts.lutiswap.latestSwapPrice();
        await contracts.flute
          .connect(fluteWhale)
          .approve(contracts.lutiswap.address, 4);
        await contracts.lutiswap.connect(fluteWhale).swapExactFluteForLute(4, {
          value: swap3Price,
        });
        expect(
          await ethers.provider.getBalance(contracts.lutiswap.address)
        ).to.equal(swap1Price.add(swap2Price).add(swap3Price));
      });
    });

    describe("lutes", () => {
      beforeEach(async () => {
        await contracts.lute
          .connect(luteHolder)
          .setApprovalForAll(contracts.lutiswap.address, true);
      });

      it("transfers in the swapped lute", async () => {
        expect(await contracts.lute.balanceOf(luteHolder.address)).to.equal(1);
        expect(await contracts.lute.ownerOf(1)).to.equal(luteHolder.address);
        const [luteFee, _fluteFee] = await contracts.lutiswap.latestSwapPrice();
        await contracts.lutiswap.connect(luteHolder).swapExactLuteForFlute(1, {
          value: luteFee,
        });
        expect(await contracts.lute.balanceOf(luteHolder.address)).to.equal(0);
        expect(await contracts.lute.ownerOf(1)).to.equal(
          contracts.lutiswap.address
        );
      });

      it("transfers out a reserve flute", async () => {
        expect(await contracts.flute.ownerOf(1)).to.equal(
          contracts.lutiswap.address
        );
        expect(await contracts.flute.balanceOf(luteHolder.address)).to.equal(0);
        const [luteFee, _fluteFee] = await contracts.lutiswap.latestSwapPrice();
        await contracts.lutiswap.connect(luteHolder).swapExactLuteForFlute(1, {
          value: luteFee,
        });
        expect(await contracts.flute.balanceOf(luteHolder.address)).to.equal(1);
        expect(await contracts.flute.ownerOf(1)).to.equal(luteHolder.address);
      });

      it("emits Swap event", async () => {
        const [luteFee, _fluteFee] = await contracts.lutiswap.latestSwapPrice();
        await expect(
          contracts.lutiswap.connect(luteHolder).swapExactLuteForFlute(1, {
            value: luteFee,
          })
        )
          .to.emit(contracts.lutiswap, "Swap")
          .withArgs(
            luteHolder.address,
            contracts.lute.address,
            contracts.flute.address,
            1,
            1,
            luteFee
          );
      });

      it("cannot swap unowned lutes", async () => {
        const [luteFee, _fluteFee] = await contracts.lutiswap.latestSwapPrice();
        await expect(
          contracts.lutiswap.connect(luteHolder).swapExactLuteForFlute(0, {
            value: luteFee,
          })
        ).to.be.revertedWith("Must own item to swap");
      });

      it("reverts on insufficient payment", async () => {
        const [luteFee, _fluteFee] = await contracts.lutiswap.latestSwapPrice();
        await expect(
          contracts.lutiswap
            .connect(luteHolder)
            .swapExactLuteForFlute(1, { value: luteFee.sub(1) })
        ).to.be.revertedWith("Insufficient payment");
      });

      it("refunds excess payment", async () => {
        const [luteFee, _fluteFee] = await contracts.lutiswap.latestSwapPrice();
        const initialETHbalance = await ethers.provider.getBalance(
          luteHolder.address
        );
        const tx = await contracts.lutiswap
          .connect(luteHolder)
          .swapExactLuteForFlute(1, {
            value: luteFee.add(parseEther("1")),
          });
        const receipt = await tx.wait();
        const gasSpent = receipt.gasUsed.mul(tx.gasPrice || 0);
        const finalETHbalance = await ethers.provider.getBalance(
          luteHolder.address
        );
        expect(initialETHbalance.sub(finalETHbalance)).to.equal(
          luteFee.add(gasSpent)
        );
      });

      it("can swap all owned lutes", async () => {
        expect(await contracts.lute.balanceOf(luteWhale.address)).to.equal(3);
        expect(await contracts.lute.ownerOf(5)).to.equal(luteWhale.address);
        expect(await contracts.lute.ownerOf(6)).to.equal(luteWhale.address);
        expect(await contracts.lute.ownerOf(7)).to.equal(luteWhale.address);

        for (let id = 5; id <= 7; id++) {
          const [swapCost] = await contracts.lutiswap.latestSwapPrice();
          await contracts.lute
            .connect(luteWhale)
            .approve(contracts.lutiswap.address, id);
          await contracts.lutiswap
            .connect(luteWhale)
            .swapExactLuteForFlute(id, { value: swapCost });
        }
        expect(await contracts.lute.balanceOf(luteWhale.address)).to.equal(0);
        expect(await contracts.flute.balanceOf(luteWhale.address)).to.equal(3);
      });

      it("swap price increases as reserve increases", async () => {
        let [swapPrice] = await contracts.lutiswap.latestSwapPrice();
        expect(swapPrice).to.equal(parseEther("5.333333333333333332"));
        await contracts.lute
          .connect(luteWhale)
          .approve(contracts.lutiswap.address, 5);
        await contracts.lutiswap
          .connect(luteWhale)
          .swapExactLuteForFlute(5, { value: swapPrice });

        [swapPrice] = await contracts.lutiswap.latestSwapPrice();
        expect(swapPrice).to.equal(parseEther("10"));
        await contracts.lute
          .connect(luteWhale)
          .approve(contracts.lutiswap.address, 6);
        await contracts.lutiswap
          .connect(luteWhale)
          .swapExactLuteForFlute(6, { value: swapPrice });

        [swapPrice] = await contracts.lutiswap.latestSwapPrice();
        expect(swapPrice).to.equal(parseEther("24"));
        await contracts.lute
          .connect(luteWhale)
          .approve(contracts.lutiswap.address, 7);
        await contracts.lutiswap
          .connect(luteWhale)
          .swapExactLuteForFlute(7, { value: swapPrice });

        await expect(contracts.lutiswap.latestSwapPrice()).to.be.revertedWith(
          "Invalid swap"
        );
      });

      it("swaps preserve total reserves", async () => {
        expect(await contracts.lute.totalSupply()).to.equal(8);
        expect(await contracts.flute.totalSupply()).to.equal(8);

        let [swapPrice] = await contracts.lutiswap.latestSwapPrice();
        await contracts.lute
          .connect(luteWhale)
          .approve(contracts.lutiswap.address, 5);
        await contracts.lutiswap.connect(luteWhale).swapExactLuteForFlute(5, {
          value: swapPrice,
        });
        expect(
          await contracts.lute.balanceOf(contracts.lutiswap.address)
        ).to.equal(5);
        expect(
          await contracts.flute.balanceOf(contracts.lutiswap.address)
        ).to.equal(3);

        [swapPrice] = await contracts.lutiswap.latestSwapPrice();
        await contracts.lute
          .connect(luteWhale)
          .approve(contracts.lutiswap.address, 6);
        await contracts.lutiswap.connect(luteWhale).swapExactLuteForFlute(6, {
          value: swapPrice,
        });
        expect(
          await contracts.lute.balanceOf(contracts.lutiswap.address)
        ).to.equal(6);
        expect(
          await contracts.flute.balanceOf(contracts.lutiswap.address)
        ).to.equal(2);

        [swapPrice] = await contracts.lutiswap.latestSwapPrice();
        await contracts.lute
          .connect(luteWhale)
          .approve(contracts.lutiswap.address, 7);
        await contracts.lutiswap.connect(luteWhale).swapExactLuteForFlute(7, {
          value: swapPrice,
        });
        expect(
          await contracts.lute.balanceOf(contracts.lutiswap.address)
        ).to.equal(7);
        expect(
          await contracts.flute.balanceOf(contracts.lutiswap.address)
        ).to.equal(1);
      });

      it("contract holds fees from swaps", async () => {
        expect(
          await ethers.provider.getBalance(contracts.lutiswap.address)
        ).to.equal(parseEther("0"));

        let [swap1Price] = await contracts.lutiswap.latestSwapPrice();
        await contracts.lute
          .connect(luteWhale)
          .approve(contracts.lutiswap.address, 5);
        await contracts.lutiswap.connect(luteWhale).swapExactLuteForFlute(5, {
          value: swap1Price,
        });
        expect(
          await ethers.provider.getBalance(contracts.lutiswap.address)
        ).to.equal(swap1Price);

        let [swap2Price] = await contracts.lutiswap.latestSwapPrice();
        await contracts.lute
          .connect(luteWhale)
          .approve(contracts.lutiswap.address, 6);
        await contracts.lutiswap.connect(luteWhale).swapExactLuteForFlute(6, {
          value: swap2Price,
        });
        expect(
          await ethers.provider.getBalance(contracts.lutiswap.address)
        ).to.equal(swap1Price.add(swap2Price));

        let [swap3Price] = await contracts.lutiswap.latestSwapPrice();
        await contracts.lute
          .connect(luteWhale)
          .approve(contracts.lutiswap.address, 7);
        await contracts.lutiswap.connect(luteWhale).swapExactLuteForFlute(7, {
          value: swap3Price,
        });
        expect(
          await ethers.provider.getBalance(contracts.lutiswap.address)
        ).to.equal(swap1Price.add(swap2Price).add(swap3Price));
      });
    });

    describe("swap price", () => {
      describe("flutes", () => {
        it("gets current swap price", async () => {
          const [, swapPrice] = await contracts.lutiswap.latestSwapPrice();
          expect(swapPrice).to.equal(parseEther("5.333333333333333332"));
        });

        describe("max supply", () => {
          it("Oops! all lutes", async () => {
            const [, swapPrice] = await contracts.lutiswap.swapPrice(4998, 2);
            expect(swapPrice).to.equal(parseEther("0.001600960576345804"));
          });

          it("4,500 lutes", async () => {
            const [, swapPrice] = await contracts.lutiswap.swapPrice(4500, 500);
            expect(swapPrice).to.equal(parseEther("0.444543231829295396"));
          });

          it("4,000 lutes", async () => {
            const [, swapPrice] = await contracts.lutiswap.swapPrice(
              4000,
              1000
            );
            expect(swapPrice).to.equal(parseEther("1.000250062515628904"));
          });

          it("3,000 lutes", async () => {
            const [, swapPrice] = await contracts.lutiswap.swapPrice(
              3000,
              2000
            );
            expect(swapPrice).to.equal(parseEther("2.667555851950650216"));
          });

          it("Equal supply", async () => {
            const [, swapPrice] = await contracts.lutiswap.swapPrice(
              2500,
              2500
            );
            expect(swapPrice).to.equal(parseEther("4.001600640256102440"));
          });

          it("2,000 lutes", async () => {
            const [, swapPrice] = await contracts.lutiswap.swapPrice(
              2000,
              3000
            );
            expect(swapPrice).to.equal(parseEther("6.003001500750375184"));
          });

          it("1,000 lutes", async () => {
            const [, swapPrice] = await contracts.lutiswap.swapPrice(
              1000,
              4000
            );
            expect(swapPrice).to.equal(parseEther("16.016016016016016016"));
          });

          it("500 lutes", async () => {
            const [, swapPrice] = await contracts.lutiswap.swapPrice(500, 4500);
            expect(swapPrice).to.equal(parseEther("36.072144288577154308"));
          });

          it("Oops! all flutes", async () => {
            const [, swapPrice] = await contracts.lutiswap.swapPrice(2, 4998);
            expect(swapPrice).to.equal(parseEther("19992"));
          });
        });
      });

      describe("less than max supply", () => {
        it("Oops! all lutes", async () => {
          const [, swapPrice] = await contracts.lutiswap.swapPrice(200, 2);
          expect(swapPrice).to.equal(parseEther(".040201005025125628"));
        });

        it("Oops! all flutes", async () => {
          const [, swapPrice] = await contracts.lutiswap.swapPrice(2, 200);
          expect(swapPrice).to.equal(parseEther("800"));
        });

        it("Equal supply", async () => {
          const [, swapPrice] = await contracts.lutiswap.swapPrice(100, 100);
          expect(swapPrice).to.equal(parseEther("4.040404040404040404"));
        });

        it("100 lutes, 200 flutes", async () => {
          const [, swapPrice] = await contracts.lutiswap.swapPrice(100, 200);
          expect(swapPrice).to.equal(parseEther("8.080808080808080808"));
        });

        it("500 lutes, 200 flutes", async () => {
          const [, swapPrice] = await contracts.lutiswap.swapPrice(500, 200);
          expect(swapPrice).to.equal(parseEther("1.603206412825651300"));
        });

        it("30 lutes, 100 flutes", async () => {
          const [, swapPrice] = await contracts.lutiswap.swapPrice(30, 100);
          expect(swapPrice).to.equal(parseEther("13.793103448275862068"));
        });

        it("347 lutes, 103 flutes", async () => {
          const [, swapPrice] = await contracts.lutiswap.swapPrice(347, 103);
          expect(swapPrice).to.equal(parseEther("1.190751445086705200"));
        });
      });
    });
  });

  describe("fee withdrawals", () => {
    let fee: BigNumber;

    beforeEach(async () => {
      [fee] = await contracts.lutiswap.latestSwapPrice();
      await contracts.lute
        .connect(luteHolder)
        .setApprovalForAll(contracts.lutiswap.address, true);
      await contracts.lutiswap.connect(luteHolder).swapExactLuteForFlute(1, {
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

    it("emits a Withdraw event", async () => {
      await expect(
        contracts.lutiswap.connect(owner).withdraw(owner.address, fee)
      )
        .to.emit(contracts.lutiswap, "Withdraw")
        .withArgs(owner.address, fee);
    });

    it("non-owner cannot withdraw stored fees", async () => {
      await expect(
        contracts.lutiswap.connect(nonOwner).withdraw(nonOwner.address, fee)
      ).to.be.revertedWith("caller is not the owner");
    });
  });

  describe("base fee", () => {
    it("baseFee returns base fee", async () => {
      const baseFee = await contracts.lutiswap.baseFee();
      expect(baseFee).to.equal(4);
    });

    it("owner can set base fee", async () => {
      await contracts.lutiswap.connect(owner).setBaseFee(10);
      const baseFee = await contracts.lutiswap.baseFee();
      expect(baseFee).to.equal(10);
    });

    it("emits UpdateBaseFee event", async () => {
      await expect(contracts.lutiswap.connect(owner).setBaseFee(10))
        .to.emit(contracts.lutiswap, "UpdateBaseFee")
        .withArgs(4, 10);
    });

    it("non-owner cannot set base fee", async () => {
      await expect(
        contracts.lutiswap.connect(nonOwner).setBaseFee(0)
      ).to.be.revertedWith("caller is not the owner");
    });
  });
});
