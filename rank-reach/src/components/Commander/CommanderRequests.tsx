import React, { useState } from "react";
import styles from "./CommanderRequests.module.css";
import Card from "../UI/Card/Card";
import Modal from "../UI/Modal/Modal";
import type { ViewKey } from "../../types/requests";

/* ---- Types ---- */
type CategoryKey = "חופל" | "תש" | "רופא" | "בקשת יציאה";

export interface SoldierRequestRow {
  id: string;
  name: string; // soldier name
  personalNumber: string; // מספר אישי
  notes: string; // הערות
  category: CategoryKey;
}

/* ---- Demo data (unanswered) ---- */
const demoUnanswered: SoldierRequestRow[] = [
  {
    id: "s1",
    name: "יאיר גרוסמן",
    personalNumber: "1234567",
    notes: "כאבי ראש חוזרים.",
    category: "רופא",
  },
  {
    id: "s2",
    name: "דני לוי",
    personalNumber: "2345678",
    notes: "בדיקת המשך.",
    category: "חופל",
  },
  {
    id: "s3",
    name: "נועם כהן",
    personalNumber: "3456789",
    notes: "תשאול לאחר תורנות.",
    category: "תש",
  },
  {
    id: "s4",
    name: "אור בן חור",
    personalNumber: "4567890",
    notes: "בקשה לחופשה בשישי.",
    category: "בקשת יציאה",
  },
  {
    id: "s5",
    name: "אורי גבע",
    personalNumber: "5678901",
    notes: "בדיקת חופל ראשונית.",
    category: "חופל",
  },
];

/* Optionally you can prepare demo for approved / rejected as well */
const demoApproved: SoldierRequestRow[] = [
  {
    id: "a1",
    name: "אלעד שלו",
    personalNumber: "1122334",
    notes: "רופא - תיאום נקבע.",
    category: "רופא",
  },
  {
    id: "a2",
    name: "גל מזרחי",
    personalNumber: "2233445",
    notes: "תש - שיחה קצרה.",
    category: "תש",
  },
];

const demoRejected: SoldierRequestRow[] = [
  {
    id: "r1",
    name: "עדן ברק",
    personalNumber: "9988776",
    notes: 'בקשת יציאה נדחתה: מחסור בכ"א.',
    category: "בקשת יציאה",
  },
];

/* ---- Titles ---- */
const titles: Record<ViewKey, string> = {
  unanswered: "בקשות שלא נענו",
  approved: "בקשות שאושרו",
  rejected: "בקשות שלא אושרו",
};

interface Props {
  view: ViewKey; // controlled from App (like Type 1)
}

export default function CommanderRequests({ view }: Props) {
  const [selected, setSelected] = useState<SoldierRequestRow | null>(null);
  const [approvedMode, setApprovedMode] = useState(false); // after pressing "אישור"
  const [dateTime, setDateTime] = useState<string>("");
  const [location, setLocation] = useState<string>("");

  // choose dataset by view (demo)
  const rows =
    view === "unanswered"
      ? demoUnanswered
      : view === "approved"
      ? demoApproved
      : demoRejected;

  // split by category to render four cards
  const byCategory: Record<CategoryKey, SoldierRequestRow[]> = {
    חופל: rows.filter((r) => r.category === "חופל"),
    תש: rows.filter((r) => r.category === "תש"),
    רופא: rows.filter((r) => r.category === "רופא"),
    "בקשת יציאה": rows.filter((r) => r.category === "בקשת יציאה"),
  };

  const openRow = (row: SoldierRequestRow) => {
    setSelected(row);
    setApprovedMode(false);
    setDateTime("");
    setLocation("");
  };
  const closeModal = () => {
    setSelected(null);
    setApprovedMode(false);
    setDateTime("");
    setLocation("");
  };

  const onApprove = () => {
    setApprovedMode(true); // show date/location + "שלח לחייל"
  };
  const onReject = () => {
    // demo: just log and close (you can wire to API)
    console.log("Rejected:", selected);
    closeModal();
  };
  const onSendToSoldier = () => {
    console.log("Send to soldier:", {
      selected,
      dateTime,
      location,
    });
    closeModal();
  };

  return (
    <section className={styles.wrapper} dir="rtl">
      <h2 className={styles.pageTitle}>{titles[view]}</h2>

      <div className={styles.grid}>
        {(["חופל", "תש", "רופא", "בקשת יציאה"] as CategoryKey[]).map((cat) => (
          <Card key={cat} title={cat}>
            <ul className={styles.list} role="list">
              {byCategory[cat].length > 0 ? (
                byCategory[cat].map((row) => (
                  <li key={row.id} className={styles.item} role="listitem">
                    <button
                      type="button"
                      className={styles.itemBtn}
                      onClick={() => openRow(row)}
                    >
                      {row.name}
                    </button>
                  </li>
                ))
              ) : (
                <li className={styles.empty}>—</li>
              )}
            </ul>
          </Card>
        ))}
      </div>

      {/* Popup */}
      <Modal
        open={!!selected}
        title={selected ? `${selected.category} — ${selected.name}` : undefined}
        onClose={closeModal}
      >
        {selected && (
          <div className={styles.modalBody} dir="rtl">
            <div className={styles.row}>
              <span className={styles.label}>שם:</span>
              <span className={styles.value}>{selected.name}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>מספר אישי:</span>
              <span className={styles.value}>{selected.personalNumber}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>הערות:</span>
              <span className={styles.value}>{selected.notes || "—"}</span>
            </div>

            {!approvedMode && (
              <div className={styles.actions}>
                <button
                  type="button"
                  className={styles.approve}
                  onClick={onApprove}
                >
                  אישור
                </button>
                <button
                  type="button"
                  className={styles.reject}
                  onClick={onReject}
                >
                  דחייה
                </button>
              </div>
            )}

            {approvedMode && (
              <>
                <div className={styles.row}>
                  <label htmlFor="dt" className={styles.label}>
                    תאריך:
                  </label>
                  <input
                    id="dt"
                    type="datetime-local"
                    className={styles.input}
                    value={dateTime}
                    onChange={(e) => setDateTime(e.target.value)}
                  />
                </div>
                <div className={styles.row}>
                  <label htmlFor="loc" className={styles.label}>
                    מיקום:
                  </label>
                  <input
                    id="loc"
                    type="text"
                    className={styles.input}
                    placeholder="הכנס מיקום"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>

                <div className={styles.actions}>
                  <button
                    type="button"
                    className={styles.send}
                    onClick={onSendToSoldier}
                  >
                    שלח לחייל
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </Modal>
    </section>
  );
}
