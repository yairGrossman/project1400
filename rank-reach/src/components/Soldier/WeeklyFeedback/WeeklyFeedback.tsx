import React, { useState } from "react";
import type { FormEvent } from "react";
import styles from "./WeeklyFeedback.module.css";
import Card from "../../UI/Card/Card";

export default function WeeklyFeedback() {
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (feedback.trim().length === 0) return;
    // TODO: call API later (POST /api/weeklyfeedback)
    console.log("Weekly feedback submitted:", feedback);

    setSubmitted(true);
    setFeedback("");

    // Reset success message after a short delay
    setTimeout(() => setSubmitted(false), 2500);
  };

  return (
    <div className={styles.wrapper} dir="rtl">
      <Card title="סקר שבועי">
        <form className={styles.form} onSubmit={handleSubmit} dir="rtl">
          <label htmlFor="feedback" className={styles.label}>
            תאר בקצרה איך עבר השבוע שלך:
          </label>

          <textarea
            id="feedback"
            className={styles.textarea}
            placeholder="כתוב כאן..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={4}
          />

          <div className={styles.actions}>
            <button
              type="submit"
              className={styles.submit}
              disabled={feedback.trim().length === 0}
            >
              שלח
            </button>
          </div>

          {submitted && <p className={styles.success}>המשוב נשלח בהצלחה ✅</p>}
        </form>
      </Card>
    </div>
  );
}
