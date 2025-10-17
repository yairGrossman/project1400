import type { Soldier } from "../types/soldier";

const BASE = import.meta.env.VITE_RANK_REACH_API_SOLDIERS_BASE;
console.log("Soldier API base URL:", BASE);

/** GET /api/soldiers/by-email/{email} */
export async function fetchSoldierByEmail(
  email: string
): Promise<Soldier | null> {
  const url = `${BASE}/by-email/${encodeURIComponent(email)}`;

  const res = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/json" },
  });

  if (res.status === 404) return null; // not found -> no soldier
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Fetch failed (${res.status}): ${text || res.statusText}`);
  }

  const data = (await res.json()) as Soldier;
  return data;
}
