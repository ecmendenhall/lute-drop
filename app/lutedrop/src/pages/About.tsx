import { useEthers, useTokenBalance } from "@usedapp/core";
import Contracts from "../components/Contracts";
import Stats from "../components/Stats";
import { getConfig } from "../config/contracts";
import { useItemSupply, useSwaps, useTotalCrafted } from "../hooks/contracts";
import FullPage from "../layouts/FullPage";

const About = () => {
  const { chainId } = useEthers();
  const config = getConfig(chainId);

  const luteSupply = useItemSupply("lute");
  const fluteSupply = useItemSupply("flute");
  const lutiswapLuteBalance = useTokenBalance(
    config.lute.address,
    config.lutiswap.address
  );
  const lutiswapFluteBalance = useTokenBalance(
    config.flute.address,
    config.lutiswap.address
  );
  const { lutesCrafted, flutesCrafted } = useTotalCrafted([]);
  const swaps = useSwaps([]);

  return (
    <FullPage
      subhed={
        <span>
          I hear that every drop that you mint is more relevant than{" "}
          <em>every drop that I mint.</em>
        </span>
      }
    >
      <div className="font-body text-xl">
        <div className="flex flex-col md:flex-row justify-evenly">
          <div>
            <Contracts />
            <div className="mb-4">
              <h4 className="font-black font-display text-2xl">Links:</h4>
              <ul className="mb-4">
                <li>
                  <a
                    className="underline text-yellow-700"
                    href="https://github.com/ecmendenhall/lute-drop"
                  >
                    Github
                  </a>
                </li>
                <li>
                  <a
                    className="underline text-yellow-700"
                    href="https://alpha.guild.xyz/lute-drop"
                  >
                    Guild
                  </a>
                </li>
                <li>
                  <a
                    className="underline text-yellow-700"
                    href="https://discord.gg/NmRgHGHvtN"
                  >
                    Discord
                  </a>
                </li>
              </ul>
            </div>
            <div className="mb-4">
              <h4 className="font-black font-display text-2xl">Credits:</h4>
              <ul className="mb-4">
                <li>
                  <a
                    className="underline text-yellow-700"
                    href="https://en.wikipedia.org/wiki/Cantigas_de_Santa_Maria"
                  >
                    Cantigas de Santa Maria
                  </a>
                </li>
                <li>
                  <a
                    className="underline text-yellow-700"
                    href="https://en.wikipedia.org/wiki/Codex_Manesse"
                  >
                    Codex Manesse
                  </a>
                </li>
                <li>
                  Created by{" "}
                  <a
                    className="underline text-yellow-700"
                    href="https://twitter.com/eth_call"
                  >
                    @eth_call
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="md:w-1/3 mb-4">
            <h4 className="font-black font-display text-2xl mb-2">
              How it works:
            </h4>
            <p className="mb-4">
              When a Lute Drop is active, you may craft a Lute or Flute, while
              supplies last. Lutes and Flutes are ERC721 tokens.
            </p>
            <p className="mb-4">
              Each Lute Drop has a limited number of total craftable items, and
              a limit per wallet address.
            </p>
            <p className="mb-4">
              You may swap your Lute for a Flute (and vice versa) at any time
              using Lutiswap. Your token will be swapped in exchange for a token
              from the Lutiswap pool.
            </p>
            <p className="mb-4">
              The swap fee is a function of the total circulating supply of each
              item. When one item is plentiful, swapping it for the other will
              be cheap.
            </p>
            <p className="mb-4">
              If you have a Lute or Flute, you may join the "Lute Gang" or
              "Flute Crew" on Guild and in the Lute Drop Discord.
            </p>
            <p className="mb-4">
              Lute Drop is experimental, unaudited, and provided as is without
              warranty of any kind.
            </p>
          </div>
          <Stats
            {...{
              luteSupply,
              fluteSupply,
              lutesCrafted,
              flutesCrafted,
              lutiswapLuteBalance,
              lutiswapFluteBalance,
              swaps,
            }}
          />
        </div>
      </div>
    </FullPage>
  );
};

export default About;
