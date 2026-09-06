"use client";

import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable, type DataTableColumn } from "@/components/shared/data-table";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { SimpleAreaChart } from "@/components/charts/area-chart";
import { useCurrentUser } from "@/hooks/use-current-user";
import { schoolWideAttendanceByDay, attendanceRateForStudent } from "@/lib/data/attendance";
import { students } from "@/lib/data/users";

function formatDay(date: string) {
  return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function AttendancePage() {
  const { user } = useCurrentUser();
  if (!user || user.role !== "admin") return null;

  const attendanceByDay = schoolWideAttendanceByDay().map((d) => ({ day: formatDay(d.date), rate: d.rate }));
  const rows = students.map((s) => ({ student: s, rate: Math.round(attendanceRateForStudent(s.id) * 100) }));

  const columns: DataTableColumn<(typeof rows)[number]>[] = [
    {
      header: "Student",
      render: (row) => (
        <div className="flex items-center gap-3">
          <Avatar name={row.student.name} color={row.student.avatarColor} size="sm" />
          <p className="font-medium">{row.student.name}</p>
        </div>
      ),
    },
    { header: "Grade", render: (row) => `Grade ${row.student.gradeLevel}` },
    {
      header: "Attendance rate",
      render: (row) => <Badge variant={row.rate < 90 ? "warning" : "success"}>{row.rate}%</Badge>,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Attendance" description="School-wide attendance trends and per-student rates." />

      <Card>
        <CardHeader>
          <CardTitle>Last 15 school days</CardTitle>
        </CardHeader>
        <CardContent>
          <SimpleAreaChart data={attendanceByDay} dataKey="rate" labelKey="day" unit="%" domain={[70, 100]} />
        </CardContent>
      </Card>

      <DataTable data={rows} columns={columns} searchKey={(r) => r.student.name} searchPlaceholder="Search students…" />
    </div>
  );
}
