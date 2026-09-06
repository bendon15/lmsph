"use client";

import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable, type DataTableColumn } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getCoursesForStudent, getCoursesForTeacher } from "@/lib/data/courses";
import { getAssignmentsForCourse, getSubmission, getSubmissionsForAssignment } from "@/lib/data/assignments";
import { TODAY } from "@/lib/data/constants";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function AssignmentsPage() {
  const { user } = useCurrentUser();
  if (!user) return null;
  const todayStr = TODAY.toISOString().slice(0, 10);

  if (user.role === "student") {
    const courses = getCoursesForStudent(user.id);
    const rows = courses.flatMap((course) =>
      getAssignmentsForCourse(course.id).map((a) => ({ assignment: a, courseName: course.name }))
    );

    const columns: DataTableColumn<(typeof rows)[number]>[] = [
      {
        header: "Assignment",
        render: (row) => (
          <Link href={`/assignments/${row.assignment.id}`} className="font-medium hover:text-primary">
            {row.assignment.title}
          </Link>
        ),
      },
      { header: "Course", render: (row) => <span className="text-muted">{row.courseName}</span> },
      { header: "Due", render: (row) => formatDate(row.assignment.dueDate) },
      { header: "Points", render: (row) => row.assignment.points },
      {
        header: "Status",
        render: (row) => {
          const sub = getSubmission(row.assignment.id, user.id);
          if (sub?.status === "graded") return <Badge variant="success">Graded · {sub.score}/{row.assignment.points}</Badge>;
          if (sub?.status === "submitted") return <Badge variant="primary">Submitted</Badge>;
          if (sub?.status === "late") return <Badge variant="warning">Late</Badge>;
          if (sub?.status === "missing") return <Badge variant="danger">Missing</Badge>;
          if (row.assignment.dueDate < todayStr) return <Badge variant="danger">Overdue</Badge>;
          if (row.assignment.dueDate === todayStr) return <Badge variant="warning">Due today</Badge>;
          return <Badge variant="neutral">Upcoming</Badge>;
        },
      },
    ];

    return (
      <div className="flex flex-col gap-6">
        <PageHeader title="Assignments" description="Every assignment across your courses, in one list." />
        <DataTable
          data={rows.sort((a, b) => (a.assignment.dueDate < b.assignment.dueDate ? -1 : 1))}
          columns={columns}
          searchKey={(row) => `${row.assignment.title} ${row.courseName}`}
          searchPlaceholder="Search assignments…"
          emptyTitle="No assignments found"
          emptyDescription="Try a different search."
        />
      </div>
    );
  }

  // Teacher view
  const courses = getCoursesForTeacher(user.id);
  const rows = courses.flatMap((course) =>
    getAssignmentsForCourse(course.id).map((a) => ({ assignment: a, courseName: course.name, courseId: course.id }))
  );

  const columns: DataTableColumn<(typeof rows)[number]>[] = [
    { header: "Assignment", render: (row) => <span className="font-medium">{row.assignment.title}</span> },
    { header: "Class", render: (row) => <span className="text-muted">{row.courseName}</span> },
    { header: "Due", render: (row) => formatDate(row.assignment.dueDate) },
    { header: "Points", render: (row) => row.assignment.points },
    {
      header: "Submissions",
      render: (row) => {
        const subs = getSubmissionsForAssignment(row.assignment.id);
        const graded = subs.filter((s) => s.status === "graded").length;
        return <span className="text-muted">{graded}/{subs.length} graded</span>;
      },
    },
    {
      header: "",
      render: (row) => (
        <Link href={`/submissions/${row.assignment.id}`} className="text-sm font-medium text-primary">
          Review
        </Link>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Assignments" description="Everything assigned across your classes this term." />
      <DataTable
        data={rows.sort((a, b) => (a.assignment.dueDate < b.assignment.dueDate ? -1 : 1))}
        columns={columns}
        searchKey={(row) => `${row.assignment.title} ${row.courseName}`}
        searchPlaceholder="Search assignments…"
        emptyTitle="No assignments found"
        emptyDescription="Try a different search."
      />
    </div>
  );
}
