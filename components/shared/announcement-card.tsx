import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Pin } from "lucide-react";
import type { Announcement } from "@/lib/types";

const roleColor: Record<string, string> = {
  admin: "bg-primary",
  teacher: "bg-emerald",
  student: "bg-amber",
};

function formatRelative(iso: string) {
  const date = new Date(iso);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" }) +
    " · " +
    date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

export function AnnouncementCard({
  announcement,
  courseName,
}: {
  announcement: Announcement;
  courseName?: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-surface p-5">
      <div className="flex items-start gap-3">
        <Avatar name={announcement.authorName} color={roleColor[announcement.authorRole]} size="sm" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-medium">{announcement.authorName}</p>
            <span className="text-xs text-muted">{formatRelative(announcement.createdAt)}</span>
            {announcement.pinned && (
              <Badge variant="warning">
                <Pin className="h-3 w-3" /> Pinned
              </Badge>
            )}
            {courseName && <Badge variant="neutral">{courseName}</Badge>}
          </div>
          <h3 className="mt-2 font-display text-base font-semibold">{announcement.title}</h3>
          <p className="mt-1.5 text-sm text-muted">{announcement.body}</p>
        </div>
      </div>
    </div>
  );
}
