"use client";

import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable, type DataTableColumn } from "@/components/shared/data-table";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useCurrentUser } from "@/hooks/use-current-user";
import { students } from "@/lib/data/users";
import { getCoursesForStudent } from "@/lib/data/courses";
import { attendanceRateForStudent } from "@/lib/data/attendance";

export default function StudentsPage() {
  const { user } = useCurrentUser();
  if (!user || user.role !== "admin") return null;

  const columns: DataTableColumn<(typeof students)[number]>[] = [
    {
      header: "Student",
      render: (s) => (
        <Link href={`/students/${s.id}`} className="flex items-center gap-3 hover:text-primary">
          <Avatar name={s.name} color={s.avatarColor} size="sm" />
          <div>
            <p className="font-medium">{s.name}</p>
            <p className="text-xs text-muted">{s.studentId}</p>
          </div>
        </Link>
      ),
    },
    { header: "Grade", render: (s) => `Grade ${s.gradeLevel}` },
    { header: "Courses", render: (s) => getCoursesForStudent(s.id).length },
    {
      header: "Attendance",
      render: (s) => {
        const rate = Math.round(attendanceRateForStudent(s.id) * 100);
        return <Badge variant={rate < 90 ? "warning" : "success"}>{rate}%</Badge>;
      },
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Students" description={`${students.length} students enrolled this term.`} />
      <DataTable
        data={students}
        columns={columns}
        searchKey={(s) => `${s.name} ${s.studentId}`}
        searchPlaceholder="Search students…"
      />
    </div>
  );
}
