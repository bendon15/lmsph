"use client";

import Link from "next/link";
import { Bell, BellRing } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { cn } from "@/lib/utils";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getNotificationsForUser } from "@/lib/data/notifications";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}

export default function NotificationsPage() {
  const { user } = useCurrentUser();
  if (!user) return null;

  const items = getNotificationsForUser(user.id);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Notifications" description="Everything that&apos;s needed your attention recently." />

      {items.length === 0 ? (
        <EmptyState icon={Bell} title="No notifications" description="You&apos;ll see updates here as things happen." />
      ) : (
        <div className="flex flex-col divide-y divide-border rounded-lg border border-border bg-surface">
          {items.map((n) => (
            <Link
              key={n.id}
              href={n.href ?? "#"}
              className={cn(
                "flex items-start gap-3 px-5 py-4 transition-colors hover:bg-surface-muted",
                !n.read && "bg-primary-tint/20"
              )}
            >
              <span className={cn("mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full", n.read ? "bg-surface-muted text-muted" : "bg-primary-tint text-primary")}>
                {n.read ? <Bell className="h-4 w-4" /> : <BellRing className="h-4 w-4" />}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-medium">{n.title}</p>
                  <span className="shrink-0 text-xs text-muted">{formatDate(n.createdAt)}</span>
                </div>
                <p className="mt-0.5 text-sm text-muted">{n.message}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
