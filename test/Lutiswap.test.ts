import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { parseEther } from "ethers/lib/utils";
import { ethers } from "hardhat";
import { parse } from "path/posix";

import { Lutiswap, Lute, Flute } from "../typechain";

interface Contracts {
  lute: Lute;
  flute: Flute;
  lutiswap: Lutiswap;
}

async function deploy(): Promise<Contracts> {
  const LuteFactory = await ethers.getContractFactory("Lute");
  const lute = (await (await LuteFactory.deploy()).deployed()) as Lute;

  const FluteFactory = await ethers.getContractFactory("Flute");
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
            value: parseEther("10.133333333333333333"),
          });
        const receipt = await tx.wait();
        const gasSpent = receipt.gasUsed.mul(tx.gasPrice || 0);
        const finalETHbalance = await ethers.provider.getBalance(
          fluteHolder.address
        );
        expect(initialETHbalance.sub(finalETHbalance)).to.equal(
          parseEther("0.133333333333333333").add(gasSpent)
        );
      });

      it("can swap all owned flutes", async () => {
        expect(await contracts.flute.balanceOf(fluteWhale.address)).to.equal(3);
        expect(await contracts.flute.ownerOf(1)).to.equal(fluteWhale.address);
        expect(await contracts.flute.ownerOf(2)).to.equal(fluteWhale.address);
        expect(await contracts.flute.ownerOf(3)).to.equal(fluteWhale.address);

        for (let id = 1; id <= 3; id++) {
          const swapCost = await contracts.lutiswap.latestFluteSwapPrice();
          await contracts.lutiswap
            .connect(fluteWhale)
            .swapExactFluteForLute(id, { value: swapCost });
        }
        expect(await contracts.flute.balanceOf(fluteWhale.address)).to.equal(0);
        expect(await contracts.lute.balanceOf(fluteWhale.address)).to.equal(3);
      });

      it("swap price increases as supply decreases", async () => {
        let swapPrice = await contracts.lutiswap.latestFluteSwapPrice();
        expect(swapPrice).to.equal(parseEther("0.133333333333333333"));
        await contracts.lutiswap
          .connect(fluteWhale)
          .swapExactFluteForLute(1, { value: swapPrice });

        swapPrice = await contracts.lutiswap.latestFluteSwapPrice();
        expect(swapPrice).to.equal(parseEther("0.250000000000000000"));
        await contracts.lutiswap
          .connect(fluteWhale)
          .swapExactFluteForLute(2, { value: swapPrice });

        swapPrice = await contracts.lutiswap.latestFluteSwapPrice();
        expect(swapPrice).to.equal(parseEther("0.600000000000000000"));
        await contracts.lutiswap
          .connect(fluteWhale)
          .swapExactFluteForLute(3, { value: swapPrice });

        expect(contracts.lutiswap.latestFluteSwapPrice()).to.be.revertedWith(
          "Invalid swap"
        );
      });

      it("swaps preserve total supply", async () => {
        expect(await contracts.lute.totalSupply()).to.equal(4);
        expect(await contracts.flute.totalSupply()).to.equal(4);

        await contracts.lutiswap.connect(fluteWhale).swapExactFluteForLute(1, {
          value: await contracts.lutiswap.latestFluteSwapPrice(),
        });
        expect(await contracts.lute.totalSupply()).to.equal(5);
        expect(await contracts.flute.totalSupply()).to.equal(3);

        await contracts.lutiswap.connect(fluteWhale).swapExactFluteForLute(2, {
          value: await contracts.lutiswap.latestFluteSwapPrice(),
        });
        expect(await contracts.lute.totalSupply()).to.equal(6);
        expect(await contracts.flute.totalSupply()).to.equal(2);

        await contracts.lutiswap.connect(fluteWhale).swapExactFluteForLute(3, {
          value: await contracts.lutiswap.latestFluteSwapPrice(),
        });
        expect(await contracts.lute.totalSupply()).to.equal(7);
        expect(await contracts.flute.totalSupply()).to.equal(1);
      });

      it("contract holds fees from swaps", async () => {
        expect(
          await ethers.provider.getBalance(contracts.lutiswap.address)
        ).to.equal(parseEther("0"));

        await contracts.lutiswap.connect(fluteWhale).swapExactFluteForLute(1, {
          value: await contracts.lutiswap.latestFluteSwapPrice(),
        });
        expect(
          await ethers.provider.getBalance(contracts.lutiswap.address)
        ).to.equal(parseEther("0.133333333333333333"));

        await contracts.lutiswap.connect(fluteWhale).swapExactFluteForLute(2, {
          value: await contracts.lutiswap.latestFluteSwapPrice(),
        });
        expect(
          await ethers.provider.getBalance(contracts.lutiswap.address)
        ).to.equal(parseEther("0.383333333333333333"));

        await contracts.lutiswap.connect(fluteWhale).swapExactFluteForLute(3, {
          value: await contracts.lutiswap.latestFluteSwapPrice(),
        });
        expect(
          await ethers.provider.getBalance(contracts.lutiswap.address)
        ).to.equal(parseEther("0.983333333333333333"));
      });
    });

    describe("lutes", () => {
      it("burns the swapped lute", async () => {
        expect(await contracts.lute.balanceOf(luteHolder.address)).to.equal(1);
        expect(await contracts.lute.ownerOf(0)).to.equal(luteHolder.address);
        await contracts.lutiswap.connect(luteHolder).swapExactLuteForFlute(0, {
          value: parseEther("0.133333333333333333"),
        });
        expect(await contracts.lute.balanceOf(luteHolder.address)).to.equal(0);
      });

      it("mints a flute", async () => {
        expect(await contracts.flute.balanceOf(luteHolder.address)).to.equal(0);
        await contracts.lutiswap.connect(luteHolder).swapExactLuteForFlute(0, {
          value: parseEther("0.133333333333333333"),
        });
        expect(await contracts.flute.balanceOf(luteHolder.address)).to.equal(1);
      });

      it("cannot burn unowned lutes", async () => {
        await expect(
          contracts.lutiswap.connect(luteHolder).swapExactLuteForFlute(1, {
            value: parseEther("0.133333333333333333"),
          })
        ).to.be.revertedWith("Must own item to swap");
      });

      it("reverts on insufficient payment", async () => {
        await expect(
          contracts.lutiswap
            .connect(luteHolder)
            .swapExactLuteForFlute(0, { value: parseEther("0.01") })
        ).to.be.revertedWith("Insufficient payment");
      });

      it("refunds excess payment", async () => {
        const initialETHbalance = await ethers.provider.getBalance(
          luteHolder.address
        );
        const tx = await contracts.lutiswap
          .connect(luteHolder)
          .swapExactLuteForFlute(0, {
            value: parseEther("10.133333333333333333"),
          });
        const receipt = await tx.wait();
        const gasSpent = receipt.gasUsed.mul(tx.gasPrice || 0);
        const finalETHbalance = await ethers.provider.getBalance(
          luteHolder.address
        );
        expect(initialETHbalance.sub(finalETHbalance)).to.equal(
          parseEther("0.133333333333333333").add(gasSpent)
        );
      });

      it("can swap all owned lutes", async () => {
        expect(await contracts.lute.balanceOf(luteWhale.address)).to.equal(3);
        expect(await contracts.lute.ownerOf(1)).to.equal(luteWhale.address);
        expect(await contracts.lute.ownerOf(2)).to.equal(luteWhale.address);
        expect(await contracts.lute.ownerOf(3)).to.equal(luteWhale.address);

        for (let id = 1; id <= 3; id++) {
          const swapCost = await contracts.lutiswap.latestLuteSwapPrice();
          await contracts.lutiswap
            .connect(luteWhale)
            .swapExactLuteForFlute(id, { value: swapCost });
        }
        expect(await contracts.flute.balanceOf(luteWhale.address)).to.equal(3);
        expect(await contracts.lute.balanceOf(luteWhale.address)).to.equal(0);
      });

      it("swap price increases as supply decreases", async () => {
        let swapPrice = await contracts.lutiswap.latestLuteSwapPrice();
        expect(swapPrice).to.equal(parseEther("0.133333333333333333"));
        await contracts.lutiswap
          .connect(luteWhale)
          .swapExactLuteForFlute(1, { value: swapPrice });

        swapPrice = await contracts.lutiswap.latestLuteSwapPrice();
        expect(swapPrice).to.equal(parseEther("0.250000000000000000"));
        await contracts.lutiswap
          .connect(luteWhale)
          .swapExactLuteForFlute(2, { value: swapPrice });

        swapPrice = await contracts.lutiswap.latestLuteSwapPrice();
        expect(swapPrice).to.equal(parseEther("0.600000000000000000"));
        await contracts.lutiswap
          .connect(luteWhale)
          .swapExactLuteForFlute(3, { value: swapPrice });

        expect(contracts.lutiswap.latestLuteSwapPrice()).to.be.revertedWith(
          "Invalid swap"
        );
      });

      it("swaps preserve total supply", async () => {
        expect(await contracts.lute.totalSupply()).to.equal(4);
        expect(await contracts.flute.totalSupply()).to.equal(4);

        await contracts.lutiswap.connect(luteWhale).swapExactLuteForFlute(1, {
          value: await contracts.lutiswap.latestLuteSwapPrice(),
        });
        expect(await contracts.lute.totalSupply()).to.equal(3);
        expect(await contracts.flute.totalSupply()).to.equal(5);

        await contracts.lutiswap.connect(luteWhale).swapExactLuteForFlute(2, {
          value: await contracts.lutiswap.latestLuteSwapPrice(),
        });
        expect(await contracts.lute.totalSupply()).to.equal(2);
        expect(await contracts.flute.totalSupply()).to.equal(6);

        await contracts.lutiswap.connect(luteWhale).swapExactLuteForFlute(3, {
          value: await contracts.lutiswap.latestLuteSwapPrice(),
        });
        expect(await contracts.lute.totalSupply()).to.equal(1);
        expect(await contracts.flute.totalSupply()).to.equal(7);
      });

      it("contract holds fees from swaps", async () => {
        expect(
          await ethers.provider.getBalance(contracts.lutiswap.address)
        ).to.equal(parseEther("0"));

        await contracts.lutiswap.connect(fluteWhale).swapExactFluteForLute(1, {
          value: await contracts.lutiswap.latestFluteSwapPrice(),
        });
        expect(
          await ethers.provider.getBalance(contracts.lutiswap.address)
        ).to.equal(parseEther("0.133333333333333333"));

        await contracts.lutiswap.connect(fluteWhale).swapExactFluteForLute(2, {
          value: await contracts.lutiswap.latestFluteSwapPrice(),
        });
        expect(
          await ethers.provider.getBalance(contracts.lutiswap.address)
        ).to.equal(parseEther("0.383333333333333333"));

        await contracts.lutiswap.connect(fluteWhale).swapExactFluteForLute(3, {
          value: await contracts.lutiswap.latestFluteSwapPrice(),
        });
        expect(
          await ethers.provider.getBalance(contracts.lutiswap.address)
        ).to.equal(parseEther("0.983333333333333333"));
      });
    });

    describe("swap price", () => {
      describe("flutes", () => {
        it("gets current swap price", async () => {
          expect(await contracts.lutiswap.latestFluteSwapPrice()).to.equal(
            parseEther("0.133333333333333333")
          );
        });

        describe("max supply", () => {
          it("Oops! all lutes", async () => {
            expect(await contracts.lutiswap.fluteSwapPrice(24998, 2)).to.equal(
              parseEther("2499.8")
            );
          });

          it("23,900 lutes", async () => {
            expect(
              await contracts.lutiswap.fluteSwapPrice(23900, 100)
            ).to.equal(parseEther("24.141414141414141414"));
          });

          it("24,000 lutes", async () => {
            expect(
              await contracts.lutiswap.fluteSwapPrice(24000, 1000)
            ).to.equal(parseEther("2.402402402402402402"));
          });

          it("22,500 lutes", async () => {
            expect(
              await contracts.lutiswap.fluteSwapPrice(22500, 2500)
            ).to.equal(parseEther("0.900360144057623049"));
          });

          it("20,000 lutes", async () => {
            expect(
              await contracts.lutiswap.fluteSwapPrice(20000, 5000)
            ).to.equal(parseEther("0.400080016003200640"));
          });

          it("18,000 lutes", async () => {
            expect(
              await contracts.lutiswap.fluteSwapPrice(18000, 7000)
            ).to.equal(parseEther("0.257179597085297899"));
          });

          it("16,000 lutes", async () => {
            expect(
              await contracts.lutiswap.fluteSwapPrice(16000, 9000)
            ).to.equal(parseEther("0.177797533059228803"));
          });

          it("14,000 lutes", async () => {
            expect(
              await contracts.lutiswap.fluteSwapPrice(14000, 11000)
            ).to.equal(parseEther("0.127284298572597508"));
          });

          it("Equal supply", async () => {
            expect(
              await contracts.lutiswap.fluteSwapPrice(12500, 12500)
            ).to.equal(parseEther("0.100008000640051204"));
          });

          it("10,000 lutes", async () => {
            expect(
              await contracts.lutiswap.fluteSwapPrice(10000, 15000)
            ).to.equal(parseEther("0.066671111407427161"));
          });

          it("5,000 lutes", async () => {
            expect(
              await contracts.lutiswap.fluteSwapPrice(5000, 20000)
            ).to.equal(parseEther("0.025001250062503125"));
          });

          it("2,500 lutes", async () => {
            expect(
              await contracts.lutiswap.fluteSwapPrice(2500, 22500)
            ).to.equal(parseEther("0.011111604960220454"));
          });

          it("1,000 lutes", async () => {
            expect(
              await contracts.lutiswap.fluteSwapPrice(1000, 24000)
            ).to.equal(parseEther("0.004166840285011875"));
          });

          it("100 lutes", async () => {
            expect(
              await contracts.lutiswap.fluteSwapPrice(100, 24900)
            ).to.equal(parseEther("0.000401622555122695"));
          });

          it("Oops! all flutes", async () => {
            expect(await contracts.lutiswap.fluteSwapPrice(2, 24998)).to.equal(
              parseEther("0.000008000960115213")
            );
          });
        });
      });

      describe("less than max supply", () => {
        it("Oops! all lutes", async () => {
          expect(await contracts.lutiswap.fluteSwapPrice(2000, 2)).to.equal(
            parseEther("200.000000000000000000")
          );
        });

        it("Oops! all flutes", async () => {
          expect(await contracts.lutiswap.fluteSwapPrice(2, 2000)).to.equal(
            parseEther("0.000100050025012506")
          );
        });

        it("Equal supply", async () => {
          expect(await contracts.lutiswap.fluteSwapPrice(1000, 1000)).to.equal(
            parseEther("0.100100100100100100")
          );
        });

        it("10000 lutes, 2000 flutes", async () => {
          expect(await contracts.lutiswap.fluteSwapPrice(10000, 2000)).to.equal(
            parseEther("0.500250125062531265")
          );
        });

        it("5000 lutes, 2000 flutes", async () => {
          expect(await contracts.lutiswap.fluteSwapPrice(5000, 2000)).to.equal(
            parseEther("0.250125062531265632")
          );
        });

        it("30 lutes, 100 flutes", async () => {
          expect(await contracts.lutiswap.fluteSwapPrice(30, 100)).to.equal(
            parseEther("0.030303030303030303")
          );
        });

        it("10347 lutes, 11003 flutes", async () => {
          expect(
            await contracts.lutiswap.fluteSwapPrice(10347, 11003)
          ).to.equal(parseEther("0.094046536993273950"));
        });
      });
    });
  });
});
