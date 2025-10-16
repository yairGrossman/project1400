import React, { useEffect, useRef, useState } from "react";
import styles from "./Hamburger.module.css";

export interface HamburgerItem<T extends string = string> {
  id: T;
  label: string;
}

interface Props<T extends string = string> {
  items: HamburgerItem<T>[];
  activeId?: T;
  onSelect: (id: T) => void;
  className?: string;
}

export default function Hamburger<T extends string = string>({
  items,
  activeId,
  onSelect,
  className = "",
}: Props<T>) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  return (
    <div ref={ref} className={`${styles.container} ${className}`} dir="rtl">
      <button
        type="button"
        className={styles.hamburger}
        aria-label="תפריט"
        aria-expanded={open}
        onClick={() => setOpen((x) => !x)}
      >
        <span className={styles.bar} />
        <span className={styles.bar} />
        <span className={styles.bar} />
      </button>

      <div className={`${styles.menu} ${open ? styles.open : ""}`} role="menu">
        {items.map((it) => (
          <button
            key={it.id}
            className={`${styles.item} ${
              activeId === it.id ? styles.active : ""
            }`}
            role="menuitem"
            onClick={() => {
              onSelect(it.id);
              setOpen(false);
            }}
          >
            {it.label}
          </button>
        ))}
      </div>
    </div>
  );
}
