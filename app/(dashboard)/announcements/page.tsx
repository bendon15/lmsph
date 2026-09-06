"use client";

import { useState } from "react";
import { Megaphone } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { AnnouncementCard } from "@/components/shared/announcement-card";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getCoursesForStudent, getCoursesForTeacher, getCourseById } from "@/lib/data/courses";
import { getAnnouncementsForAudience } from "@/lib/data/announcements";

export default function AnnouncementsPage() {
  const { user } = useCurrentUser();
  const [composerOpen, setComposerOpen] = useState(false);
  if (!user) return null;

  const courseIds =
    user.role === "student"
      ? getCoursesForStudent(user.id).map((c) => c.id)
      : user.role === "teacher"
      ? getCoursesForTeacher(user.id).map((c) => c.id)
      : [];

  const items = getAnnouncementsForAudience({ role: user.role, courseIds });
  const canPost = user.role === "teacher" || user.role === "admin";

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Announcements"
        description="Updates from your school and classes."
        action={
          canPost && (
            <Button onClick={() => setComposerOpen((v) => !v)} size="sm">
              New announcement
            </Button>
          )
        }
      />

      {composerOpen && (
        <div className="rounded-lg border border-dashed border-primary/40 bg-primary-tint/30 p-5 text-sm text-muted">
          This is a portfolio demo, so posting isn&apos;t wired to a backend yet —
          but this is exactly where a compose form would live.
        </div>
      )}

      {items.length === 0 ? (
        <EmptyState icon={Megaphone} title="No announcements yet" description="Check back later for updates." />
      ) : (
        <div className="flex flex-col gap-3">
          {items.map((a) => (
            <AnnouncementCard
              key={a.id}
              announcement={a}
              courseName={a.courseId ? getCourseById(a.courseId)?.name : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}
