import { useState } from "react";
import reactLogo from "./assets/react.svg";
import SynpressLogo from "/synpress.png";
import CypressLogo from "/cypress.svg";
import "./App.css";
import {
  WagmiConfig,
  createClient,
  configureChains,
  useConnect,
  useAccount,
  useDisconnect,
} from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { publicProvider } from "wagmi/providers/public";
import { mainnet, optimism } from "wagmi/chains";

const chains = [mainnet, optimism];
const { provider } = configureChains(chains, [publicProvider()]);

const metamaskConnector = new MetaMaskConnector({
  chains,
  options: {
    shimDisconnect: true,
  },
});

export const client = createClient({
  autoConnect: true,
  connectors: [metamaskConnector],
  provider,
});

function App() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: metamaskConnector,
  });
  const { disconnect } = useDisconnect();

  return (
    <div className="App">
      <div>
        <a href="https://www.cypress.io/" target="_blank">
          <img src={CypressLogo} className="logo" alt="Synpress logo" />
        </a>
        <a href="https://github.com/Synthetixio/synpress" target="_blank">
          <img src={SynpressLogo} className="logo" alt="Synpress logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Synpress + Cypress + React</h1>
      <div className="card">
        {isConnected ? (
          <button onClick={() => disconnect()}>Disconnect</button>
        ) : (
          <button onClick={() => connect()}>Connect</button>
        )}
        <p id="address">Address: {address || "??"}</p>
        <p id="connected">Connected: {isConnected ? "YES" : "NO"}</p>
        <p>
          Edit <code>cypress/e2e/example.cy.ts</code> and save
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Synpress and Cypress logos to learn more
      </p>
    </div>
  );
}

export default App;
