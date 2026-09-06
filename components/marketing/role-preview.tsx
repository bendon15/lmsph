import Link from "next/link";
import { GraduationCap, PencilRuler, ShieldCheck, ArrowUpRight } from "lucide-react";

const roles = [
  {
    key: "student",
    icon: GraduationCap,
    title: "Student",
    description:
      "Check what's due, see grades as they land, and keep track of the day's classes.",
  },
  {
    key: "teacher",
    icon: PencilRuler,
    title: "Teacher",
    description:
      "Review submissions, keep the gradebook current, and message a class in seconds.",
  },
  {
    key: "admin",
    icon: ShieldCheck,
    title: "Administrator",
    description:
      "See attendance and performance across the school, not just one classroom.",
  },
];

export function RolePreview() {
  return (
    <section className="border-t border-border bg-surface-muted/60">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <h2 className="font-display text-3xl font-semibold sm:text-4xl">
          See it from every seat in the building
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          The demo drops you into a fully populated account for each role —
          no setup, no empty screens.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {roles.map((role) => (
            <Link
              key={role.key}
              href={`/login?role=${role.key}`}
              className="group flex flex-col rounded-lg border border-border bg-surface p-7 transition-colors hover:border-primary/40"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-tint text-primary">
                  <role.icon className="h-5 w-5" />
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold">
                {role.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{role.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
