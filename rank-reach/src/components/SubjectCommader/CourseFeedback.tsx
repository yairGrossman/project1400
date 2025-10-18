import { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import styles from "./CourseFeedback.module.css";
import Card from "../UI/Card/Card";
import { useSoldier } from "../../context/soldier/useSoldier";
import { fetchCourseWeeklyFeedback } from "../../api/weeklyFeedbackApi";
import type { CourseFeedbackRead } from "../../types/weeklyFeedback";

export default function CourseFeedback() {
  const { soldier } = useSoldier();

  const today = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const defaultDate = `${today.getFullYear()}-${pad(
    today.getMonth() + 1
  )}-${pad(today.getDate())}`;

  const [selectedDate, setSelectedDate] = useState<string>(defaultDate);
  const [items, setItems] = useState<CourseFeedbackRead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onChangeDate = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  useEffect(() => {
    const load = async () => {
      if (!soldier?.courseId || !selectedDate) return;
      setLoading(true);
      setError(null);
      try {
        const data = await fetchCourseWeeklyFeedback(
          soldier.courseId,
          selectedDate
        );
        setItems(data);
      } catch (e: any) {
        setError(e?.message ?? "שגיאה בטעינת המשובים");
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, [soldier?.courseId, selectedDate]);

  return (
    <section className={styles.wrapper} dir="rtl">
      <div className={styles.container}>
        <div className={styles.controls}>
          <label htmlFor="weekDate" className={styles.label}>
            בחר תאריך:
          </label>
          <input
            id="weekDate"
            type="date"
            className={styles.date}
            value={selectedDate}
            onChange={onChangeDate}
          />
        </div>

        <Card title={`סקר שבועי — ${selectedDate}`}>
          {!soldier?.courseId ? (
            <p className={styles.empty}>אין מזהה קורס עבור משתמש זה</p>
          ) : loading ? (
            <p className={styles.empty}>טוען...</p>
          ) : error ? (
            <p className={styles.empty}>שגיאה: {error}</p>
          ) : items.length === 0 ? (
            <p className={styles.empty}>אין משובים לתאריך זה</p>
          ) : (
            <ul className={styles.list} role="list">
              {items.map((item, index) => (
                <li key={index} className={styles.item} role="listitem">
                  <p className={styles.content}>{item.review}</p>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </section>
  );
}
