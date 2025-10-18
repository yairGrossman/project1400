import { createContext } from "react";
import type { SoldierRequestRead } from "../../types/soldierRequest";

export type CommanderRequestsContextValue = {
  items: SoldierRequestRead[];
  loading: boolean;
  error: string | null;

  fetchByStatus: (
    commanderId: number,
    status: 0 | 1 | 2
  ) => Promise<SoldierRequestRead[]>;
  setItems: (items: SoldierRequestRead[]) => void;
  clearError: () => void;
  reset: () => void;
};

export const CommanderRequestsContext = createContext<
  CommanderRequestsContextValue | undefined
>(undefined);
