import type { Course } from "@/lib/types";
import { students } from "@/lib/data/users";

const allStudentIds = students.map((s) => s.id);
// A few students skip a course or two, so rosters aren't identical everywhere.
const roster = (...exclude: string[]) => allStudentIds.filter((id) => !exclude.includes(id));

export const courses: Course[] = [
  {
    id: "c1",
    name: "Science 10",
    subject: "Science",
    teacherId: "t1",
    teacherName: "Maria Santos",
    room: "Rm 214, Newton Hall",
    term: "S.Y. 2026–2027",
    color: "emerald",
    studentIds: roster("s8"),
  },
  {
    id: "c2",
    name: "Araling Panlipunan 10",
    subject: "Araling Panlipunan",
    teacherId: "t2",
    teacherName: "Ramon Dela Cruz",
    room: "Rm 108, Rizal Hall",
    term: "S.Y. 2026–2027",
    color: "primary",
    studentIds: roster("s4"),
  },
  {
    id: "c3",
    name: "Mathematics 10",
    subject: "Mathematics",
    teacherId: "t3",
    teacherName: "Angelica Reyes",
    room: "Rm 301, Aguinaldo Hall",
    term: "S.Y. 2026–2027",
    color: "amber",
    studentIds: allStudentIds,
  },
  {
    id: "c4",
    name: "MAPEH 10",
    subject: "MAPEH",
    teacherId: "t4",
    teacherName: "Joseph Bautista",
    room: "Covered Court",
    term: "S.Y. 2026–2027",
    color: "rose",
    studentIds: roster("s2", "s6"),
  },
  {
    id: "c5",
    name: "English 10",
    subject: "English",
    teacherId: "t1",
    teacherName: "Maria Santos",
    room: "Rm 216, Newton Hall",
    term: "S.Y. 2026–2027",
    color: "emerald",
    studentIds: roster("s1", "s3"),
  },
  {
    id: "c6",
    name: "Edukasyon sa Pagpapakatao 10",
    subject: "Edukasyon sa Pagpapakatao",
    teacherId: "t2",
    teacherName: "Ramon Dela Cruz",
    room: "Rm 110, Rizal Hall",
    term: "S.Y. 2026–2027",
    color: "primary",
    studentIds: roster("s5", "s7"),
  },
];

export function getCourseById(id: string) {
  return courses.find((c) => c.id === id) ?? null;
}

export function getCoursesForStudent(studentId: string) {
  return courses.filter((c) => c.studentIds.includes(studentId));
}

export function getCoursesForTeacher(teacherId: string) {
  return courses.filter((c) => c.teacherId === teacherId);
}
