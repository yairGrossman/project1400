import React, { useState } from "react";
import styles from "./RequestList.module.css";
import RequestItem from "./RequestItem";
import Modal from "../UI/Modal/Modal";

export type Request = {
  id: string;
  name: string;
  notes: string;
};

const demoRequests: Request[] = [
  { id: "1", name: "חופל", notes: "בדיקה רפואית בסיסית." },
  { id: "2", name: "תש", notes: "תשאול/תחקיר קצר מול המפקד." },
  { id: "3", name: "רופא", notes: "פגישה עם רופא היחידה." },
  { id: "4", name: "בקשת יציאה", notes: "בקשה ליציאה מוקדמת/חופשה." },
  { id: "5", name: "חופל", notes: "מועד שני לבדיקה." },
  { id: "6", name: "רופא", notes: "בדיקת המשך." },
  { id: "7", name: "תש", notes: "עידכון נתונים." },
];

export default function RequestList() {
  const [selected, setSelected] = useState<Request | null>(null);

  const open = (req: Request) => setSelected(req);
  const close = () => setSelected(null);

  return (
    <>
      <div className={styles.list} role="list">
        {demoRequests.map((req) => (
          <RequestItem key={req.id} request={req} onOpen={open} />
        ))}
      </div>

      <Modal open={!!selected} title={selected?.name} onClose={close}>
        <div className={styles.modalContent} dir="rtl">
          <div className={styles.row}>
            <span className={styles.label}>שם הבקשה:</span>
            <span className={styles.value}>{selected?.name}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>הערות:</span>
            <span className={styles.value}>{selected?.notes || "—"}</span>
          </div>
        </div>
      </Modal>
    </>
  );
}
