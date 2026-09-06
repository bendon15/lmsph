import type { AppNotification } from "@/lib/types";
import { daysFromToday } from "@/lib/data/constants";
import { DEMO_STUDENT_ID, DEMO_TEACHER_ID, DEMO_ADMIN_ID } from "@/lib/data/users";

export const notifications: AppNotification[] = [
  {
    id: "n1",
    userId: DEMO_STUDENT_ID,
    title: "Grade posted: Araling Panlipunan sanaysay",
    message: "Ramon Dela Cruz graded your Rebolusyong Pilipino reaction paper — 92/100.",
    createdAt: `${daysFromToday(-1)}T15:20:00`,
    read: false,
    href: "/grades",
  },
  {
    id: "n2",
    userId: DEMO_STUDENT_ID,
    title: "Assignment due today",
    message: "Ecosystems and biodiversity quiz for Science 10 is due by 11:59 PM.",
    createdAt: `${daysFromToday(0)}T07:00:00`,
    read: false,
    href: "/assignments",
  },
  {
    id: "n3",
    userId: DEMO_STUDENT_ID,
    title: "New announcement",
    message: "Angelica Reyes posted an extra help session before the quadratic equations test.",
    createdAt: `${daysFromToday(-1)}T11:05:00`,
    read: true,
    href: "/announcements",
  },
  {
    id: "n4",
    userId: DEMO_TEACHER_ID,
    title: "12 new submissions",
    message: "Periodic table reading questions has new submissions ready to grade.",
    createdAt: `${daysFromToday(-3)}T18:00:00`,
    read: false,
    href: "/submissions/as3",
  },
  {
    id: "n5",
    userId: DEMO_TEACHER_ID,
    title: "Reminder: periodic table quiz",
    message: "Your rescheduled periodic table quiz is set for this Thursday.",
    createdAt: `${daysFromToday(-2)}T09:00:00`,
    read: true,
    href: "/assignments",
  },
  {
    id: "n6",
    userId: DEMO_ADMIN_ID,
    title: "Attendance dipped in Grade 10",
    message: "Grade 10 attendance is down 4% compared to last week.",
    createdAt: `${daysFromToday(-1)}T08:30:00`,
    read: false,
    href: "/attendance",
  },
  {
    id: "n7",
    userId: DEMO_ADMIN_ID,
    title: "New teacher onboarding scheduled",
    message: "Onboarding for this term's new hires is confirmed for Monday.",
    createdAt: `${daysFromToday(-6)}T07:50:00`,
    read: true,
    href: "/announcements",
  },
];

export function getNotificationsForUser(userId: string) {
  return notifications
    .filter((n) => n.userId === userId)
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}
