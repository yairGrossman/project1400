import { useContext } from "react";
import {
  CommanderRequestsContext,
  type CommanderRequestsContextValue,
} from "./CommanderRequestsContext";

export function useCommanderRequests(): CommanderRequestsContextValue {
  const ctx = useContext(CommanderRequestsContext);
  if (!ctx)
    throw new Error(
      "useCommanderRequests must be used within CommanderRequestsProvider"
    );
  return ctx;
}
