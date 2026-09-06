import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary font-display text-xs font-semibold text-white">
            B
          </span>
          <span>LMSPH — a portfolio project by BenDon™, school system sample.</span>
        </div>
        <Link href="/login" className="transition-colors hover:text-foreground">
          Explore the demo
        </Link>
      </div>
    </footer>
  );
}
