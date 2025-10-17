import { useMemo, useState } from "react";
import type { PropsWithChildren } from "react";
import { SoldierContext } from "./SoldierContext";
import { fetchSoldierByEmail } from "../api/soldierApi";
import type { Soldier } from "../types/soldier";

export function SoldierProvider({ children }: PropsWithChildren) {
  const [soldier, setSoldier] = useState<Soldier | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  const fetchByEmail = async (email: string): Promise<Soldier | null> => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchSoldierByEmail(email);
      setSoldier(data);
      return data;
    } catch (e: any) {
      setError(e?.message ?? "Unknown error");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const value = useMemo(
    () => ({ soldier, loading, error, setSoldier, fetchByEmail, clearError }),
    [soldier, loading, error]
  );

  return (
    <SoldierContext.Provider value={value}>{children}</SoldierContext.Provider>
  );
}
