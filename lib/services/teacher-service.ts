import { getCoursesForTeacher } from "@/lib/data/courses";
import { getAssignmentsForCourse, getSubmissionsForAssignment } from "@/lib/data/assignments";
import { TODAY } from "@/lib/data/constants";
import { courseGradeForStudent } from "@/lib/services/grades";

export function getTeacherClasses(teacherId: string) {
  return getCoursesForTeacher(teacherId);
}

export function getGradingQueue(teacherId: string, limit = 6) {
  const courses = getCoursesForTeacher(teacherId);
  const todayStr = TODAY.toISOString().slice(0, 10);
  const rows: {
    assignment: ReturnType<typeof getAssignmentsForCourse>[number];
    courseName: string;
    courseId: string;
    ungraded: number;
    total: number;
  }[] = [];

  for (const course of courses) {
    for (const assignment of getAssignmentsForCourse(course.id)) {
      if (assignment.dueDate > todayStr) continue; // not due yet, nothing to grade
      const subs = getSubmissionsForAssignment(assignment.id);
      const ungraded = subs.filter((s) => s.status === "submitted" || s.status === "late").length;
      if (ungraded > 0) {
        rows.push({ assignment, courseName: course.name, courseId: course.id, ungraded, total: subs.length });
      }
    }
  }

  return rows.sort((a, b) => b.ungraded - a.ungraded).slice(0, limit);
}

export function getClassPerformance(teacherId: string) {
  const courses = getCoursesForTeacher(teacherId);
  return courses.map((course) => {
    const grades = course.studentIds
      .map((studentId) => courseGradeForStudent(studentId, course.id))
      .filter((g) => g.percentage !== null) as { percentage: number }[];
    const avg =
      grades.length > 0
        ? Math.round((grades.reduce((s, g) => s + g.percentage, 0) / grades.length) * 10) / 10
        : null;
    return { course, average: avg, studentCount: course.studentIds.length };
  });
}

export function getTeacherDashboard(teacherId: string) {
  const courses = getCoursesForTeacher(teacherId);
  const totalStudents = new Set(courses.flatMap((c) => c.studentIds)).size;
  const gradingQueue = getGradingQueue(teacherId);
  const totalUngraded = gradingQueue.reduce((sum, r) => sum + r.ungraded, 0);

  return {
    courses,
    totalStudents,
    gradingQueue,
    totalUngraded,
    classPerformance: getClassPerformance(teacherId),
  };
}
