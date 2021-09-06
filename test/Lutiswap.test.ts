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


describe("Lutiswap", () => {
  beforeEach(async () => {
    contracts = await deploy();
    [owner, nonOwner, fluteHolder, luteHolder, fluteWhale, luteWhale] = await ethers.getSigners();

    await contracts.flute.connect(owner).craft(fluteHolder.address);
    await contracts.lute.connect(owner).craft(luteHolder.address);

    await contracts.flute.connect(owner).craft(fluteWhale.address);
    await contracts.flute.connect(owner).craft(fluteWhale.address);
    await contracts.flute.connect(owner).craft(fluteWhale.address);

    await contracts.lute.connect(owner).craft(luteWhale.address);
    await contracts.lute.connect(owner).craft(luteWhale.address);
    await contracts.lute.connect(owner).craft(luteWhale.address);

    contracts.lute.connect(owner).transferOwnership(contracts.lutiswap.address);
    contracts.flute
      .connect(owner)
      .transferOwnership(contracts.lutiswap.address);
  });

  describe("configuration", () => {
    it("stores the Lute contract", async () => {
      expect(await contracts.lutiswap.lute()).to.equal(contracts.lute.address);
    });

    it("stores the Flute contract", async () => {
      expect(await contracts.lutiswap.flute()).to.equal(contracts.flute.address);
    });
  });

  describe("swaps", () => {
    describe("flutes", () => {
      it("burns the swapped flute", async () => {
        expect(await contracts.flute.balanceOf(fluteHolder.address)).to.equal(1);
        expect(await contracts.flute.ownerOf(0)).to.equal(fluteHolder.address);
        await contracts.lutiswap.connect(fluteHolder).swapExactFluteForLute(0);
        expect(await contracts.flute.balanceOf(fluteHolder.address)).to.equal(0);
      });

      it("mints a lute", async () => {
        expect(await contracts.lute.balanceOf(fluteHolder.address)).to.equal(0);
        await contracts.lutiswap.connect(fluteHolder).swapExactFluteForLute(0);
        expect(await contracts.lute.balanceOf(fluteHolder.address)).to.equal(1);
      });

      it("gets swap price", async () => {
        expect(await contracts.lutiswap.fluteSwapPrice(4, 4)).to.equal(parseEther("0.133333333333333333"));
      });
    })

    describe("swap price", () => {

      describe("flutes", () => {

        describe("max supply", () => {
          it("Oops! all lutes", async () => {
            expect(await contracts.lutiswap.fluteSwapPrice(24998, 2)).to.equal(parseEther("2499.8"));
          });

          it("23,900 lutes", async () => {
            expect(await contracts.lutiswap.fluteSwapPrice(23900, 100)).to.equal(parseEther("24.141414141414141414"));
          });

          it("24,000 lutes", async () => {
            expect(await contracts.lutiswap.fluteSwapPrice(24000, 1000)).to.equal(parseEther("2.402402402402402402"));
          });

          it("22,500 lutes", async () => {
            expect(await contracts.lutiswap.fluteSwapPrice(22500, 2500)).to.equal(parseEther("0.900360144057623049"));
          });

          it("20,000 lutes", async () => {
            expect(await contracts.lutiswap.fluteSwapPrice(20000, 5000)).to.equal(parseEther("0.400080016003200640"));
          });

          it("18,000 lutes", async () => {
            expect(await contracts.lutiswap.fluteSwapPrice(18000, 7000)).to.equal(parseEther("0.257179597085297899"));
          });

          it("16,000 lutes", async () => {
            expect(await contracts.lutiswap.fluteSwapPrice(16000, 9000)).to.equal(parseEther("0.177797533059228803"));
          });

          it("14,000 lutes", async () => {
            expect(await contracts.lutiswap.fluteSwapPrice(14000, 11000)).to.equal(parseEther("0.127284298572597508"));
          });

          it("Equal supply", async () => {
            expect(await contracts.lutiswap.fluteSwapPrice(12500, 12500)).to.equal(parseEther("0.100008000640051204"));
          });
  
          it("10,000 lutes", async () => {
            expect(await contracts.lutiswap.fluteSwapPrice(10000, 15000)).to.equal(parseEther("0.066671111407427161"));
          });
  
          it("5,000 lutes", async () => {
            expect(await contracts.lutiswap.fluteSwapPrice(5000, 20000)).to.equal(parseEther("0.025001250062503125"));
          });
  
          it("2,500 lutes", async () => {
            expect(await contracts.lutiswap.fluteSwapPrice(2500, 22500)).to.equal(parseEther("0.011111604960220454"));
          });
  
          it("1,000 lutes", async () => {
            expect(await contracts.lutiswap.fluteSwapPrice(1000, 24000)).to.equal(parseEther("0.004166840285011875"));
          });
  
          it("100 lutes", async () => {
            expect(await contracts.lutiswap.fluteSwapPrice(100, 24900)).to.equal(parseEther("0.000401622555122695"));
          });

          it("Oops! all flutes", async () => {
            expect(await contracts.lutiswap.fluteSwapPrice(2, 24998)).to.equal(parseEther("0.000008000960115213"));
          });
        });
      });

      describe("less than max supply", () => {
        it("Oops! all lutes", async () => {
          expect(await contracts.lutiswap.fluteSwapPrice(2000, 2)).to.equal(parseEther("200.000000000000000000"));
        });
  
        it("Oops! all flutes", async () => {
          expect(await contracts.lutiswap.fluteSwapPrice(2, 2000)).to.equal(parseEther("0.000100050025012506"));
        });
  
        it("Equal supply", async () => {
          expect(await contracts.lutiswap.fluteSwapPrice(1000, 1000)).to.equal(parseEther("0.100100100100100100"));
        });

        it("10000 lutes, 2000 flutes", async () => {
          expect(await contracts.lutiswap.fluteSwapPrice(10000, 2000)).to.equal(parseEther("0.500250125062531265"));
        });

        it("5000 lutes, 2000 flutes", async () => {
          expect(await contracts.lutiswap.fluteSwapPrice(5000, 2000)).to.equal(parseEther("0.250125062531265632"));
        });

        it("30 lutes, 100 flutes", async () => {
          expect(await contracts.lutiswap.fluteSwapPrice(30, 100)).to.equal(parseEther("0.030303030303030303"));
        });

        it("10347 lutes, 11003 flutes", async () => {
          expect(await contracts.lutiswap.fluteSwapPrice(10347, 11003)).to.equal(parseEther("0.094046536993273950"));
        });
      });
    });
  
  });
});
