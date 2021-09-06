import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChainId, Config, DAppProvider, MULTICALL_ADDRESSES } from '@usedapp/core';

const config: Config = {
  readOnlyChainId: ChainId.Mainnet,
  readOnlyUrls: {
    [ChainId.Hardhat]: "http://localhost:8545",
  },
  multicallAddresses: {
    [ChainId.Hardhat]: "0x7bc06c482DEAd17c0e297aFbC32f6e63d3846650",
    ...MULTICALL_ADDRESSES,
  }
}

ReactDOM.render(
  <React.StrictMode>
        <DAppProvider config={config}>
    <App />
    </DAppProvider>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
