import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { SoldierProvider } from "./context/soldier/SoldierProvider";
import { SoldierRequestsProvider } from "./context/soldierRequests/SoldierRequestsProvider";
import "./styles/variables.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SoldierProvider>
      <SoldierRequestsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SoldierRequestsProvider>
    </SoldierProvider>
  </React.StrictMode>
);
