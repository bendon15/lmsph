"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getCoursesForStudent, courses as allCourses } from "@/lib/data/courses";
import { courseGradeForStudent } from "@/lib/services/grades";

const tintMap: Record<string, string> = {
  primary: "bg-primary-tint text-primary",
  emerald: "bg-emerald-tint text-emerald",
  amber: "bg-amber-tint text-amber",
  rose: "bg-rose-tint text-rose",
};

export default function CoursesPage() {
  const { user } = useCurrentUser();
  if (!user) return null;

  const isAdmin = user.role === "admin";
  const courses = isAdmin ? allCourses : getCoursesForStudent(user.id);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={isAdmin ? "Courses" : "My courses"}
        description={
          isAdmin
            ? "Every course running this term, across every department."
            : "Everything you&apos;re enrolled in this term."
        }
      />

      {courses.length === 0 ? (
        <EmptyState icon={BookOpen} title="No courses yet" description="Courses will show up here once you&apos;re enrolled." />
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => {
            const grade = !isAdmin ? courseGradeForStudent(user.id, course.id) : null;
            return (
              <Link
                key={course.id}
                href={`/courses/${course.id}`}
                className="flex flex-col rounded-lg border border-border bg-surface p-6 transition-colors hover:border-primary/40"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${tintMap[course.color]}`}>
                    {course.subject.slice(0, 2).toUpperCase()}
                  </span>
                  {grade?.letter && <Badge variant="neutral">{grade.letter}</Badge>}
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">{course.name}</h3>
                <p className="mt-1 text-sm text-muted">{course.teacherName} · {course.room}</p>

                {!isAdmin && grade && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs text-muted">
                      <span>{grade.gradedCount}/{grade.totalAssignments} graded</span>
                      {grade.percentage !== null && <span>{grade.percentage}%</span>}
                    </div>
                    <Progress value={grade.percentage ?? 0} className="mt-1.5" />
                  </div>
                )}
                {isAdmin && (
                  <p className="mt-4 text-sm text-muted">{course.studentIds.length} students enrolled</p>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
