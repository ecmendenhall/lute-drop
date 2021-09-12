import { shortenAddress, useEthers } from "@usedapp/core";
import { useCallback } from "react";

const Connect = () => {
  const { activateBrowserWallet, account } = useEthers();

  const activateWallet = useCallback(() => {
    activateBrowserWallet();
  }, [activateBrowserWallet]);

  return (
    <div className="md:fixed md:top-12 md:right-12 md:mb-0 md:z-50 mb-8 text-center">
      <button
        className="font-body text-xl px-4 py-2 bg-yellow-200 text-gray-800 hover:bg-yellow-400 rounded-md shadow"
        onClick={activateWallet}
      >
        {account ? shortenAddress(account) : "Connect"}
      </button>
    </div>
  );
};

export default Connect;
