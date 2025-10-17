import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SoldierProvider } from "./context/SoldierProvider";
import { BrowserRouter } from "react-router-dom";
import "./styles/variables.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SoldierProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SoldierProvider>
  </React.StrictMode>
);
