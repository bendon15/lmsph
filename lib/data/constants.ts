// A fixed "today" so every dashboard, due date, and chart stays consistent
// across reloads instead of drifting with the real calendar.
export const TODAY = new Date("2026-09-08T09:00:00");

export function daysFromToday(offset: number) {
  const d = new Date(TODAY);
  d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0, 10);
}
