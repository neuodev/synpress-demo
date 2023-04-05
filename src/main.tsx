import React from "react";
import ReactDOM from "react-dom/client";
import App, { client } from "./App";
import "./index.css";
import { WagmiConfig } from "wagmi";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <WagmiConfig client={client}>
      <App />
    </WagmiConfig>
  </React.StrictMode>
);
