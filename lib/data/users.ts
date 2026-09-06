import type { Student, Teacher, Admin } from "@/lib/types";

export const teachers: Teacher[] = [
  {
    id: "t1",
    teacherId: "TCH-104",
    name: "Maria Santos",
    email: "m.santos@lmsph.edu.ph",
    role: "teacher",
    department: "Science",
    avatarColor: "bg-emerald",
  },
  {
    id: "t2",
    teacherId: "TCH-118",
    name: "Ramon Dela Cruz",
    email: "r.delacruz@lmsph.edu.ph",
    role: "teacher",
    department: "Araling Panlipunan",
    avatarColor: "bg-primary",
  },
  {
    id: "t3",
    teacherId: "TCH-096",
    name: "Angelica Reyes",
    email: "a.reyes@lmsph.edu.ph",
    role: "teacher",
    department: "Mathematics",
    avatarColor: "bg-amber",
  },
  {
    id: "t4",
    teacherId: "TCH-131",
    name: "Joseph Bautista",
    email: "j.bautista@lmsph.edu.ph",
    role: "teacher",
    department: "MAPEH",
    avatarColor: "bg-rose",
  },
];

export const students: Student[] = [
  { id: "s1", studentId: "STU-2210", name: "Andrea Villanueva", email: "andrea.villanueva@lmsph.edu.ph", role: "student", gradeLevel: 10, avatarColor: "bg-primary" },
  { id: "s2", studentId: "STU-2211", name: "Miguel Fernandez", email: "miguel.fernandez@lmsph.edu.ph", role: "student", gradeLevel: 10, avatarColor: "bg-emerald" },
  { id: "s3", studentId: "STU-2212", name: "Samantha Cruz", email: "samantha.cruz@lmsph.edu.ph", role: "student", gradeLevel: 10, avatarColor: "bg-amber" },
  { id: "s4", studentId: "STU-2213", name: "Josiah Ramos", email: "josiah.ramos@lmsph.edu.ph", role: "student", gradeLevel: 10, avatarColor: "bg-rose" },
  { id: "s5", studentId: "STU-2214", name: "Kyla Mendoza", email: "kyla.mendoza@lmsph.edu.ph", role: "student", gradeLevel: 10, avatarColor: "bg-secondary" },
  { id: "s6", studentId: "STU-2215", name: "Elijah Torres", email: "elijah.torres@lmsph.edu.ph", role: "student", gradeLevel: 10, avatarColor: "bg-primary" },
  { id: "s7", studentId: "STU-2216", name: "Trisha Aquino", email: "trisha.aquino@lmsph.edu.ph", role: "student", gradeLevel: 10, avatarColor: "bg-emerald" },
  { id: "s8", studentId: "STU-2217", name: "Gabriel Navarro", email: "gabriel.navarro@lmsph.edu.ph", role: "student", gradeLevel: 10, avatarColor: "bg-amber" },
];

export const admins: Admin[] = [
  {
    id: "a1",
    name: "Corazon Ibarra",
    email: "c.ibarra@lmsph.edu.ph",
    role: "admin",
    title: "School Principal",
    avatarColor: "bg-primary",
  },
];

// The three demo accounts the login screen drops people into.
export const DEMO_STUDENT_ID = "s1";
export const DEMO_TEACHER_ID = "t1";
export const DEMO_ADMIN_ID = "a1";

export function getUserById(id: string) {
  return (
    students.find((s) => s.id === id) ??
    teachers.find((t) => t.id === id) ??
    admins.find((a) => a.id === id) ??
    null
  );
}

export function getStudentById(id: string) {
  return students.find((s) => s.id === id) ?? null;
}

export function getTeacherById(id: string) {
  return teachers.find((t) => t.id === id) ?? null;
}
