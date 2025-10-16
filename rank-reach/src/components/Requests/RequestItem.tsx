import React from "react";
import styles from "./RequestItem.module.css";
import type { Request } from "./RequestList";

interface Props {
  request: Request;
  onOpen: (req: Request) => void;
}

export default function RequestItem({ request, onOpen }: Props) {
  return (
    <button
      type="button"
      className={styles.item}
      onClick={() => onOpen(request)}
    >
      <span className={styles.name}>{request.name}</span>
    </button>
  );
}
