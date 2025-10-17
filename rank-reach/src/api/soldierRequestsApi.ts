import type { SoldierRequestRead } from "../types/soldierRequest";

const BASE = import.meta.env.VITE_RANK_REACH_API_SOLDIER_REQUESTS_BASE;

export async function fetchSoldierRequests(
  soldierId: number,
  statusId?: number | null
): Promise<SoldierRequestRead[]> {
  const qs = new URLSearchParams();
  if (statusId !== undefined && statusId !== null) {
    qs.set("statusId", String(statusId));
  }

  const url = `${BASE}/${soldierId}${qs.toString() ? `?${qs}` : ""}`;

  const res = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Fetch failed (${res.status}): ${text || res.statusText}`);
  }

  const data = (await res.json()) as SoldierRequestRead[];
  return data;
}
