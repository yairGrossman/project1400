import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import iafLogo from "../../assets/rank_reach_logo.png";
import Hamburger from "../UI/Hamburger/Hamburger";
import type { MenuItem } from "../UI/Hamburger/Hamburger";
import type { ViewKey } from "../../types/requests";
import { useSoldier } from "../../context/soldier/useSoldier";

interface Props {
  onMenuSelect?: (id: ViewKey) => void;
}

export default function Header({ onMenuSelect }: Props) {
  const location = useLocation();
  const navigate = useNavigate();
  const isRoot = location.pathname === "/";
  const { soldier } = useSoldier();

  const items: MenuItem[] = [
    { id: "unanswered", label: "בקשות שלא נענו" },
    { id: "approved", label: "בקשות שאושרו" },
    { id: "rejected", label: "בקשות שלא אושרו" },
  ];

  if (soldier?.soldierType === 1) {
    items.push({ id: "weekly-feedback", label: "סקר שבועי" });
  } else if (soldier?.soldierType === 3) {
    items.length = 0;
  }

  const handleSelect = (id: string) => {
    if (
      location.pathname === "/soldier/weekly-feedback" &&
      id !== "weekly-feedback"
    ) {
      navigate("/soldier");
    }

    if (id === "weekly-feedback") {
      navigate("/soldier/weekly-feedback");
      return;
    }

    if (id === "unanswered" || id === "approved" || id === "rejected") {
      onMenuSelect?.(id as ViewKey);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.leftGroup}>
        <img src={iafLogo} alt="IAF Logo" className={styles.logo} />
        <h1 className={styles.title}>Rank Reach</h1>
      </div>

      {!isRoot && (
        <div className={styles.rightGroup}>
          <Hamburger items={items} onSelect={handleSelect} />
        </div>
      )}
    </header>
  );
}
