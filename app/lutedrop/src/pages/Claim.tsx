import { useEthers } from "@usedapp/core";
import FullPage from "../layouts/FullPage";
import { getConfig } from "../config/contracts";

const Claim = () => {
  const { chainId, account } = useEthers();
  const config = getConfig(chainId);

  return (
    <FullPage
      subhed="I hear that you and your bard have sold your lutes and bought
    flutes..."
    >
      <div className="font-body text-xl">
        <div className="flex flex-col md:flex-row items-center justify-evenly mb-8"></div>
      </div>
    </FullPage>
  );
};

export default Claim;
