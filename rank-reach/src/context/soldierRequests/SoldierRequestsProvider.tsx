import { useMemo, useState, useCallback } from "react";
import type { PropsWithChildren } from "react";
import { SoldierRequestsContext } from "./SoldierRequestsContext";
import { fetchSoldierRequests } from "../../api/soldierRequestsApi";
import type { SoldierRequestRead } from "../../types/soldierRequest";

export function SoldierRequestsProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<SoldierRequestRead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);

  const reset = useCallback(() => {
    setItems([]);
    setError(null);
    setLoading(false);
  }, []);

  const fetchBySoldier = useCallback(
    async (
      soldierId: number,
      statusId?: number | null
    ): Promise<SoldierRequestRead[]> => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchSoldierRequests(soldierId, statusId);
        setItems(data);
        return data;
      } catch (e: any) {
        setError(e?.message ?? "Unknown error");
        return [];
      } finally {
        setLoading(false);
      }
    },
    [] // no deps -> stable identity
  );

  const value = useMemo(
    () => ({
      items,
      loading,
      error,
      fetchBySoldier,
      setItems,
      clearError,
      reset,
    }),
    [items, loading, error, fetchBySoldier, clearError, reset]
  );

  return (
    <SoldierRequestsContext.Provider value={value}>
      {children}
    </SoldierRequestsContext.Provider>
  );
}
