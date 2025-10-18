import type { AppointmentCreate } from "../types/appointment";

const BASE = import.meta.env.VITE_RANK_REACH_API_APPOINTMENTS_BASE;

/**
 * POST /api/appointments
 * Returns 201 Created. Some APIs return the created entity, some only a Location header.
 * This helper robustly extracts an appointmentId number.
 */
export async function createAppointment(
  payload: AppointmentCreate
): Promise<number> {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (res.status !== 201) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `Create appointment failed (${res.status}): ${text || res.statusText}`
    );
  }

  // 1) Try JSON body (common shapes: { appointmentId }, { id }, number)
  try {
    const data = await res.json();
    const maybe =
      (typeof data === "number" && data) ||
      (typeof data?.appointmentId === "number" && data.appointmentId) ||
      (typeof data?.id === "number" && data.id);
    if (typeof maybe === "number") return maybe;
  } catch {
    // ignore JSON parse errors
  }

  // 2) Try Location header: .../appointments/{id}
  const loc = res.headers.get("Location");
  if (loc) {
    const last = loc.split("/").filter(Boolean).pop();
    const idNum = last ? Number(last) : NaN;
    if (!Number.isNaN(idNum)) return idNum;
  }

  throw new Error(
    "Create appointment succeeded but no appointmentId was returned."
  );
}
