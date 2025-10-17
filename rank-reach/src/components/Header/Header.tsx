import React from "react";
import styles from "./Header.module.css";
import iafLogo from "../../assets/rank_reach_logo.png";
import Hamburger from "../UI/Hamburger/Hamburger";
import type { MenuItem } from "../UI/Hamburger/Hamburger";
import type { ViewKey } from "../../types/requests";

interface Props {
  onMenuSelect?: (id: ViewKey) => void;
}

const defaultItems: MenuItem[] = [
  { id: "unanswered", label: "בקשות שלא נענו" },
  { id: "approved", label: "בקשות שאושרו" },
  { id: "rejected", label: "בקשות שלא אושרו" },
];

export default function Header({ onMenuSelect }: Props) {
  return (
    <header className={styles.header}>
      <div className={styles.leftGroup}>
        <img src={iafLogo} alt="IAF Logo" className={styles.logo} />
        <h1 className={styles.title}>Rank Reach</h1>
      </div>

      <div className={styles.rightGroup}>
        <Hamburger items={defaultItems} onSelect={(id) => onMenuSelect?.(id)} />
      </div>
    </header>
  );
}
