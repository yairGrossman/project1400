import React from "react";
import styles from "./SoldierRequests.module.css";
import Card from "../UI/Card/Card";
import RequestList from "../Requests/RequestList";
import NewRequestFab from "../Requests/NewRequestFab";

export default function SoldierRequests() {
  return (
    <section className={styles.wrapper} dir="rtl">
      <h2 className={styles.pageTitle}>הבקשות שלי</h2>

      <Card title="בקשות שלא נענו">
        <RequestList />
      </Card>

      <NewRequestFab />
    </section>
  );
}
