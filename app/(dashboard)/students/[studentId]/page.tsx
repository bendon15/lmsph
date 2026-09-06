"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { CheckCircle2, GraduationCap, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { StatCard } from "@/components/shared/stat-card";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getStudentById } from "@/lib/data/users";
import { getCoursesForStudent } from "@/lib/data/courses";
import { attendanceRateForStudent } from "@/lib/data/attendance";
import { courseGradeForStudent, overallPercentageForStudent, letterFromPercentage } from "@/lib/services/grades";

export default function StudentProfilePage({ params }: { params: Promise<{ studentId: string }> }) {
  const { studentId } = use(params);
  const { user } = useCurrentUser();
  const student = getStudentById(studentId);

  if (!student) notFound();
  if (!user || user.role !== "admin") return null;

  const courses = getCoursesForStudent(student.id);
  const overallPct = overallPercentageForStudent(student.id, courses.map((c) => c.id));
  const attendanceRate = Math.round(attendanceRateForStudent(student.id) * 100);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Avatar name={student.name} color={student.avatarColor} size="lg" />
        <div>
          <h1 className="font-display text-2xl font-semibold">{student.name}</h1>
          <p className="text-muted">{student.studentId} · Grade {student.gradeLevel}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          label="Overall grade"
          value={overallPct !== null ? letterFromPercentage(overallPct) : "—"}
          icon={GraduationCap}
          tint="emerald"
          hint={overallPct !== null ? `${overallPct}% average` : undefined}
        />
        <StatCard label="Attendance" value={`${attendanceRate}%`} icon={CheckCircle2} tint="primary" hint="Last 15 school days" />
        <StatCard label="Courses" value={String(courses.length)} icon={BookOpen} tint="amber" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col divide-y divide-border">
            {courses.map((course) => {
              const grade = courseGradeForStudent(student.id, course.id);
              return (
                <li key={course.id} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                  <div>
                    <p className="font-medium">{course.name}</p>
                    <p className="text-sm text-muted">{course.teacherName}</p>
                  </div>
                  <Badge variant="neutral">{grade.letter ?? "—"}</Badge>
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
