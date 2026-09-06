"use client";

import Link from "next/link";
import { Users } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getCoursesForTeacher } from "@/lib/data/courses";
import { getClassPerformance } from "@/lib/services/teacher-service";

const tintMap: Record<string, string> = {
  primary: "bg-primary-tint text-primary",
  emerald: "bg-emerald-tint text-emerald",
  amber: "bg-amber-tint text-amber",
  rose: "bg-rose-tint text-rose",
};

export default function ClassesPage() {
  const { user } = useCurrentUser();
  if (!user || user.role !== "teacher") return null;

  const courses = getCoursesForTeacher(user.id);
  const performance = getClassPerformance(user.id);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Classes" description="The classes you&apos;re teaching this term." />

      {courses.length === 0 ? (
        <EmptyState icon={Users} title="No classes assigned" description="Classes you teach will show up here." />
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => {
            const perf = performance.find((p) => p.course.id === course.id);
            return (
              <Link
                key={course.id}
                href={`/classes/${course.id}`}
                className="flex flex-col rounded-lg border border-border bg-surface p-6 transition-colors hover:border-primary/40"
              >
                <span className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${tintMap[course.color]}`}>
                  {course.subject.slice(0, 2).toUpperCase()}
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold">{course.name}</h3>
                <p className="mt-1 text-sm text-muted">{course.room} · {course.term}</p>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1.5 text-muted">
                    <Users className="h-4 w-4" /> {course.studentIds.length} students
                  </span>
                  <span className="font-medium text-muted">
                    {perf?.average !== null && perf?.average !== undefined ? `${perf.average}% avg` : "No grades yet"}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
