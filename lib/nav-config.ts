import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  GraduationCap,
  CalendarDays,
  Megaphone,
  Bell,
  Users,
  UserSquare2,
  CheckSquare,
  BarChart3,
  Activity,
  type LucideIcon,
} from "lucide-react";
import type { Role } from "@/lib/types";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: Record<Role, NavItem[]> = {
  student: [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Courses", href: "/courses", icon: BookOpen },
    { label: "Assignments", href: "/assignments", icon: ClipboardList },
    { label: "Grades", href: "/grades", icon: GraduationCap },
    { label: "Schedule", href: "/schedule", icon: CalendarDays },
    { label: "Announcements", href: "/announcements", icon: Megaphone },
    { label: "Notifications", href: "/notifications", icon: Bell },
  ],
  teacher: [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Classes", href: "/classes", icon: BookOpen },
    { label: "Assignments", href: "/assignments", icon: ClipboardList },
    { label: "Gradebook", href: "/gradebook", icon: CheckSquare },
    { label: "Performance", href: "/performance", icon: BarChart3 },
    { label: "Announcements", href: "/announcements", icon: Megaphone },
    { label: "Notifications", href: "/notifications", icon: Bell },
  ],
  admin: [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Students", href: "/students", icon: Users },
    { label: "Teachers", href: "/teachers", icon: UserSquare2 },
    { label: "Courses", href: "/courses", icon: BookOpen },
    { label: "Attendance", href: "/attendance", icon: CheckSquare },
    { label: "Analytics", href: "/analytics", icon: BarChart3 },
    { label: "Activity", href: "/activity", icon: Activity },
  ],
};

export const ROLE_LABEL: Record<Role, string> = {
  student: "Student",
  teacher: "Teacher",
  admin: "Administrator",
};
