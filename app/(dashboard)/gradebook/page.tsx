"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getCoursesForTeacher } from "@/lib/data/courses";
import { getAssignmentsForCourse, getSubmission } from "@/lib/data/assignments";
import { getStudentById } from "@/lib/data/users";
import { courseGradeForStudent } from "@/lib/services/grades";
import { cn } from "@/lib/utils";

export default function GradebookPage() {
  const { user } = useCurrentUser();
  const courses = user?.role === "teacher" ? getCoursesForTeacher(user.id) : [];
  const [activeCourse, setActiveCourse] = useState(courses[0]?.id);

  if (!user || user.role !== "teacher") return null;
  const course = courses.find((c) => c.id === activeCourse) ?? courses[0];
  if (!course) return null;

  const assignments = getAssignmentsForCourse(course.id);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Gradebook" description="Every score for every student, at a glance." />

      <Tabs value={course.id} onValueChange={setActiveCourse}>
        <TabsList>
          {courses.map((c) => (
            <TabsTrigger key={c.id} value={c.id}>
              {c.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={course.id}>
          <div className="overflow-x-auto rounded-lg border border-border bg-surface">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-wide text-muted">
                  <th className="sticky left-0 z-10 bg-surface px-5 py-3 font-medium">Student</th>
                  {assignments.map((a) => (
                    <th key={a.id} className="min-w-[110px] px-4 py-3 font-medium">
                      {a.title.length > 16 ? a.title.slice(0, 14) + "…" : a.title}
                    </th>
                  ))}
                  <th className="px-4 py-3 font-medium">Overall</th>
                </tr>
              </thead>
              <tbody>
                {course.studentIds.map((sid) => {
                  const student = getStudentById(sid);
                  if (!student) return null;
                  const grade = courseGradeForStudent(sid, course.id);
                  return (
                    <tr key={sid} className="border-b border-border/60 last:border-0">
                      <td className="sticky left-0 z-10 flex items-center gap-2.5 bg-surface px-5 py-3">
                        <Avatar name={student.name} color={student.avatarColor} size="sm" />
                        <span className="whitespace-nowrap font-medium">{student.name}</span>
                      </td>
                      {assignments.map((a) => {
                        const sub = getSubmission(a.id, sid);
                        return (
                          <td key={a.id} className="px-4 py-3 text-muted">
                            {sub?.score !== null && sub?.score !== undefined
                              ? `${sub.score}/${a.points}`
                              : sub?.status === "missing"
                              ? <span className="text-rose">Missing</span>
                              : "—"}
                          </td>
                        );
                      })}
                      <td className={cn("px-4 py-3 font-semibold", grade.letter ? "" : "text-muted")}>
                        {grade.letter ?? "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
