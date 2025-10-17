import React, { useState, useRef, useEffect } from "react";
import styles from "./Hamburger.module.css";
import type { ViewKey } from "../../../types/requests";

export interface MenuItem {
  id: ViewKey;
  label: string;
}

interface Props {
  items: MenuItem[];
  onSelect: (id: ViewKey) => void;
  ariaLabel?: string;
}

export default function Hamburger({
  items,
  onSelect,
  ariaLabel = "תפריט",
}: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const handleSelect = (id: ViewKey) => {
    onSelect(id);
    setOpen(false);
  };

  return (
    <div className={styles.root} ref={ref} dir="rtl">
      <button
        type="button"
        className={styles.button}
        aria-label={ariaLabel}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={styles.bar} />
        <span className={styles.bar} />
        <span className={styles.bar} />
      </button>

      <div className={`${styles.menu} ${open ? styles.open : ""}`} role="menu">
        {items.map((mi) => (
          <button
            key={mi.id}
            type="button"
            className={styles.item}
            role="menuitem"
            onClick={() => handleSelect(mi.id)}
          >
            {mi.label}
          </button>
        ))}
      </div>
    </div>
  );
}
