import Link from "next/link";
import { BookOpen, Users, ClipboardCheck, TrendingUp, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { EmptyState } from "@/components/shared/empty-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SimpleBarChart } from "@/components/charts/bar-chart";
import { getTeacherDashboard } from "@/lib/services/teacher-service";
import { getAnnouncementsForAudience } from "@/lib/data/announcements";
import { AnnouncementCard } from "@/components/shared/announcement-card";
import type { Teacher } from "@/lib/types";

export function TeacherDashboard({ teacher }: { teacher: Teacher }) {
  const data = getTeacherDashboard(teacher.id);
  const announcements = getAnnouncementsForAudience({
    role: "teacher",
    courseIds: data.courses.map((c) => c.id),
  }).slice(0, 3);

  const firstName = teacher.name.split(" ")[0];
  const chartData = data.classPerformance
    .filter((p) => p.average !== null)
    .map((p) => ({ name: p.course.name.split(" ")[0], grade: p.average! }));

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title={`Welcome back, ${firstName}`}
        description="A quick look at your classes and what needs your attention."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Classes" value={String(data.courses.length)} icon={BookOpen} tint="primary" hint="This term" />
        <StatCard label="Students" value={String(data.totalStudents)} icon={Users} tint="emerald" hint="Across all classes" />
        <StatCard
          label="To grade"
          value={String(data.totalUngraded)}
          icon={ClipboardCheck}
          tint="amber"
          hint="Submissions waiting"
        />
        <StatCard
          label="Class average"
          value={
            chartData.length
              ? `${Math.round(chartData.reduce((s, c) => s + c.grade, 0) / chartData.length)}%`
              : "—"
          }
          icon={TrendingUp}
          tint="rose"
          hint="Across your classes"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Grading queue</CardTitle>
              <Link href="/gradebook" className="flex items-center gap-1 text-sm font-medium text-primary">
                Gradebook <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </CardHeader>
            <CardContent>
              {data.gradingQueue.length === 0 ? (
                <EmptyState icon={ClipboardCheck} title="Nothing waiting to be graded" description="You&apos;re fully caught up on submissions." />
              ) : (
                <ul className="flex flex-col divide-y divide-border">
                  {data.gradingQueue.map((row) => (
                    <li key={row.assignment.id} className="flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0">
                      <div className="min-w-0">
                        <p className="truncate font-medium">{row.assignment.title}</p>
                        <p className="text-sm text-muted">{row.courseName}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="warning">{row.ungraded} to grade</Badge>
                        <Link
                          href={`/submissions/${row.assignment.id}`}
                          className="text-sm font-medium text-primary"
                        >
                          Review
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Class performance</CardTitle>
            </CardHeader>
            <CardContent>
              {chartData.length === 0 ? (
                <EmptyState icon={TrendingUp} title="No grades yet" description="Averages will appear once assignments are graded." />
              ) : (
                <SimpleBarChart data={chartData} dataKey="grade" labelKey="name" color="#10b981" unit="%" />
              )}
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Your classes</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-col divide-y divide-border">
                {data.courses.map((course) => (
                  <li key={course.id} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                    <div>
                      <p className="font-medium">{course.name}</p>
                      <p className="text-sm text-muted">{course.room}</p>
                    </div>
                    <p className="text-sm font-medium text-muted">{course.studentIds.length} students</p>
                  </li>
                ))}
              </ul>
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
