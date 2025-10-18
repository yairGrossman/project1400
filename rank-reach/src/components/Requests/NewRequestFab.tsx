import { useState } from "react";
import type { FormEvent } from "react";
import styles from "./NewRequestFab.module.css";
import Modal from "../UI/Modal/Modal";
import { useSoldier } from "../../context/soldier/useSoldier";
import { useSoldierRequests } from "../../context/soldierRequests/useSoldierRequests";
import { createSoldierRequest } from "../../api/soldierRequestsApi";

type RequestType = "חופל" | "תש" | "רופא" | "בקשת יציאה";

const REQUEST_TYPES: RequestType[] = ["חופל", "תש", "רופא", "בקשת יציאה"];

const REQUEST_ID_BY_NAME: Record<RequestType, number> = {
  חופל: 1,
  תש: 2,
  רופא: 3,
  "בקשת יציאה": 4,
};

const STATUS_UNANSWERED = 0;

export default function NewRequestFab() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState<RequestType | null>(null);
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { soldier } = useSoldier();
  const { fetchBySoldier } = useSoldierRequests();

  const toggleMenu = () => setMenuOpen((v) => !v);

  const chooseType = (type: RequestType) => {
    setSelected(type);
    setMenuOpen(false);
    setError(null);
  };

  const closeModal = () => {
    setSelected(null);
    setNotes("");
    setError(null);
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!soldier || !selected) return;

    setSubmitting(true);
    setError(null);

    try {
      const payload = {
        soldierId: soldier.soldierId,
        requestId: REQUEST_ID_BY_NAME[selected],
        comment: notes || undefined,
      };

      const result = await createSoldierRequest(payload);

      if (result.ok) {
        await fetchBySoldier(soldier.soldierId, STATUS_UNANSWERED);
        closeModal();
      } else {
        setError("השליחה נכשלה");
      }
    } catch (err: any) {
      setError(err?.message ?? "שגיאה בשליחת הבקשה");
    } finally {
      setSubmitting(false);
    }
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

          {error && (
            <div style={{ color: "crimson", marginBottom: 8 }}>{error}</div>
          )}

          <div className={styles.actions}>
            <button
              type="submit"
              className={styles.submit}
              disabled={submitting || !soldier}
            >
              {submitting ? "שולח..." : "הגש בקשה"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
