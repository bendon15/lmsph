import type { AttendanceRecord } from "@/lib/types";
import { students } from "@/lib/data/users";
import { TODAY } from "@/lib/data/constants";

function hashSeed(input: string) {
  let hash = 0;
  for (let i = 0; i < input.length; i++) hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  return hash;
}
function seededRandom(seed: string) {
  const x = Math.sin(hashSeed(seed)) * 10000;
  return x - Math.floor(x);
}

function lastSchoolDays(count: number): string[] {
  const out: string[] = [];
  const d = new Date(TODAY);
  while (out.length < count) {
    const day = d.getDay();
    if (day !== 0 && day !== 6) {
      out.push(d.toISOString().slice(0, 10));
    }
    d.setDate(d.getDate() - 1);
  }
  return out.reverse();
}

export const schoolDays = lastSchoolDays(15);

function buildAttendance(): AttendanceRecord[] {
  const records: AttendanceRecord[] = [];
  for (const student of students) {
    for (const date of schoolDays) {
      const r = seededRandom(`${student.id}:${date}`);
      let status: AttendanceRecord["status"] = "present";
      if (r > 0.94) status = "absent";
      else if (r > 0.88) status = "late";
      else if (r > 0.85) status = "excused";
      records.push({ id: `att-${student.id}-${date}`, studentId: student.id, date, status });
    }
  }
  return records;
}

export const attendanceRecords = buildAttendance();

export function getAttendanceForStudent(studentId: string) {
  return attendanceRecords.filter((r) => r.studentId === studentId);
}

export function getAttendanceForDate(date: string) {
  return attendanceRecords.filter((r) => r.date === date);
}

export function attendanceRateForStudent(studentId: string) {
  const records = getAttendanceForStudent(studentId);
  if (records.length === 0) return 1;
  const present = records.filter((r) => r.status === "present" || r.status === "late").length;
  return present / records.length;
}

export function schoolWideAttendanceByDay() {
  return schoolDays.map((date) => {
    const dayRecords = getAttendanceForDate(date);
    const present = dayRecords.filter((r) => r.status === "present" || r.status === "late").length;
    return {
      date,
      rate: dayRecords.length ? Math.round((present / dayRecords.length) * 100) : 100,
    };
  });
}
