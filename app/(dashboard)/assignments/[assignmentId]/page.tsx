"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, Upload } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getAssignmentById, getSubmission } from "@/lib/data/assignments";
import { getCourseById } from "@/lib/data/courses";
import { TODAY } from "@/lib/data/constants";

export default function AssignmentDetailPage({ params }: { params: Promise<{ assignmentId: string }> }) {
  const { assignmentId } = use(params);
  const { user } = useCurrentUser();
  const assignment = getAssignmentById(assignmentId);
  const [justSubmitted, setJustSubmitted] = useState(false);

  if (!assignment) notFound();
  if (!user) return null;

  const course = getCourseById(assignment.courseId);
  const submission = user.role === "student" ? getSubmission(assignment.id, user.id) : null;
  const isPast = assignment.dueDate < TODAY.toISOString().slice(0, 10);
  const alreadyDone = submission?.status === "submitted" || submission?.status === "graded" || justSubmitted;

  return (
    <div className="flex flex-col gap-6">
      <Link href="/assignments" className="flex w-fit items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to assignments
      </Link>

      <PageHeader
        title={assignment.title}
        description={`${course?.name ?? "Course"} · Due ${new Date(assignment.dueDate).toLocaleDateString("en-US", { month: "long", day: "numeric" })}`}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted">{assignment.description}</p>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Type</span>
                <Badge variant="neutral">{assignment.type}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Points</span>
                <span className="font-medium">{assignment.points}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Due date</span>
                <span className="font-medium">
                  {new Date(assignment.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
              </div>
            </CardContent>
          </Card>

          {user.role === "student" && (
            <Card>
              <CardHeader>
                <CardTitle>Your submission</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                {alreadyDone ? (
                  <div className="flex items-center gap-2 rounded-md bg-emerald-tint px-3 py-2.5 text-sm font-medium text-emerald">
                    <CheckCircle2 className="h-4 w-4" /> Submitted
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-muted">
                      {isPast
                        ? "This assignment is past due, but you can still turn in your work."
                        : "Ready to turn this in?"}
                    </p>
                    <Button onClick={() => setJustSubmitted(true)} className="gap-2">
                      <Upload className="h-4 w-4" /> Submit assignment
                    </Button>
                  </>
                )}

                {submission?.status === "graded" && (
                  <div className="rounded-md border border-border p-3">
                    <p className="text-sm font-medium">
                      Score: {submission.score}/{assignment.points}
                    </p>
                    {submission.feedback && (
                      <p className="mt-1.5 text-sm text-muted">&ldquo;{submission.feedback}&rdquo;</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
