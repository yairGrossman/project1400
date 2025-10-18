import type {
  SoldierRequestRead,
  SoldierRequestCreate,
  SoldierRequestUpdate,
} from "../types/soldierRequest";

const BASE = import.meta.env.VITE_RANK_REACH_API_SOLDIER_REQUESTS_BASE;

export async function createSoldierRequest(payload: SoldierRequestCreate) {
  const res = await fetch(BASE, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (res.status === 201) {
    // Some APIs return the created entity; some don’t.
    // Safely try to parse JSON; if it fails, just return { ok: true }.
    try {
      const data = await res.json();
      return { ok: true, data };
    } catch {
      return { ok: true, data: null };
    }
  }

  const text = await res.text().catch(() => "");
  throw new Error(`Create failed (${res.status}): ${text || res.statusText}`);
}

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

export async function updateSoldierRequest(
  payload: SoldierRequestUpdate
): Promise<void> {
  const url = `${BASE}/${payload.soldierRequestId}`;

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (res.status === 204) return;

  const text = await res.text().catch(() => "");
  throw new Error(`Update failed (${res.status}): ${text || res.statusText}`);
}
