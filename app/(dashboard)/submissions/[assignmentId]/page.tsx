"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getAssignmentById, getSubmissionsForAssignment } from "@/lib/data/assignments";
import { getCourseById } from "@/lib/data/courses";
import { getStudentById } from "@/lib/data/users";
import type { Submission } from "@/lib/types";

export default function SubmissionsPage({ params }: { params: Promise<{ assignmentId: string }> }) {
  const { assignmentId } = use(params);
  const { user } = useCurrentUser();
  const assignment = getAssignmentById(assignmentId);

  const [overrides, setOverrides] = useState<Record<string, { score: number; feedback: string }>>({});
  const [grading, setGrading] = useState<Submission | null>(null);
  const [scoreInput, setScoreInput] = useState("");
  const [feedbackInput, setFeedbackInput] = useState("");

  if (!assignment) notFound();
  if (!user || user.role !== "teacher") return null;

  const course = getCourseById(assignment.courseId);
  const submissions = getSubmissionsForAssignment(assignment.id);

  function openGrading(sub: Submission) {
    setGrading(sub);
    setScoreInput(String(overrides[sub.id]?.score ?? sub.score ?? ""));
    setFeedbackInput(overrides[sub.id]?.feedback ?? sub.feedback ?? "");
  }

  function saveGrade() {
    if (!grading) return;
    const score = Math.max(0, Math.min(assignment!.points, Number(scoreInput) || 0));
    setOverrides((prev) => ({ ...prev, [grading.id]: { score, feedback: feedbackInput } }));
    setGrading(null);
  }

  return (
    <div className="flex flex-col gap-6">
      <Link href="/gradebook" className="flex w-fit items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back
      </Link>

      <PageHeader title={assignment.title} description={`${course?.name} · ${assignment.points} points`} />

      <Card>
        <CardContent className="p-0">
          <ul className="flex flex-col divide-y divide-border">
            {submissions.map((sub) => {
              const student = getStudentById(sub.studentId);
              if (!student) return null;
              const override = overrides[sub.id];
              const effectiveScore = override?.score ?? sub.score;
              const isGraded = sub.status === "graded" || override !== undefined;

              return (
                <li key={sub.id} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar name={student.name} color={student.avatarColor} size="sm" />
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-muted">
                        {sub.status === "missing" ? "No submission" : `Submitted ${sub.submittedAt}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {sub.status === "missing" ? (
                      <Badge variant="danger">Missing</Badge>
                    ) : isGraded ? (
                      <Badge variant="success">
                        <CheckCircle2 className="h-3 w-3" /> {effectiveScore}/{assignment.points}
                      </Badge>
                    ) : (
                      <Badge variant={sub.status === "late" ? "warning" : "primary"}>
                        {sub.status === "late" ? "Late" : "Submitted"}
                      </Badge>
                    )}
                    {sub.status !== "missing" && (
                      <Button size="sm" variant="secondary" onClick={() => openGrading(sub)}>
                        {isGraded ? "Edit grade" : "Grade"}
                      </Button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>

      <Dialog open={grading !== null} onOpenChange={(open) => !open && setGrading(null)}>
        <DialogContent>
          <DialogTitle>Grade submission</DialogTitle>
          <DialogDescription>
            {grading && getStudentById(grading.studentId)?.name} · {assignment.title}
          </DialogDescription>

          <div className="mt-4 flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium">Score (out of {assignment.points})</label>
              <input
                type="number"
                value={scoreInput}
                onChange={(e) => setScoreInput(e.target.value)}
                min={0}
                max={assignment.points}
                className="mt-1.5 h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Feedback</label>
              <textarea
                value={feedbackInput}
                onChange={(e) => setFeedbackInput(e.target.value)}
                rows={3}
                className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                placeholder="Optional note for the student…"
              />
            </div>
            <Button onClick={saveGrade}>Save grade</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
