import SwapPanel from "../components/SwapPanel";
import { roundEther } from "../helpers";
import { useItem, useLutiswap } from "../hooks/contracts";
import FullPage from "../layouts/FullPage";

const Swap = () => {
  const nextLute = useItem("lute", 669);
  const nextFlute = useItem("flute", 669);
  const { luteSwapFee, fluteSwapFee } = useLutiswap();

  return (
    <FullPage
      subhed="...I hear that you and your bard have sold your flutes and bought
    lutes."
    >
      <div>
        <div className="flex flex-col md:flex-row justify-center font-body text-xl">
          {nextLute && fluteSwapFee && (
            <SwapPanel
              itemName={nextLute.name}
              swapPrice={roundEther(fluteSwapFee)}
              imgSrc={nextLute.image}
              imgAlt="Lute"
              color="red"
              buttonText="Swap Flute for Lute"
            />
          )}
          <div className="my-2 mx-8 w-80">
            <img src="img/swap.png" alt="Swap Lutes for Flutes" />
          </div>
          {nextFlute && luteSwapFee && (
            <SwapPanel
              itemName={nextFlute.name}
              swapPrice={roundEther(luteSwapFee)}
              imgSrc={nextFlute.image}
              imgAlt="Flute"
              color="blue"
              buttonText="Swap Lute for Flute"
            />
          )}
        </div>
      </div>
    </FullPage>
  );
};

export default Swap;
