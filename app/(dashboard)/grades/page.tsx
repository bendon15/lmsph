"use client";

import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { SimpleBarChart } from "@/components/charts/bar-chart";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getStudentDashboard } from "@/lib/services/student-service";

export default function GradesPage() {
  const { user } = useCurrentUser();
  if (!user || user.role !== "student") return null;

  const data = getStudentDashboard(user.id);
  const chartData = data.courseGrades
    .filter((g) => g.grade.percentage !== null)
    .map((g) => ({ name: g.course.name.split(" ")[0], grade: g.grade.percentage! }));

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Grades"
        description={
          data.overallPercentage
            ? `Overall average: ${data.overallPercentage}% (${data.overallLetter})`
            : "Grades will appear as your teachers post them."
        }
      />

      {chartData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>By course</CardTitle>
          </CardHeader>
          <CardContent>
            <SimpleBarChart data={chartData} dataKey="grade" labelKey="name" color="#4f46e5" unit="%" />
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {data.courseGrades.map(({ course, grade }) => (
          <Card key={course.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-base font-semibold">{course.name}</h3>
                <Badge variant="neutral">{grade.letter ?? "—"}</Badge>
              </div>
              <p className="mt-1 text-sm text-muted">{course.teacherName}</p>
              <div className="mt-4">
                <div className="flex justify-between text-xs text-muted">
                  <span>{grade.gradedCount}/{grade.totalAssignments} graded</span>
                  {grade.percentage !== null && <span>{grade.percentage}%</span>}
                </div>
                <Progress value={grade.percentage ?? 0} className="mt-1.5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
