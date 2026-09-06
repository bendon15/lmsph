"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { Users, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { StatCard } from "@/components/shared/stat-card";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getTeacherById } from "@/lib/data/users";
import { getCoursesForTeacher } from "@/lib/data/courses";
import { getClassPerformance } from "@/lib/services/teacher-service";

export default function TeacherProfilePage({ params }: { params: Promise<{ teacherId: string }> }) {
  const { teacherId } = use(params);
  const { user } = useCurrentUser();
  const teacher = getTeacherById(teacherId);

  if (!teacher) notFound();
  if (!user || user.role !== "admin") return null;

  const courses = getCoursesForTeacher(teacher.id);
  const totalStudents = new Set(courses.flatMap((c) => c.studentIds)).size;
  const performance = getClassPerformance(teacher.id);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Avatar name={teacher.name} color={teacher.avatarColor} size="lg" />
        <div>
          <h1 className="font-display text-2xl font-semibold">{teacher.name}</h1>
          <p className="text-muted">{teacher.teacherId} · {teacher.department}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <StatCard label="Classes" value={String(courses.length)} icon={BookOpen} tint="primary" />
        <StatCard label="Students" value={String(totalStudents)} icon={Users} tint="emerald" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Classes taught</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col divide-y divide-border">
            {performance.map(({ course, average, studentCount }) => (
              <li key={course.id} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                <div>
                  <p className="font-medium">{course.name}</p>
                  <p className="text-sm text-muted">{course.room} · {studentCount} students</p>
                </div>
                <p className="text-sm font-medium text-muted">{average !== null ? `${average}% avg` : "No grades yet"}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
