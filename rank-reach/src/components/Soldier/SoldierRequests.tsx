import React, { useEffect, useMemo } from "react";
import styles from "./SoldierRequests.module.css";
import Card from "../UI/Card/Card";
import RequestList from "../Requests/RequestList";
import type { Request } from "../Requests/RequestList";
import NewRequestFab from "../Requests/NewRequestFab";
import type { ViewKey } from "../../types/requests";

import { useSoldier } from "../../context/soldier/useSoldier";
import { useSoldierRequests } from "../../context/soldierRequests/useSoldierRequests";

const cardTitles: Record<ViewKey, string> = {
  unanswered: "בקשות שלא נענו",
  approved: "בקשות שאושרו",
  rejected: "בקשות שלא אושרו",
};

const statusMap: Record<ViewKey, number> = {
  unanswered: 0,
  approved: 1,
  rejected: 2,
};

interface Props {
  view: ViewKey;
}

export default function SoldierRequests({ view }: Props) {
  const { soldier } = useSoldier();
  const { items, loading, error, fetchBySoldier, clearError } =
    useSoldierRequests();

  // Fetch when soldier or view changes
  useEffect(() => {
    if (!soldier) return;
    clearError();
    const statusId = statusMap[view];
    void fetchBySoldier(soldier.soldierId, statusId);
  }, [soldier, view, fetchBySoldier, clearError]);

  // Map API rows -> RequestList items
  const data: Request[] = useMemo(() => {
    return items.map((r) => ({
      id: String(r.soldierRequestId),
      name: r.requestName, // tiny-card title
      notes: r.comment ?? "", // shown in popup
      // For approved we may also have appointment info (modal uses these when variant="approved")
      date: r.appointmentDate ?? undefined,
      location: r.appointmentLocation ?? undefined,
    }));
  }, [items]);

  return (
    <section className={styles.wrapper} dir="rtl">
      <h2 className={styles.pageTitle}>הבקשות שלי</h2>

      <Card title={cardTitles[view]}>
        {/* States: not logged in / loading / error / empty / list */}
        {!soldier ? (
          <p style={{ color: "var(--iaf-white)", margin: 0 }}>לא מחובר</p>
        ) : loading ? (
          <p style={{ color: "var(--iaf-white)", margin: 0 }}>טוען...</p>
        ) : error ? (
          <p style={{ color: "var(--iaf-white)", margin: 0 }}>שגיאה: {error}</p>
        ) : data.length === 0 ? (
          <p style={{ color: "var(--iaf-white)", margin: 0 }}>
            אין בקשות להצגה
          </p>
        ) : (
          <RequestList items={data} variant={view} />
        )}
      </Card>

      <NewRequestFab />
    </section>
  );
}
