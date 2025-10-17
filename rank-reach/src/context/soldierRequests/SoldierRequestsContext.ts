import { createContext } from "react";
import type { SoldierRequestRead } from "../../types/soldierRequest";

export type SoldierRequestsContextValue = {
  items: SoldierRequestRead[];
  loading: boolean;
  error: string | null;

  /** Fetch & replace items */
  fetchBySoldier: (
    soldierId: number,
    statusId?: number | null
  ) => Promise<SoldierRequestRead[]>;

  /** Manually set items (e.g., after local updates) */
  setItems: (items: SoldierRequestRead[]) => void;

  /** Clear error */
  clearError: () => void;

  /** Reset everything to initial state */
  reset: () => void;
};

export const SoldierRequestsContext = createContext<
  SoldierRequestsContextValue | undefined
>(undefined);
