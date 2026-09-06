"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { StudentDashboard } from "@/components/dashboard/student/student-dashboard";
import { TeacherDashboard } from "@/components/dashboard/teacher/teacher-dashboard";
import { AdminDashboard } from "@/components/dashboard/admin/admin-dashboard";

export default function DashboardPage() {
  const { user } = useCurrentUser();
  if (!user) return null;

  if (user.role === "student") return <StudentDashboard student={user} />;
  if (user.role === "teacher") return <TeacherDashboard teacher={user} />;
  return <AdminDashboard admin={user} />;
}
