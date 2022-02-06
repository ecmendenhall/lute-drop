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
                  <a href="https://github.com/ecmendenhall/lute-drop">Github</a>
                </li>
                <li>
                  <a href="https://alpha.guild.xyz/lute-drop">Guild</a>
                </li>
                <li>
                  <a href="https://discord.gg/NmRgHGHvtN">Discord</a>
                </li>
              </ul>
            </div>
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
          <div className="md:w-1/3 mb-4">
            <h4 className="font-black font-display text-2xl mb-2">
              How it works:
            </h4>
            <p className="mb-4">
              When a Lute Drop is active, you may craft a Lute or Flute, while
              supplies last. Each Lute Drop has a limited number of craftable
              items, and a limit per wallet address.
            </p>
            <p className="mb-4">
              You may swap your Lute for a Flute (and vice versa) at any time
              using Lutiswap. Your token will be swapped in exchange for a token
              from the Lutiswap pool.
            </p>
            <p className="mb-4">
              The swap fee is a function of the total supply of each item. When
              one item is plentiful, swapping it for the other will be cheap.
            </p>
          </div>
        </div>
      </div>
    </FullPage>
  );
};

export default About;
