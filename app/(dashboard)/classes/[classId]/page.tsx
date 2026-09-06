"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Users } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getCourseById } from "@/lib/data/courses";
import { getAssignmentsForCourse, getSubmissionsForAssignment } from "@/lib/data/assignments";
import { getStudentById } from "@/lib/data/users";
import { courseGradeForStudent } from "@/lib/services/grades";

export default function ClassDetailPage({ params }: { params: Promise<{ classId: string }> }) {
  const { classId } = use(params);
  const { user } = useCurrentUser();
  const course = getCourseById(classId);

  if (!course) notFound();
  if (!user || user.role !== "teacher") return null;

  const assignments = getAssignmentsForCourse(course.id);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title={course.name} description={`${course.room} · ${course.term}`} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              {assignments.length === 0 ? (
                <EmptyState icon={Users} title="No assignments yet" description="Create an assignment to get started." />
              ) : (
                <ul className="flex flex-col divide-y divide-border">
                  {assignments.map((a) => {
                    const subs = getSubmissionsForAssignment(a.id);
                    const graded = subs.filter((s) => s.status === "graded").length;
                    return (
                      <li key={a.id} className="flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0">
                        <div>
                          <p className="font-medium">{a.title}</p>
                          <p className="text-sm text-muted">
                            Due {new Date(a.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })} · {graded}/{subs.length} graded
                          </p>
                        </div>
                        <Link href={`/submissions/${a.id}`} className="text-sm font-medium text-primary">
                          Review
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle>Roster</CardTitle>
            <span className="text-sm text-muted">{course.studentIds.length}</span>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col divide-y divide-border">
              {course.studentIds.map((sid) => {
                const student = getStudentById(sid);
                if (!student) return null;
                const grade = courseGradeForStudent(sid, course.id);
                return (
                  <li key={sid} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                    <Link href={`/students/${sid}`} className="flex items-center gap-3">
                      <Avatar name={student.name} color={student.avatarColor} size="sm" />
                      <p className="font-medium hover:text-primary">{student.name}</p>
                    </Link>
                    <Badge variant="neutral">{grade.letter ?? "—"}</Badge>
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
