import { ChainId, shortenAddress, useEthers, useLookupAddress } from "@usedapp/core";
import { useCallback, useEffect, useState } from "react";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

const Connect = () => {
  const { account, activate, deactivate } = useEthers();
  const ens = useLookupAddress();
  const [activateError, setActivateError] = useState("");
  const { error } = useEthers();

  useEffect(() => {
    if (error) {
      setActivateError(error.message);
    }
  }, [error]);

  const activateProvider = async () => {
    const providerOptions = {
      injected: {
        display: {
          name: "Metamask",
          description: "Connect with the provider in your browser",
        },
        package: null,
      },
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          bridge: "https://bridge.walletconnect.org",
          rpc: {
            [ChainId.Polygon]: "https://polygon-rpc.com/"
          }
        },
      },
    };

    const web3Modal = new Web3Modal({
      providerOptions,
    });
    try {
      const provider = await web3Modal.connect();
      await activate(provider);
      setActivateError("");
    } catch (error: any) {
      console.log(error);
      setActivateError(error.message);
    }
  };

  return (
    <div>
      <div className="md:fixed md:top-12 md:right-12 md:mb-0 md:z-50 mb-8 text-center">
        {account ? (
          <>
            <span className="font-body text-xl px-4 py-2 bg-yellow-50 text-gray-800 hover:bg-yellow-400 rounded-md shadow mr-4">
              {ens ?? shortenAddress(account)}
            </span>
            <button
              className="font-body text-xl px-4 py-2 bg-yellow-200 text-gray-800 hover:bg-yellow-400 rounded-md shadow"
              onClick={() => deactivate()}
            >
              Disconnect
            </button>
          </>
        ) : (
          <button
            className="font-body text-xl px-4 py-2 bg-yellow-200 text-gray-800 hover:bg-yellow-400 rounded-md shadow"
            onClick={activateProvider}
          >
            Connect
          </button>
        )}
      </div>
    </div>
  );
};

export default Connect;
