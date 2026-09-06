"use client";

import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SimpleBarChart } from "@/components/charts/bar-chart";
import { SimpleAreaChart } from "@/components/charts/area-chart";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getPerformanceBySubject, getEnrollmentByGrade, getSchoolOverview } from "@/lib/services/admin-service";

function formatDay(date: string) {
  return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function AnalyticsPage() {
  const { user } = useCurrentUser();
  if (!user || user.role !== "admin") return null;

  const subjectPerformance = getPerformanceBySubject();
  const enrollment = getEnrollmentByGrade().map((e) => ({ grade: `Grade ${e.grade}`, count: e.count }));
  const overview = getSchoolOverview();
  const attendanceByDay = overview.attendanceByDay.map((d) => ({ day: formatDay(d.date), rate: d.rate }));

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Analytics" description="Performance and enrollment trends across the school." />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Average grade by subject</CardTitle>
          </CardHeader>
          <CardContent>
            <SimpleBarChart
              data={subjectPerformance.map((s) => ({ name: s.subject, grade: s.average }))}
              dataKey="grade"
              labelKey="name"
              color="#4f46e5"
              unit="%"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Enrollment by grade level</CardTitle>
          </CardHeader>
          <CardContent>
            <SimpleBarChart data={enrollment} dataKey="count" labelKey="grade" color="#f59e0b" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Attendance trend</CardTitle>
        </CardHeader>
        <CardContent>
          <SimpleAreaChart data={attendanceByDay} dataKey="rate" labelKey="day" unit="%" domain={[70, 100]} />
        </CardContent>
      </Card>
    </div>
  );
}
