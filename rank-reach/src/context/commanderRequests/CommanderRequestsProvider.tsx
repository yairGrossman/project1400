import { useMemo, useState, useCallback } from "react";
import type { PropsWithChildren } from "react";
import { CommanderRequestsContext } from "./CommanderRequestsContext";
import type { SoldierRequestRead } from "../../types/soldierRequest";
import { fetchCommanderRequests } from "../../api/commanderRequestsApi";

export function CommanderRequestsProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<SoldierRequestRead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);
  const reset = useCallback(() => {
    setItems([]);
    setLoading(false);
    setError(null);
  }, []);

  const fetchByStatus = useCallback(
    async (
      commanderId: number,
      status: 0 | 1 | 2
    ): Promise<SoldierRequestRead[]> => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchCommanderRequests(commanderId, status);
        setItems(data);
        return data;
      } catch (e: any) {
        setError(e?.message ?? "Unknown error");
        return [];
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const value = useMemo(
    () => ({
      items,
      loading,
      error,
      fetchByStatus,
      setItems,
      clearError,
      reset,
    }),
    [items, loading, error, fetchByStatus, clearError, reset]
  );

  return (
    <CommanderRequestsContext.Provider value={value}>
      {children}
    </CommanderRequestsContext.Provider>
  );
}
