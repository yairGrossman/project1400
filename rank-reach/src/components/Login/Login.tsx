import React, { useState } from "react";
import type { FormEvent } from "react";
import Card from "../UI/Card/Card";
import styles from "./Login.module.css";
import { useSoldier } from "../../context/useSoldier";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const { fetchByEmail, clearError } = useSoldier();
  const navigate = useNavigate();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearError();

    const result = await fetchByEmail(email);

    if (result) {
      console.log("Fetched soldier: ", result);
      switch (result.soldierType) {
        case 1:
          navigate("/soldier");
          break;
        case 2:
          navigate("/commander");
          break;
        default:
          navigate("/");
      }
    }
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
