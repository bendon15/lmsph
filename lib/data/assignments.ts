import type { Assignment, Submission } from "@/lib/types";
import { courses } from "@/lib/data/courses";
import { daysFromToday } from "@/lib/data/constants";

export const assignments: Assignment[] = [
  // Biology I (c1)
  { id: "as1", courseId: "c1", title: "Ecosystems and biodiversity quiz", description: "Multiple choice quiz covering food webs, biodiversity, and ecological relationships.", type: "quiz", dueDate: daysFromToday(0), points: 20 },
  { id: "as2", courseId: "c1", title: "Force and motion lab report", description: "Write up your results from the pulley and inclined plane experiment.", type: "project", dueDate: daysFromToday(5), points: 50 },
  { id: "as3", courseId: "c1", title: "Periodic table reading questions", description: "Answer the review questions on element groups and periodic trends.", type: "homework", dueDate: daysFromToday(-4), points: 15 },
  { id: "as4", courseId: "c1", title: "Genetics and heredity exam", description: "Covers Mendelian genetics through Punnett squares.", type: "exam", dueDate: daysFromToday(12), points: 100 },

  // World History (c2)
  { id: "as5", courseId: "c2", title: "Sanaysay: Panahon ng Rebolusyong Pilipino", description: "800-word reaction paper on the social causes of the Philippine Revolution.", type: "essay", dueDate: daysFromToday(-2), points: 100 },
  { id: "as6", courseId: "c2", title: "Pagsusuri ng primaryang sanggunian", description: "Suriin ang ibinigay na akda at sagutin ang mga gabay na tanong.", type: "homework", dueDate: daysFromToday(3), points: 25 },
  { id: "as7", courseId: "c2", title: "Mapa kuwiz: Timog-Silangang Asya", description: "Tukuyin ang mga bansa sa Timog-Silangang Asya at ang kanilang kabisera.", type: "quiz", dueDate: daysFromToday(-9), points: 20 },

  // Algebra II (c3)
  { id: "as8", courseId: "c3", title: "Problem set 6: Polynomials", description: "Practice problems on factoring and the remainder theorem.", type: "homework", dueDate: daysFromToday(1), points: 30 },
  { id: "as9", courseId: "c3", title: "Quadratics unit test", description: "Covers completing the square, the quadratic formula, and graphing.", type: "exam", dueDate: daysFromToday(-6), points: 100 },
  { id: "as10", courseId: "c3", title: "Problem set 7: Rational expressions", description: "Simplifying and solving rational expressions.", type: "homework", dueDate: daysFromToday(8), points: 30 },

  // Studio Art (c4)
  { id: "as11", courseId: "c4", title: "Folk dance performance — Tinikling", description: "Perform the Tinikling routine practiced in class, in pairs.", type: "project", dueDate: daysFromToday(2), points: 40 },
  { id: "as12", courseId: "c4", title: "Health worksheet: Nutrition and wellness", description: "Complete the food pyramid and balanced-diet planning exercises.", type: "homework", dueDate: daysFromToday(-7), points: 15 },

  // Chemistry (c5)
  { id: "as13", courseId: "c5", title: "Reading comprehension worksheet", description: "Answer the inference and vocabulary-in-context questions on the assigned passage.", type: "homework", dueDate: daysFromToday(4), points: 25 },
  { id: "as14", courseId: "c5", title: "Grammar and vocabulary quiz", description: "Short quiz on subject-verb agreement and this unit's vocabulary list.", type: "quiz", dueDate: daysFromToday(-10), points: 10 },

  // U.S. Government (c6)
  { id: "as15", courseId: "c6", title: "Sanaysay: Pananagutang Panlipunan", description: "Ipaliwanag ang kahalagahan ng pananagutang panlipunan gamit ang tunay na halimbawa.", type: "essay", dueDate: daysFromToday(6), points: 60 },
];

export function getAssignmentsForCourse(courseId: string) {
  return assignments.filter((a) => a.courseId === courseId);
}

export function getAssignmentById(id: string) {
  return assignments.find((a) => a.id === id) ?? null;
}

// --- Submissions -----------------------------------------------------

function hashSeed(input: string) {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash;
}

// Deterministic pseudo-random in [0, 1) seeded per (assignment, student) pair,
// so results are stable across server/client renders without a real backend.
function seededRandom(seed: string) {
  const x = Math.sin(hashSeed(seed)) * 10000;
  return x - Math.floor(x);
}

function buildSubmissions(): Submission[] {
  const result: Submission[] = [];

  for (const assignment of assignments) {
    const course = courses.find((c) => c.id === assignment.courseId);
    if (!course) continue;
    const isPast = assignment.dueDate < daysFromToday(0);

    for (const studentId of course.studentIds) {
      const seed = `${assignment.id}:${studentId}`;
      const r = seededRandom(seed);
      let status: Submission["status"];
      let score: number | null = null;
      let submittedAt: string | null = null;

      if (!isPast) {
        // Future/current assignments: mostly not submitted yet, a few early birds.
        status = r > 0.82 ? "submitted" : "not_submitted";
        submittedAt = status === "submitted" ? assignment.dueDate : null;
      } else {
        // Past assignments: graded, with a small chance of late or missing work.
        if (r > 0.93) {
          status = "missing";
        } else if (r > 0.85) {
          status = "late";
          score = Math.round((0.55 + r * 0.3) * assignment.points);
          submittedAt = assignment.dueDate;
        } else {
          status = "graded";
          score = Math.round((0.7 + r * 0.3) * assignment.points);
          submittedAt = assignment.dueDate;
        }
      }

      result.push({
        id: `sub-${seed}`,
        assignmentId: assignment.id,
        studentId,
        status,
        submittedAt,
        score,
        feedback:
          status === "graded" && r > 0.6
            ? "Solid work overall — keep showing your reasoning step by step."
            : null,
      });
    }
  }

  return result;
}

export const submissions: Submission[] = buildSubmissions();

export function getSubmissionsForAssignment(assignmentId: string) {
  return submissions.filter((s) => s.assignmentId === assignmentId);
}

export function getSubmissionsForStudent(studentId: string) {
  return submissions.filter((s) => s.studentId === studentId);
}

export function getSubmission(assignmentId: string, studentId: string) {
  return (
    submissions.find(
      (s) => s.assignmentId === assignmentId && s.studentId === studentId
    ) ?? null
  );
}
