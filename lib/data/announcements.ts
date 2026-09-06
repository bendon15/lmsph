import type { Announcement } from "@/lib/types";
import { daysFromToday } from "@/lib/data/constants";

export const announcements: Announcement[] = [
  {
    id: "an1",
    title: "Parent-Teacher Conference on October 2",
    body: "Sign-up slots open next Monday through the Guidance Office. Each conference is 15 minutes — parents and guardians are encouraged to bring the latest report card.",
    authorId: "a1",
    authorName: "Corazon Ibarra",
    authorRole: "admin",
    audience: "school",
    createdAt: `${daysFromToday(-1)}T08:00:00`,
    pinned: true,
  },
  {
    id: "an2",
    title: "Flag ceremony moved to the covered court",
    body: "Due to the weather advisory this week, the Monday flag ceremony will be held at the covered court instead of the school grounds. Please proceed there directly upon arrival.",
    authorId: "a1",
    authorName: "Corazon Ibarra",
    authorRole: "admin",
    audience: "school",
    createdAt: `${daysFromToday(-3)}T09:15:00`,
  },
  {
    id: "an3",
    title: "Periodic table quiz moved up",
    body: "We're moving the periodic table quiz to this Thursday so we can start the titration activity next week. Review the reading questions from Tuesday's class.",
    authorId: "t1",
    authorName: "Maria Santos",
    authorRole: "teacher",
    audience: "course",
    courseId: "c1",
    createdAt: `${daysFromToday(-2)}T14:30:00`,
  },
  {
    id: "an4",
    title: "Feedback sa reaction paper ay nasa portal na",
    body: "Nailagay ko na ang mga puna sa inyong reaction paper tungkol sa Rebolusyong Pilipino. Pakibasa muna bago isumite ang huling bersyon.",
    authorId: "t2",
    authorName: "Ramon Dela Cruz",
    authorRole: "teacher",
    audience: "course",
    courseId: "c2",
    createdAt: `${daysFromToday(-4)}T16:00:00`,
  },
  {
    id: "an5",
    title: "Extra help session before the unit test",
    body: "I'll be in Rm 301 during lunch this Thursday for anyone who wants to go over quadratic equations before next week's test. No need to sign up, just drop in.",
    authorId: "t3",
    authorName: "Angelica Reyes",
    authorRole: "teacher",
    audience: "course",
    courseId: "c3",
    createdAt: `${daysFromToday(-1)}T11:00:00`,
  },
  {
    id: "an6",
    title: "Brigada Eskwela volunteer sign-up",
    body: "This term's Brigada Eskwela cleanup and light-repair day is being finalized. Teachers and staff who'd like to help coordinate can sign up in the faculty room.",
    authorId: "a1",
    authorName: "Corazon Ibarra",
    authorRole: "admin",
    audience: "teachers",
    createdAt: `${daysFromToday(-6)}T07:45:00`,
  },
  {
    id: "an7",
    title: "Uniforms for Tinikling practice",
    body: "Please wear PE uniforms and rubber shoes for the rest of the week — we'll be rehearsing the Tinikling routine outdoors, weather permitting.",
    authorId: "t4",
    authorName: "Joseph Bautista",
    authorRole: "teacher",
    audience: "course",
    courseId: "c4",
    createdAt: `${daysFromToday(-5)}T10:00:00`,
  },
];

export function getAnnouncementsForAudience(params: {
  role: "student" | "teacher" | "admin";
  courseIds?: string[];
}) {
  const { role, courseIds = [] } = params;
  return announcements
    .filter((a) => {
      if (a.audience === "school") return true;
      if (a.audience === "teachers") return role === "teacher" || role === "admin";
      if (a.audience === "students") return role === "student" || role === "admin";
      if (a.audience === "course") return role === "admin" || (a.courseId && courseIds.includes(a.courseId));
      return false;
    })
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}
