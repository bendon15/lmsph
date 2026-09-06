import Link from "next/link";
import { BookOpen, CalendarClock, CheckCircle2, GraduationCap, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { EmptyState } from "@/components/shared/empty-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SimpleBarChart } from "@/components/charts/bar-chart";
import { getStudentDashboard } from "@/lib/services/student-service";
import { getAnnouncementsForAudience } from "@/lib/data/announcements";
import { AnnouncementCard } from "@/components/shared/announcement-card";
import type { Student } from "@/lib/types";

const statusStyles: Record<string, { label: string; variant: "warning" | "danger" | "neutral" }> = {
  due_today: { label: "Due today", variant: "warning" },
  overdue: { label: "Overdue", variant: "danger" },
  upcoming: { label: "Upcoming", variant: "neutral" },
};

export function StudentDashboard({ student }: { student: Student }) {
  const data = getStudentDashboard(student.id);
  const announcements = getAnnouncementsForAudience({
    role: "student",
    courseIds: data.courses.map((c) => c.id),
  }).slice(0, 3);

  const firstName = student.name.split(" ")[0];
  const chartData = data.courseGrades
    .filter((g) => g.grade.percentage !== null)
    .map((g) => ({ name: g.course.name.split(" ")[0], grade: g.grade.percentage! }));

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title={`Good to see you, ${firstName}`}
        description="Here&apos;s where things stand across your classes today."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Overall grade"
          value={data.overallLetter ?? "—"}
          icon={GraduationCap}
          tint="emerald"
          hint={data.overallPercentage ? `${data.overallPercentage}% average` : "No grades yet"}
        />
        <StatCard
          label="Due this week"
          value={String(data.upcoming.length)}
          icon={CalendarClock}
          tint="amber"
          hint="Assignments not yet submitted"
        />
        <StatCard
          label="Attendance"
          value={`${Math.round(data.attendanceRate * 100)}%`}
          icon={CheckCircle2}
          tint="primary"
          hint="Last 15 school days"
        />
        <StatCard
          label="Courses"
          value={String(data.courses.length)}
          icon={BookOpen}
          tint="rose"
          hint="This term"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Up next</CardTitle>
              <Link href="/assignments" className="flex items-center gap-1 text-sm font-medium text-primary">
                View all <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </CardHeader>
            <CardContent>
              {data.upcoming.length === 0 ? (
                <EmptyState
                  icon={CheckCircle2}
                  title="You&apos;re all caught up"
                  description="Nothing due right now — nice work staying ahead."
                />
              ) : (
                <ul className="flex flex-col divide-y divide-border">
                  {data.upcoming.map(({ assignment, course, status }) => (
                    <li key={assignment.id} className="flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0">
                      <div className="min-w-0">
                        <p className="truncate font-medium">{assignment.title}</p>
                        <p className="text-sm text-muted">{course.name} · {assignment.points} pts</p>
                      </div>
                      <Badge variant={statusStyles[status]?.variant ?? "neutral"}>
                        {statusStyles[status]?.label ?? "Upcoming"}
                      </Badge>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Grades by course</CardTitle>
            </CardHeader>
            <CardContent>
              {chartData.length === 0 ? (
                <EmptyState icon={GraduationCap} title="No grades yet" description="Grades will show up here as your teachers post them." />
              ) : (
                <SimpleBarChart data={chartData} dataKey="grade" labelKey="name" color="#4f46e5" unit="%" />
              )}
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Today&apos;s classes</CardTitle>
              <Link href="/schedule" className="flex items-center gap-1 text-sm font-medium text-primary">
                Full week <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </CardHeader>
            <CardContent>
              {data.todaysSchedule.entries.length === 0 ? (
                <EmptyState icon={CalendarClock} title="No classes today" description="Enjoy the day off from the schedule." />
              ) : (
                <ul className="flex flex-col divide-y divide-border">
                  {data.todaysSchedule.entries.map((entry) => (
                    <li key={entry.id} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                      <div>
                        <p className="font-medium">{entry.course.name}</p>
                        <p className="text-sm text-muted">{entry.course.room}</p>
                      </div>
                      <p className="text-sm font-medium text-muted">{entry.startTime}</p>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Announcements</CardTitle>
              <Link href="/announcements" className="flex items-center gap-1 text-sm font-medium text-primary">
                View all <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {announcements.map((a) => (
                <AnnouncementCard key={a.id} announcement={a} />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
