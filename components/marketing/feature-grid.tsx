import { BarChart3, CalendarDays, MessagesSquare } from "lucide-react";

export function FeatureGrid() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <div className="max-w-2xl">
        <h2 className="font-display text-3xl font-semibold sm:text-4xl">
          One place for the whole school day
        </h2>
        <p className="mt-4 text-lg text-muted">
          LMSPH replaces the spreadsheet-and-email shuffle with a single
          system that students, teachers, and staff actually enjoy opening.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="rounded-lg border border-border bg-surface p-8 lg:col-span-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-tint text-primary">
            <BarChart3 className="h-5 w-5" />
          </div>
          <h3 className="mt-5 font-display text-xl font-semibold">
            Grades and progress, always current
          </h3>
          <p className="mt-2 max-w-md text-muted">
            Every submission, grade, and comment updates the moment a teacher
            saves it — no more waiting for the Friday printout. Students see
            exactly where they stand in each class, and where a grade came
            from.
          </p>
        </div>

        <div className="rounded-lg border border-border bg-surface p-8">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-tint text-emerald">
            <CalendarDays className="h-5 w-5" />
          </div>
          <h3 className="mt-5 font-display text-xl font-semibold">
            A schedule that makes sense
          </h3>
          <p className="mt-2 text-muted">
            Classes, deadlines, and school events sit on one calendar instead
            of three different apps.
          </p>
        </div>

        <div className="rounded-lg border border-border bg-surface p-8">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-tint text-amber">
            <MessagesSquare className="h-5 w-5" />
          </div>
          <h3 className="mt-5 font-display text-xl font-semibold">
            Announcements that reach people
          </h3>
          <p className="mt-2 text-muted">
            Post once from a class or the front office, and it shows up for
            exactly the students and staff it&apos;s meant for.
          </p>
        </div>

        <div className="rounded-lg border border-border bg-surface p-8 lg:col-span-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-tint text-primary">
            <BarChart3 className="h-5 w-5" />
          </div>
          <h3 className="mt-5 font-display text-xl font-semibold">
            Built for how each role actually works
          </h3>
          <p className="mt-2 max-w-md text-muted">
            A student&apos;s dashboard is about their day. A teacher&apos;s is about
            their classes and grading queue. An administrator&apos;s is about the
            school as a whole. Same system, different lens.
          </p>
        </div>
      </div>
    </section>
  );
}
