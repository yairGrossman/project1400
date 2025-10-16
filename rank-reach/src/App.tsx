import React from "react";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import SoldierRequests from "./components/Soldier/SoldierRequests";
import styles from "./App.module.css";

export default function App() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        {/*<Login />*/}
        <SoldierRequests />
      </main>
    </>
  );
}
