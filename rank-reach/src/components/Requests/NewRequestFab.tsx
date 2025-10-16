import React, { useState } from "react";
import type { FormEvent } from "react";
import styles from "./NewRequestFab.module.css";
import Modal from "../UI/Modal/Modal";

type RequestType = "חופל" | "תש" | "רופא" | "בקשת יציאה";

const REQUEST_TYPES: RequestType[] = ["חופל", "תש", "רופא", "בקשת יציאה"];

export default function NewRequestFab() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState<RequestType | null>(null);
  const [notes, setNotes] = useState("");

  const toggleMenu = () => setMenuOpen((v) => !v);

  const chooseType = (type: RequestType) => {
    setSelected(type);
    setMenuOpen(false);
  };

  const closeModal = () => {
    setSelected(null);
    setNotes("");
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: send to API
    console.log("Submit request:", { type: selected, notes });
    closeModal();
  };

  return (
    <>
      <div className={styles.container}>
        {/* Sliding list */}
        <div
          className={`${styles.menu} ${menuOpen ? styles.open : ""}`}
          dir="rtl"
          aria-hidden={!menuOpen}
        >
          {REQUEST_TYPES.map((t) => (
            <button
              key={t}
              type="button"
              className={styles.menuItem}
              onClick={() => chooseType(t)}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Floating + button with hover tooltip */}
        <button
          type="button"
          className={styles.fab}
          aria-label="בקשה חדשה"
          onClick={toggleMenu}
        >
          <span className={styles.plus}>+</span>
          <span className={styles.tooltip}>בקשה חדשה</span>
        </button>
      </div>

      {/* Popup form */}
      <Modal
        open={!!selected}
        title={selected ?? undefined}
        onClose={closeModal}
      >
        <form className={styles.form} dir="rtl" onSubmit={submit}>
          <div className={styles.formRow}>
            <label htmlFor="notes" className={styles.label}>
              הערות
            </label>
            <textarea
              id="notes"
              className={styles.textarea}
              placeholder="כתוב כאן הערות..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
            />
          </div>

          <div className={styles.actions}>
            <button type="submit" className={styles.submit}>
              הגש בקשה
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
