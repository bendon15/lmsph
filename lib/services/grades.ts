import { assignments, submissions } from "@/lib/data/assignments";

// DepEd (Philippine K to 12) grading descriptors, abbreviated to read
// well in compact badges — mirrors how report cards describe performance
// bands rather than using US-style letter grades.
export function letterFromPercentage(pct: number): string {
  if (pct >= 90) return "O"; // Outstanding
  if (pct >= 85) return "VS"; // Very Satisfactory
  if (pct >= 80) return "S"; // Satisfactory
  if (pct >= 75) return "FS"; // Fairly Satisfactory
  return "DNM"; // Did Not Meet Expectations
}

export const GRADE_DESCRIPTOR_LABEL: Record<string, string> = {
  O: "Outstanding",
  VS: "Very Satisfactory",
  S: "Satisfactory",
  FS: "Fairly Satisfactory",
  DNM: "Did Not Meet Expectations",
};

export interface CourseGrade {
  courseId: string;
  percentage: number | null;
  letter: string | null;
  gradedCount: number;
  totalAssignments: number;
}

export function courseGradeForStudent(studentId: string, courseId: string): CourseGrade {
  const courseAssignments = assignments.filter((a) => a.courseId === courseId);
  const graded = courseAssignments
    .map((a) => ({
      assignment: a,
      submission: submissions.find(
        (s) => s.assignmentId === a.id && s.studentId === studentId && s.score !== null
      ),
    }))
    .filter((entry) => entry.submission);

  if (graded.length === 0) {
    return {
      courseId,
      percentage: null,
      letter: null,
      gradedCount: 0,
      totalAssignments: courseAssignments.length,
    };
  }

  const earned = graded.reduce((sum, e) => sum + (e.submission!.score ?? 0), 0);
  const possible = graded.reduce((sum, e) => sum + e.assignment.points, 0);
  const percentage = Math.round((earned / possible) * 1000) / 10;

  return {
    courseId,
    percentage,
    letter: letterFromPercentage(percentage),
    gradedCount: graded.length,
    totalAssignments: courseAssignments.length,
  };
}

export function overallPercentageForStudent(studentId: string, courseIds: string[]) {
  const grades = courseIds
    .map((id) => courseGradeForStudent(studentId, id))
    .filter((g) => g.percentage !== null) as (CourseGrade & { percentage: number })[];
  if (grades.length === 0) return null;
  const avg = grades.reduce((sum, g) => sum + g.percentage, 0) / grades.length;
  return Math.round(avg * 10) / 10;
}
