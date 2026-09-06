import type { ScheduleEntry } from "@/lib/types";

export const scheduleEntries: ScheduleEntry[] = [
  { id: "sc1", courseId: "c1", day: "Mon", startTime: "08:30", endTime: "09:20" },
  { id: "sc2", courseId: "c3", day: "Mon", startTime: "09:30", endTime: "10:20" },
  { id: "sc3", courseId: "c2", day: "Mon", startTime: "10:30", endTime: "11:20" },
  { id: "sc4", courseId: "c4", day: "Mon", startTime: "13:00", endTime: "13:50" },

  { id: "sc5", courseId: "c3", day: "Tue", startTime: "08:30", endTime: "09:20" },
  { id: "sc6", courseId: "c1", day: "Tue", startTime: "09:30", endTime: "10:20" },
  { id: "sc7", courseId: "c5", day: "Tue", startTime: "10:30", endTime: "11:20" },
  { id: "sc8", courseId: "c2", day: "Tue", startTime: "13:00", endTime: "13:50" },

  { id: "sc9", courseId: "c1", day: "Wed", startTime: "08:30", endTime: "09:20" },
  { id: "sc10", courseId: "c3", day: "Wed", startTime: "09:30", endTime: "10:20" },
  { id: "sc11", courseId: "c4", day: "Wed", startTime: "10:30", endTime: "11:20" },
  { id: "sc12", courseId: "c6", day: "Wed", startTime: "13:00", endTime: "13:50" },

  { id: "sc13", courseId: "c2", day: "Thu", startTime: "08:30", endTime: "09:20" },
  { id: "sc14", courseId: "c5", day: "Thu", startTime: "09:30", endTime: "10:20" },
  { id: "sc15", courseId: "c3", day: "Thu", startTime: "10:30", endTime: "11:20" },
  { id: "sc16", courseId: "c1", day: "Thu", startTime: "13:00", endTime: "13:50" },

  { id: "sc17", courseId: "c4", day: "Fri", startTime: "08:30", endTime: "09:20" },
  { id: "sc18", courseId: "c2", day: "Fri", startTime: "09:30", endTime: "10:20" },
  { id: "sc19", courseId: "c6", day: "Fri", startTime: "10:30", endTime: "11:20" },
  { id: "sc20", courseId: "c3", day: "Fri", startTime: "13:00", endTime: "13:50" },
];

export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"] as const;

export function getScheduleForCourse(courseId: string) {
  return scheduleEntries.filter((e) => e.courseId === courseId);
}

export function getScheduleForCourses(courseIds: string[]) {
  return scheduleEntries.filter((e) => courseIds.includes(e.courseId));
}
