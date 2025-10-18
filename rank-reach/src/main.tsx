import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { SoldierProvider } from "./context/soldier/SoldierProvider";
import { SoldierRequestsProvider } from "./context/soldierRequests/SoldierRequestsProvider";
import "./styles/variables.css";
import { CommanderRequestsProvider } from "./context/commanderRequests/CommanderRequestsProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SoldierProvider>
      <SoldierRequestsProvider>
        <CommanderRequestsProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CommanderRequestsProvider>
      </SoldierRequestsProvider>
    </SoldierProvider>
  </React.StrictMode>
);
