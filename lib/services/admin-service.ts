import { courses } from "@/lib/data/courses";
import { students, teachers } from "@/lib/data/users";
import { schoolWideAttendanceByDay, attendanceRateForStudent } from "@/lib/data/attendance";
import { courseGradeForStudent } from "@/lib/services/grades";
import { announcements } from "@/lib/data/announcements";

export function getSchoolOverview() {
  const attendanceByDay = schoolWideAttendanceByDay();
  const latestAttendance = attendanceByDay[attendanceByDay.length - 1]?.rate ?? 0;

  const allGrades = students.flatMap((s) =>
    courses
      .filter((c) => c.studentIds.includes(s.id))
      .map((c) => courseGradeForStudent(s.id, c.id))
  ).filter((g) => g.percentage !== null) as { percentage: number }[];

  const schoolAverage =
    allGrades.length > 0
      ? Math.round((allGrades.reduce((s, g) => s + g.percentage, 0) / allGrades.length) * 10) / 10
      : null;

  return {
    studentCount: students.length,
    teacherCount: teachers.length,
    courseCount: courses.length,
    latestAttendance,
    attendanceByDay,
    schoolAverage,
    recentAnnouncements: announcements.slice(0, 5),
  };
}

export function getPerformanceBySubject() {
  const subjects = Array.from(new Set(courses.map((c) => c.subject)));
  return subjects.map((subject) => {
    const subjectCourses = courses.filter((c) => c.subject === subject);
    const grades = subjectCourses.flatMap((c) =>
      c.studentIds.map((sid) => courseGradeForStudent(sid, c.id))
    ).filter((g) => g.percentage !== null) as { percentage: number }[];
    const avg =
      grades.length > 0
        ? Math.round((grades.reduce((s, g) => s + g.percentage, 0) / grades.length) * 10) / 10
        : 0;
    return { subject, average: avg };
  });
}

export function getEnrollmentByGrade() {
  const byGrade = new Map<number, number>();
  for (const s of students) {
    byGrade.set(s.gradeLevel, (byGrade.get(s.gradeLevel) ?? 0) + 1);
  }
  return Array.from(byGrade.entries()).map(([grade, count]) => ({ grade, count }));
}

export function studentAttendanceSummaries() {
  return students.map((s) => ({ student: s, rate: attendanceRateForStudent(s.id) }));
}
