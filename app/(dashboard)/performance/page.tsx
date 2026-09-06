"use client";

import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SimpleBarChart } from "@/components/charts/bar-chart";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getClassPerformance } from "@/lib/services/teacher-service";
import { getStudentById } from "@/lib/data/users";
import { courseGradeForStudent } from "@/lib/services/grades";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function PerformancePage() {
  const { user } = useCurrentUser();
  if (!user || user.role !== "teacher") return null;

  const performance = getClassPerformance(user.id);
  const chartData = performance
    .filter((p) => p.average !== null)
    .map((p) => ({ name: p.course.name.split(" ")[0], grade: p.average! }));

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Class performance" description="How each class is doing overall." />

      <Card>
        <CardHeader>
          <CardTitle>Average grade by class</CardTitle>
        </CardHeader>
        <CardContent>
          <SimpleBarChart data={chartData} dataKey="grade" labelKey="name" color="#10b981" unit="%" />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {performance.map(({ course }) => (
          <Card key={course.id}>
            <CardHeader>
              <CardTitle>{course.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-col divide-y divide-border">
                {course.studentIds.map((sid) => {
                  const student = getStudentById(sid);
                  if (!student) return null;
                  const grade = courseGradeForStudent(sid, course.id);
                  return (
                    <li key={sid} className="flex items-center justify-between gap-3 py-2.5 first:pt-0 last:pb-0">
                      <div className="flex items-center gap-2.5">
                        <Avatar name={student.name} color={student.avatarColor} size="sm" />
                        <span className="text-sm font-medium">{student.name}</span>
                      </div>
                      <Badge variant="neutral">{grade.letter ?? "—"}</Badge>
                    </li>
                  );
                })}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
