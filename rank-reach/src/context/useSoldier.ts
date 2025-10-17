import { useContext } from "react";
import { SoldierContext } from "./SoldierContext"; // export context from that file
import type { SoldierContextValue } from "./SoldierContext";

export function useSoldier(): SoldierContextValue {
  const ctx = useContext(SoldierContext);
  if (!ctx) throw new Error("useSoldier must be used within SoldierProvider");
  return ctx;
}
