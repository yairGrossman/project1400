import React, { useState } from "react";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import SoldierRequests from "./components/Soldier/SoldierRequests";
import CommanderRequests from "./components/Commander/CommanderRequests";
import styles from "./App.module.css";
import type { ViewKey } from "./components/types/requests";

export default function App() {
  const [view, setView] = useState<ViewKey>("unanswered");
  return (
    <>
      <Header onMenuSelect={setView} />
      <main className={styles.main}>
        {/*<Login />*/}
        {/*<SoldierRequests view={view} />*/}
        <CommanderRequests view={view} />
      </main>
    </>
  );
}
