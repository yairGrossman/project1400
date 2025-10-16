import React from "react";
import styles from "./Header.module.css";
import rankReachLogo from "../../assets/rank_reach_logo.png";

export default function Header() {
  return (
    <header className={styles.header}>
      <img src={rankReachLogo} alt="Rank Reach Logo" className={styles.logo} />
      <h1 className={styles.title}>Rank Reach</h1>
    </header>
  );
}
