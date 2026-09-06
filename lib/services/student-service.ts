import { getCoursesForStudent } from "@/lib/data/courses";
import { getAssignmentsForCourse, getSubmission } from "@/lib/data/assignments";
import { getScheduleForCourses, DAYS } from "@/lib/data/schedule";
import { attendanceRateForStudent } from "@/lib/data/attendance";
import { TODAY } from "@/lib/data/constants";
import { courseGradeForStudent, overallPercentageForStudent, letterFromPercentage } from "@/lib/services/grades";
import type { Assignment, Course } from "@/lib/types";

export function getStudentCourses(studentId: string) {
  return getCoursesForStudent(studentId);
}

export interface UpcomingItem {
  assignment: Assignment;
  course: Course;
  status: "upcoming" | "due_today" | "overdue" | "submitted";
}

export function getUpcomingAssignments(studentId: string, limit = 6): UpcomingItem[] {
  const courses = getCoursesForStudent(studentId);
  const todayStr = TODAY.toISOString().slice(0, 10);

  const items: UpcomingItem[] = [];
  for (const course of courses) {
    for (const assignment of getAssignmentsForCourse(course.id)) {
      const submission = getSubmission(assignment.id, studentId);
      if (submission?.status === "submitted" || submission?.status === "graded") continue;
      if (assignment.dueDate < todayStr) {
        items.push({ assignment, course, status: "overdue" });
      } else if (assignment.dueDate === todayStr) {
        items.push({ assignment, course, status: "due_today" });
      } else {
        items.push({ assignment, course, status: "upcoming" });
      }
    }
  }

  return items
    .sort((a, b) => (a.assignment.dueDate < b.assignment.dueDate ? -1 : 1))
    .slice(0, limit);
}

export function getTodaysSchedule(studentId: string) {
  const courses = getCoursesForStudent(studentId);
  const dayIndex = TODAY.getDay(); // 0 sun .. 6 sat
  const dayLabel = DAYS[dayIndex - 1]; // Mon=index0 in DAYS
  if (!dayLabel) return { day: null, entries: [] };
  const entries = getScheduleForCourses(courses.map((c) => c.id)).filter(
    (e) => e.day === dayLabel
  );
  return {
    day: dayLabel,
    entries: entries
      .map((e) => ({ ...e, course: courses.find((c) => c.id === e.courseId)! }))
      .sort((a, b) => (a.startTime < b.startTime ? -1 : 1)),
  };
}

export function getStudentDashboard(studentId: string) {
  const courses = getCoursesForStudent(studentId);
  const courseIds = courses.map((c) => c.id);
  const overallPct = overallPercentageForStudent(studentId, courseIds);

  return {
    courses,
    upcoming: getUpcomingAssignments(studentId),
    todaysSchedule: getTodaysSchedule(studentId),
    attendanceRate: attendanceRateForStudent(studentId),
    overallPercentage: overallPct,
    overallLetter: overallPct !== null ? letterFromPercentage(overallPct) : null,
    courseGrades: courses.map((c) => ({ course: c, grade: courseGradeForStudent(studentId, c.id) })),
  };
}
