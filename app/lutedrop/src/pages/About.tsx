import Contracts from "../components/Contracts";
import Stats from "../components/Stats";
import { useItemSupply } from "../hooks/contracts";
import FullPage from "../layouts/FullPage";

const About = () => {
  const luteSupply = useItemSupply("lute");
  const fluteSupply = useItemSupply("flute");

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
          <Contracts />
          <Stats {...{ luteSupply, fluteSupply }} />
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
