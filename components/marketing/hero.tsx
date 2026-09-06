import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroPreview } from "@/components/marketing/hero-preview";

export function Hero() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col items-center gap-16 px-6 pb-24 pt-16 sm:pt-24 lg:flex-row lg:items-center lg:gap-12 lg:pb-32">
      <div className="max-w-xl lg:flex-1">
        <h1 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
          The school day, organized in one place.
        </h1>
        <p className="mt-6 text-lg text-muted sm:text-xl">
          LMSPH brings classes, grades, assignments, and announcements
          together for students, teachers, and staff at Philippine schools —
          built around DepEd subjects and grading, so nobody&apos;s digging
          through Messenger group chats to find out what&apos;s due.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/login">Explore the demo</Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <a href="#features">See how it works</a>
          </Button>
        </div>

        <p className="mt-6 text-sm text-muted">
          No account needed — pick a role and look around.
        </p>
      </div>

      <div className="flex w-full justify-center lg:flex-1 lg:justify-end">
        <HeroPreview />
      </div>
    </section>
  );
}
