"use client";

import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable, type DataTableColumn } from "@/components/shared/data-table";
import { Avatar } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { teachers } from "@/lib/data/users";
import { getCoursesForTeacher } from "@/lib/data/courses";

export default function TeachersPage() {
  const { user } = useCurrentUser();
  if (!user || user.role !== "admin") return null;

  const columns: DataTableColumn<(typeof teachers)[number]>[] = [
    {
      header: "Teacher",
      render: (t) => (
        <Link href={`/teachers/${t.id}`} className="flex items-center gap-3 hover:text-primary">
          <Avatar name={t.name} color={t.avatarColor} size="sm" />
          <div>
            <p className="font-medium">{t.name}</p>
            <p className="text-xs text-muted">{t.teacherId}</p>
          </div>
        </Link>
      ),
    },
    { header: "Department", render: (t) => t.department },
    { header: "Classes", render: (t) => getCoursesForTeacher(t.id).length },
    {
      header: "Students",
      render: (t) => new Set(getCoursesForTeacher(t.id).flatMap((c) => c.studentIds)).size,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Teachers" description={`${teachers.length} teachers on staff.`} />
      <DataTable
        data={teachers}
        columns={columns}
        searchKey={(t) => `${t.name} ${t.department}`}
        searchPlaceholder="Search teachers…"
      />
    </div>
  );
}
