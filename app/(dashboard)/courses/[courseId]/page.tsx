"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { ClipboardList, Users } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getCourseById } from "@/lib/data/courses";
import { getAssignmentsForCourse } from "@/lib/data/assignments";
import { getStudentById } from "@/lib/data/users";
import { courseGradeForStudent } from "@/lib/services/grades";

export default function CourseDetailPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = use(params);
  const { user } = useCurrentUser();
  const course = getCourseById(courseId);

  if (!course) notFound();
  if (!user) return null;

  const assignments = getAssignmentsForCourse(course.id);
  const isAdmin = user.role === "admin";
  const isStudent = user.role === "student";

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={course.name}
        description={`${course.teacherName} · ${course.room} · ${course.term}`}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              {assignments.length === 0 ? (
                <EmptyState icon={ClipboardList} title="No assignments yet" description="Assignments for this course will appear here." />
              ) : (
                <ul className="flex flex-col divide-y divide-border">
                  {assignments.map((a) => (
                    <li key={a.id} className="flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0">
                      <div>
                        <p className="font-medium">{a.title}</p>
                        <p className="text-sm text-muted">
                          Due {new Date(a.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })} · {a.points} pts
                        </p>
                      </div>
                      <Badge variant="neutral">{a.type}</Badge>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          {(isAdmin || user.role === "teacher") && (
            <Card>
              <CardHeader className="flex-row items-center justify-between space-y-0">
                <CardTitle>Roster</CardTitle>
                <span className="flex items-center gap-1.5 text-sm text-muted">
                  <Users className="h-4 w-4" /> {course.studentIds.length} students
                </span>
              </CardHeader>
              <CardContent>
                <ul className="flex flex-col divide-y divide-border">
                  {course.studentIds.map((sid) => {
                    const student = getStudentById(sid);
                    if (!student) return null;
                    const grade = courseGradeForStudent(sid, course.id);
                    return (
                      <li key={sid} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                        <div className="flex items-center gap-3">
                          <Avatar name={student.name} color={student.avatarColor} size="sm" />
                          <p className="font-medium">{student.name}</p>
                        </div>
                        <Badge variant="neutral">{grade.letter ?? "—"}</Badge>
                      </li>
                    );
                  })}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="flex flex-col gap-6">
          {isStudent && (
            <Card>
              <CardHeader>
                <CardTitle>Your grade</CardTitle>
              </CardHeader>
              <CardContent>
                {(() => {
                  const grade = courseGradeForStudent(user.id, course.id);
                  return (
                    <>
                      <p className="font-display text-3xl font-semibold">{grade.letter ?? "—"}</p>
                      <p className="mt-1 text-sm text-muted">
                        {grade.percentage !== null ? `${grade.percentage}% overall` : "No grades posted yet"}
                      </p>
                      <p className="mt-3 text-sm text-muted">
                        {grade.gradedCount} of {grade.totalAssignments} assignments graded
                      </p>
                    </>
                  );
                })()}
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Course details</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Subject</span>
                <span className="font-medium">{course.subject}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Room</span>
                <span className="font-medium">{course.room}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Term</span>
                <span className="font-medium">{course.term}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Instructor</span>
                <span className="font-medium">{course.teacherName}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
