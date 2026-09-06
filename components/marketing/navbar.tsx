import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary font-display text-sm font-semibold text-white">
            B
          </span>
          <span className="font-display text-lg font-semibold">LMSPH</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-muted sm:flex">
          <a href="#features" className="transition-colors hover:text-foreground">
            Features
          </a>
          <a href="#roles" className="transition-colors hover:text-foreground">
            Who it&apos;s for
          </a>
        </nav>

        <Button asChild size="sm">
          <Link href="/login">Explore demo</Link>
        </Button>
      </div>
    </header>
  );
}
