"use client";

import { PageHeader } from "@/components/shared/page-header";
import { AnnouncementCard } from "@/components/shared/announcement-card";
import { EmptyState } from "@/components/shared/empty-state";
import { Activity as ActivityIcon } from "lucide-react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { announcements } from "@/lib/data/announcements";
import { getCourseById } from "@/lib/data/courses";

export default function ActivityPage() {
  const { user } = useCurrentUser();
  if (!user || user.role !== "admin") return null;

  const items = [...announcements].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="School activity" description="Everything posted across the school and its classes." />

      {items.length === 0 ? (
        <EmptyState icon={ActivityIcon} title="No activity yet" description="Posts from staff and teachers will show up here." />
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
