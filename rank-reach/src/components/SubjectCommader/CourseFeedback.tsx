import React, { useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import styles from "./CourseFeedback.module.css";
import Card from "../UI/Card/Card";

type FeedbackItem = {
  id: number;
  date: string; // "YYYY-MM-DD"
  content: string; // anonymous text
};

/** Demo data (anonymous) */
const DEMO_FEEDBACK: FeedbackItem[] = [
  {
    id: 1,
    date: "2025-10-13",
    content: "שבוע עמוס אבל למדתי המון. עבודה צוות עבדה מצוין.",
  },
  {
    id: 2,
    date: "2025-10-13",
    content: "היה מאתגר, אשמח ליותר תרגולים מעשיים.",
  },
  { id: 3, date: "2025-10-14", content: "קצב טוב, המדריכים סבלניים ומדויקים." },
  { id: 4, date: "2025-10-15", content: "הייתה עומס משימות, כדאי לפזר יותר." },
  {
    id: 5,
    date: "2025-10-17",
    content: "שיפור גדול בתיאום בין הזמנים לשיעורים.",
  },
];

export default function CourseFeedback() {
  // Default to today's date in YYYY-MM-DD
  const today = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const defaultDate = `${today.getFullYear()}-${pad(
    today.getMonth() + 1
  )}-${pad(today.getDate())}`;

  const [selectedDate, setSelectedDate] = useState<string>(defaultDate);

  const onChangeDate = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const filtered = useMemo(
    () => DEMO_FEEDBACK.filter((f) => f.date === selectedDate),
    [selectedDate]
  );

  return (
    <section className={styles.wrapper} dir="rtl">
      <div className={styles.container}>
        {/* Controls aligned to the same width as the card */}
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
          {filtered.length === 0 ? (
            <p className={styles.empty}>אין משובים לתאריך זה</p>
          ) : (
            <ul className={styles.list} role="list">
              {filtered.map((item) => (
                <li key={item.id} className={styles.item} role="listitem">
                  <p className={styles.content}>{item.content}</p>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </section>
  );
}
