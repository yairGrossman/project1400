import type { SoldierRequestRead } from "../types/soldierRequest";

const BASE = import.meta.env.VITE_RANK_REACH_API_COMMANDERREQUESTS_BASE;

/**
 * GET /api/commanderrequests/{commanderId}/{requestStatus}
 * requestStatus: 0 = unanswered, 1 = approved, 2 = rejected
 */
export async function fetchCommanderRequests(
  commanderId: number,
  requestStatus: 0 | 1 | 2
): Promise<SoldierRequestRead[]> {
  const url = `${BASE}/${commanderId}/${requestStatus}`;

  const res = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Fetch failed (${res.status}): ${text || res.statusText}`);
  }

  return (await res.json()) as SoldierRequestRead[];
}
