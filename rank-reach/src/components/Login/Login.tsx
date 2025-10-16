import React, { useState } from "react";
import type { FormEvent } from "react";
import Card from "../UI/Card/Card";
import styles from "./Login.module.css";

export default function Login() {
  const [email, setEmail] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Login with:", email);
    // TODO: integrate real auth
  };

  return (
    <div className={styles.wrapper} dir="rtl">
      <Card title="כניסה">
        <form className={styles.form} onSubmit={onSubmit}>
          <label htmlFor="email" className={styles.label}>
            אימייל
          </label>
          <input
            id="email"
            type="email"
            className={styles.input}
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />

          <button type="submit" className={styles.primary}>
            כנס
          </button>
        </form>
      </Card>
    </div>
  );
}
