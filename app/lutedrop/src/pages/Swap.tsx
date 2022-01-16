import { useEthers } from "@usedapp/core";
import FullPage from "../layouts/FullPage";

const Swap = () => {
  const { account } = useEthers();

  return (
    <FullPage
      subhed="...I hear that you and your bard have sold your flutes and bought
    lutes."
    >
      <div className="font-body text-xl">
        <div className="flex flex-col md:flex-row items-center justify-evenly">
          <div className="my-2 mx-8 w-80">
            <img src="img/swap.png" alt="Swap Lutes for Flutes" />
          </div>
        </div>
      </div>
    </FullPage>
  );
};

export default Swap;
