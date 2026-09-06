import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export function StatCard({
  label,
  value,
  icon: Icon,
  tint = "primary",
  hint,
}: {
  label: string;
  value: string;
  icon: LucideIcon;
  tint?: "primary" | "emerald" | "amber" | "rose";
  hint?: string;
}) {
  const tintClasses = {
    primary: "bg-primary-tint text-primary",
    emerald: "bg-emerald-tint text-emerald",
    amber: "bg-amber-tint text-amber",
    rose: "bg-rose-tint text-rose",
  }[tint];

  return (
    <div className="rounded-lg border border-border bg-surface p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted">{label}</p>
        <span className={cn("flex h-9 w-9 items-center justify-center rounded-full", tintClasses)}>
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <p className="mt-3 font-display text-2xl font-semibold">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </div>
  );
}
