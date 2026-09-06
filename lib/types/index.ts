export type Role = "student" | "teacher" | "admin";

export interface BaseUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarColor: string; // tailwind bg class for initials avatar
}

export interface Student extends BaseUser {
  role: "student";
  gradeLevel: number;
  studentId: string;
}

export interface Teacher extends BaseUser {
  role: "teacher";
  department: string;
  teacherId: string;
}

export interface Admin extends BaseUser {
  role: "admin";
  title: string;
}

export type AppUser = Student | Teacher | Admin;

export interface Course {
  id: string;
  name: string;
  subject: string;
  teacherId: string;
  teacherName: string;
  room: string;
  term: string;
  color: string; // tint token key
  studentIds: string[];
}

export type AssignmentType = "homework" | "quiz" | "exam" | "essay" | "project";

export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  description: string;
  type: AssignmentType;
  dueDate: string; // ISO date
  points: number;
}

export type SubmissionStatus = "not_submitted" | "submitted" | "late" | "graded" | "missing";

export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  status: SubmissionStatus;
  submittedAt: string | null;
  score: number | null;
  feedback: string | null;
}

export type AttendanceStatus = "present" | "absent" | "late" | "excused";

export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: string; // ISO date
  status: AttendanceStatus;
}

export interface ScheduleEntry {
  id: string;
  courseId: string;
  day: "Mon" | "Tue" | "Wed" | "Thu" | "Fri";
  startTime: string; // "08:30"
  endTime: string; // "09:20"
}

export type AnnouncementAudience = "school" | "teachers" | "students" | "course";

export interface Announcement {
  id: string;
  title: string;
  body: string;
  authorId: string;
  authorName: string;
  authorRole: Role;
  audience: AnnouncementAudience;
  courseId?: string;
  createdAt: string; // ISO datetime
  pinned?: boolean;
}

export interface AppNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  href?: string;
}
