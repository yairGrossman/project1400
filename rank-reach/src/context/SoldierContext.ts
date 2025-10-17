import { createContext } from "react";
import type { Soldier } from "../types/soldier";

export type SoldierContextValue = {
  soldier: Soldier | null;
  loading: boolean;
  error: string | null;
  setSoldier: (s: Soldier | null) => void;
  fetchByEmail: (email: string) => Promise<Soldier | null>;
  clearError: () => void;
};

export const SoldierContext = createContext<SoldierContextValue | undefined>(
  undefined
);
