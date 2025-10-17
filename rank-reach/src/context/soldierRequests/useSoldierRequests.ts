import { useContext } from "react";
import {
  SoldierRequestsContext,
  type SoldierRequestsContextValue,
} from "./SoldierRequestsContext";

export function useSoldierRequests(): SoldierRequestsContextValue {
  const ctx = useContext(SoldierRequestsContext);
  if (!ctx)
    throw new Error(
      "useSoldierRequests must be used within SoldierRequestsProvider"
    );
  return ctx;
}
