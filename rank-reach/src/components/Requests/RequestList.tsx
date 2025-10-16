import React, { useState } from "react";
import styles from "./RequestList.module.css";
import RequestItem from "./RequestItem";
import Modal from "../UI/Modal/Modal";

export type Request = {
  id: string;
  name: string;
  notes: string;
  date?: string; // only for approved
  location?: string; // only for approved
};

interface Props {
  items: Request[];
  variant: "unanswered" | "approved" | "rejected";
}

export default function RequestList({ items, variant }: Props) {
  const [selected, setSelected] = useState<Request | null>(null);

  const open = (req: Request) => setSelected(req);
  const close = () => setSelected(null);

  return (
    <>
      <div className={styles.list} role="list">
        {items.map((req) => (
          <RequestItem key={req.id} request={req} onOpen={open} />
        ))}
      </div>

      <Modal open={!!selected} title={selected?.name} onClose={close}>
        <div className={styles.modalContent} dir="rtl">
          <div className={styles.row}>
            <span className={styles.label}>שם הבקשה:</span>
            <span className={styles.value}>{selected?.name}</span>
          </div>

          {/* notes always */}
          <div className={styles.row}>
            <span className={styles.label}>הערות:</span>
            <span className={styles.value}>{selected?.notes || "—"}</span>
          </div>

          {/* extra fields only for approved */}
          {variant === "approved" && (
            <>
              <div className={styles.row}>
                <span className={styles.label}>תאריך:</span>
                <span className={styles.value}>{selected?.date || "—"}</span>
              </div>
              <div className={styles.row}>
                <span className={styles.label}>מיקום:</span>
                <span className={styles.value}>
                  {selected?.location || "—"}
                </span>
              </div>
            </>
          )}
        </div>
      </Modal>
    </>
  );
}
