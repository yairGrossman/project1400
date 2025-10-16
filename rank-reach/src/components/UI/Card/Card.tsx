import React from "react";
import type { PropsWithChildren } from "react";
import styles from "./Card.module.css";

export interface CardProps {
  title?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export default function Card({
  title,
  footer,
  className = "",
  children,
}: PropsWithChildren<CardProps>) {
  return (
    <div className={`${styles.card} ${className}`}>
      {title && (
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
        </div>
      )}
      <div className={styles.body}>{children}</div>
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
}
