import type { CourseFeedbackRead } from "../types/weeklyFeedback";

const BASE = import.meta.env.VITE_RANK_REACH_API_WEEKLYFEEDBACK_BASE;

/**
 * GET /api/weeklyfeedback/course/{courseId}/{weekDate}
 * weekDate example: "2025-10-17"
 */
export async function fetchCourseWeeklyFeedback(
  courseId: number,
  weekDate: string
): Promise<CourseFeedbackRead[]> {
  const url = `${BASE}/course/${courseId}/${encodeURIComponent(weekDate)}`;

  const res = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Fetch failed (${res.status}): ${text || res.statusText}`);
  }

  return (await res.json()) as CourseFeedbackRead[];
}
