import Link from "next/link";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import type { NavItem } from "@/lib/nav-config";

export function Sidebar({ items }: { items: NavItem[] }) {
  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border bg-surface lg:flex">
      <div className="flex h-16 items-center gap-2 px-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary font-display text-sm font-semibold text-white">
            B
          </span>
          <span className="font-display text-lg font-semibold">LMSPH</span>
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-2">
        <SidebarNav items={items} />
      </div>
      <div className="border-t border-border p-4 text-xs text-muted">
        Portfolio demo · S.Y. 2026–2027
      </div>
    </aside>
  );
}
