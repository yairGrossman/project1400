import React, { useEffect, useMemo, useState } from "react";
import styles from "./CommanderRequests.module.css";
import Card from "../UI/Card/Card";
import Modal from "../UI/Modal/Modal";
import type { ViewKey } from "../../types/requests";
import { useSoldier } from "../../context/soldier/useSoldier";
import { updateSoldierRequest } from "../../api/soldierRequestsApi";
import { useCommanderRequests } from "../../context/commanderRequests/useCommanderRequests";
import { createAppointment } from "../../api/appointmentsApi";
import type { SoldierRequestRead } from "../../types/soldierRequest";

type CategoryKey = "חופל" | "תש" | "רופא" | "בקשת יציאה";

const titles: Record<ViewKey, string> = {
  unanswered: "בקשות שלא נענו",
  approved: "בקשות שאושרו",
  rejected: "בקשות שלא אושרו",
};

const statusMap: Record<ViewKey, 0 | 1 | 2> = {
  unanswered: 0,
  approved: 1,
  rejected: 2,
};

const fmt = (s?: string | null) => (s ? new Date(s).toLocaleString() : "—");

interface Props {
  view: ViewKey;
}

export default function CommanderRequests({ view }: Props) {
  const { soldier } = useSoldier(); // commander logged in (soldierType === 2)
  const { items, loading, error, fetchByStatus, clearError } =
    useCommanderRequests();

  const [selected, setSelected] = useState<SoldierRequestRead | null>(null);
  const [approvedMode, setApprovedMode] = useState(false);
  const [dateTime, setDateTime] = useState("");
  const [location, setLocation] = useState("");
  const [saving, setSaving] = useState(false);

  // If user navigates to approved/rejected, make sure scheduling mode is off
  useEffect(() => {
    setApprovedMode(false);
  }, [view]);

  // Fetch whenever commanderId or view changes
  useEffect(() => {
    if (!soldier) return;
    clearError();
    const status = statusMap[view];
    void fetchByStatus(soldier.soldierId, status);
  }, [soldier, view, fetchByStatus, clearError]); // functions are stable (useCallback)

  // Group by request name for the 4 cards
  const byCategory = useMemo(() => {
    const map: Record<CategoryKey, SoldierRequestRead[]> = {
      חופל: [],
      תש: [],
      רופא: [],
      "בקשת יציאה": [],
    };
    items.forEach((r) => {
      const key = (r.requestName as CategoryKey) || "חופל";
      if (map[key]) map[key].push(r);
    });
    return map;
  }, [items]);

  const openRow = (row: SoldierRequestRead) => {
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

  const onApprove = () => setApprovedMode(true);

  const onReject = async () => {
    if (!selected || !soldier) return;
    try {
      setSaving(true);

      await updateSoldierRequest({
        soldierRequestId: selected.soldierRequestId,
        requestStatus: 2, // 2 = rejected
        appointmentId: null,
      });

      // Refresh the current view (0/1/2 based on the top menu)
      await fetchByStatus(soldier.soldierId, statusMap[view]);

      closeModal();
    } catch (err: any) {
      // You can show a toast or inline error; keeping it simple here:
      console.error(err?.message ?? "שגיאה בעדכון הבקשה");
    } finally {
      setSaving(false);
    }
  };

  const onSendToSoldier = async () => {
    if (!selected || !soldier) return;

    // basic validation
    if (!dateTime || !location.trim()) {
      // you can show a nicer inline error/toast if you want
      console.warn("Must provide date/time and location");
      return;
    }

    try {
      setSaving(true);

      // Convert the datetime-local (e.g. "2025-10-22T16:00") to ISO
      // If you want to keep it as local time on the server, you can send the raw string.
      const iso = new Date(dateTime).toISOString();

      // 1) Create the appointment
      const appointmentId = await createAppointment({
        appointmentDate: iso,
        appointmentLocation: location.trim(),
      });

      // 2) Approve the soldier request with the new appointmentId
      await updateSoldierRequest({
        soldierRequestId: selected.soldierRequestId,
        requestStatus: 1, // 1 = approved
        appointmentId,
      });

      // 3) Refresh the current list (based on the menu view)
      await fetchByStatus(soldier.soldierId, statusMap[view]);

      closeModal();
    } catch (err: any) {
      console.error(err?.message ?? "שגיאה בשליחה לחייל");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className={styles.wrapper} dir="rtl">
      <h2 className={styles.pageTitle}>{titles[view]}</h2>

      {/* ...existing loading/error blocks... */}

      {!loading && !error && soldier && (
        <div className={styles.grid}>
          {(["חופל", "תש", "רופא", "בקשת יציאה"] as CategoryKey[]).map(
            (cat) => (
              <Card key={cat} title={cat}>
                <ul className={styles.list} role="list">
                  {byCategory[cat].length > 0 ? (
                    byCategory[cat].map((row) => (
                      <li
                        key={row.soldierRequestId}
                        className={styles.item}
                        role="listitem"
                      >
                        <button
                          type="button"
                          className={styles.itemBtn}
                          onClick={() => openRow(row)}
                        >
                          {row.firstName} {row.lastName}
                        </button>
                      </li>
                    ))
                  ) : (
                    <li className={styles.empty}>—</li>
                  )}
                </ul>
              </Card>
            )
          )}
        </div>
      )}

      <Modal
        open={!!selected}
        title={
          selected
            ? `${selected.requestName} — ${selected.firstName} ${selected.lastName}`
            : undefined
        }
        onClose={closeModal}
      >
        {selected && (
          <div className={styles.modalBody} dir="rtl">
            <div className={styles.row}>
              <span className={styles.label}>שם:</span>
              <span className={styles.value}>
                {selected.firstName} {selected.lastName}
              </span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>מספר אישי:</span>
              <span className={styles.value}>{selected.soldierId}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>הערות:</span>
              <span className={styles.value}>{selected.comment ?? "—"}</span>
            </div>

            {view === "unanswered" && !approvedMode && (
              <div className={styles.actions}>
                <button
                  type="button"
                  className={styles.approve}
                  onClick={onApprove}
                  disabled={saving}
                >
                  אישור
                </button>
                <button
                  type="button"
                  className={styles.reject}
                  onClick={onReject}
                  disabled={saving}
                >
                  דחייה
                </button>
              </div>
            )}

            {view === "unanswered" && approvedMode && (
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
                    disabled={saving}
                  >
                    {saving ? "שולח..." : "שלח לחייל"}
                  </button>
                </div>
              </>
            )}

            {view === "approved" && (
              <>
                <div className={styles.row}>
                  <span className={styles.label}>תאריך:</span>
                  <span className={styles.value}>
                    {fmt(selected.appointmentDate)}
                  </span>
                </div>
                <div className={styles.row}>
                  <span className={styles.label}>מיקום:</span>
                  <span className={styles.value}>
                    {selected.appointmentLocation ?? "—"}
                  </span>
                </div>
              </>
            )}
          </div>
        )}
      </Modal>
    </section>
  );
}
