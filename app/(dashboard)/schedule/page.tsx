"use client";

import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/ui/card";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getCoursesForStudent } from "@/lib/data/courses";
import { getScheduleForCourses, DAYS } from "@/lib/data/schedule";
import { cn } from "@/lib/utils";

const tintMap: Record<string, string> = {
  primary: "border-l-primary bg-primary-tint/40",
  emerald: "border-l-emerald bg-emerald-tint/40",
  amber: "border-l-amber bg-amber-tint/40",
  rose: "border-l-rose bg-rose-tint/40",
};

export default function SchedulePage() {
  const { user } = useCurrentUser();
  if (!user || user.role !== "student") return null;

  const courses = getCoursesForStudent(user.id);
  const entries = getScheduleForCourses(courses.map((c) => c.id));

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Schedule" description="Your weekly class timetable." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
        {DAYS.map((day) => {
          const dayEntries = entries
            .filter((e) => e.day === day)
            .map((e) => ({ ...e, course: courses.find((c) => c.id === e.courseId)! }))
            .sort((a, b) => (a.startTime < b.startTime ? -1 : 1));

          return (
            <div key={day} className="flex flex-col gap-2.5">
              <p className="text-sm font-medium text-muted">{day}</p>
              {dayEntries.length === 0 ? (
                <Card className="flex h-20 items-center justify-center text-xs text-muted">
                  Free
                </Card>
              ) : (
                dayEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className={cn(
                      "rounded-md border-l-4 bg-surface p-3",
                      tintMap[entry.course.color]
                    )}
                  >
                    <p className="text-xs font-medium text-muted">{entry.startTime}–{entry.endTime}</p>
                    <p className="mt-1 text-sm font-semibold">{entry.course.name}</p>
                    <p className="text-xs text-muted">{entry.course.room}</p>
                  </div>
                ))
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
