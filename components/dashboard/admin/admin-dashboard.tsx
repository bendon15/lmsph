import Link from "next/link";
import { Users, UserSquare2, BookOpen, CheckCircle2, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SimpleAreaChart } from "@/components/charts/area-chart";
import { SimpleBarChart } from "@/components/charts/bar-chart";
import { AnnouncementCard } from "@/components/shared/announcement-card";
import { getSchoolOverview, getPerformanceBySubject } from "@/lib/services/admin-service";
import { getCourseById } from "@/lib/data/courses";
import type { Admin } from "@/lib/types";

function formatDay(date: string) {
  return new Date(date).toLocaleDateString("en-US", { weekday: "short" });
}

export function AdminDashboard({ admin }: { admin: Admin }) {
  const overview = getSchoolOverview();
  const subjectPerformance = getPerformanceBySubject();
  const attendanceData = overview.attendanceByDay.slice(-7).map((d) => ({
    day: formatDay(d.date),
    rate: d.rate,
  }));

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title={`Good morning, ${admin.name.split(" ")[0]}`}
        description="Here&apos;s how LMSPH is doing across the board today."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Students" value={String(overview.studentCount)} icon={Users} tint="primary" />
        <StatCard label="Teachers" value={String(overview.teacherCount)} icon={UserSquare2} tint="emerald" />
        <StatCard label="Courses" value={String(overview.courseCount)} icon={BookOpen} tint="amber" />
        <StatCard
          label="Attendance today"
          value={`${overview.latestAttendance}%`}
          icon={CheckCircle2}
          tint="rose"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Attendance, last 7 days</CardTitle>
              <Link href="/attendance" className="flex items-center gap-1 text-sm font-medium text-primary">
                Full report <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </CardHeader>
            <CardContent>
              <SimpleAreaChart data={attendanceData} dataKey="rate" labelKey="day" unit="%" domain={[70, 100]} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Performance by subject</CardTitle>
              <Link href="/analytics" className="flex items-center gap-1 text-sm font-medium text-primary">
                Analytics <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </CardHeader>
            <CardContent>
              <SimpleBarChart
                data={subjectPerformance.map((s) => ({ name: s.subject, grade: s.average }))}
                dataKey="grade"
                labelKey="name"
                color="#f59e0b"
                unit="%"
              />
            </CardContent>
          </Card>
        </div>

        <Card className="h-fit">
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle>School activity</CardTitle>
            <Link href="/activity" className="flex items-center gap-1 text-sm font-medium text-primary">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {overview.recentAnnouncements.map((a) => (
              <AnnouncementCard
                key={a.id}
                announcement={a}
                courseName={a.courseId ? getCourseById(a.courseId)?.name : undefined}
              />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
