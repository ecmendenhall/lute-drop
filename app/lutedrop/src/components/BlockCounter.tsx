import { useBlockNumber } from "@usedapp/core";

const BlockCounter = () => {
  const blockNumber = useBlockNumber();

  return (
    <div className="fixed bottom-2 left-2 mb-0 z-50 font-body text-xs text-gray-500">
      Block: {blockNumber}
    </div>
  );
};

export default BlockCounter;
