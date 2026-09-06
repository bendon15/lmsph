"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, Bell, LogOut, ChevronDown, GraduationCap, PencilRuler, ShieldCheck } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { NAV_ITEMS, ROLE_LABEL } from "@/lib/nav-config";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getNotificationsForUser } from "@/lib/data/notifications";
import type { AppUser, Role } from "@/lib/types";

const roleIcon: Record<Role, typeof GraduationCap> = {
  student: GraduationCap,
  teacher: PencilRuler,
  admin: ShieldCheck,
};

function timeAgo(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const hours = Math.round(diffMs / 3_600_000);
  if (hours < 1) return "just now";
  if (hours < 24) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
}

export function Topbar({ user }: { user: AppUser }) {
  const router = useRouter();
  const { login, logout } = useCurrentUser();
  const [sheetOpen, setSheetOpen] = useState(false);
  const notifications = getNotificationsForUser(user.id);
  const unread = notifications.filter((n) => !n.read).length;

  function switchRole(role: Role) {
    login(role);
    router.push("/dashboard");
  }

  function handleLogout() {
    logout();
    router.push("/login");
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-border bg-background/90 px-4 backdrop-blur sm:px-6">
      <div className="flex items-center gap-3">
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger className="flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-surface-muted lg:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open menu</span>
          </SheetTrigger>
          <SheetContent>
            <Link href="/dashboard" className="flex items-center gap-2 pb-6">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary font-display text-sm font-semibold text-white">
                B
              </span>
              <span className="font-display text-lg font-semibold">LMSPH</span>
            </Link>
            <SidebarNav items={NAV_ITEMS[user.role]} onNavigate={() => setSheetOpen(false)} />
          </SheetContent>
        </Sheet>
        <p className="hidden text-sm text-muted sm:block">
          {ROLE_LABEL[user.role]} workspace
        </p>
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger className="relative flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-surface-muted">
            <Bell className="h-[18px] w-[18px]" />
            {unread > 0 && (
              <span className="absolute right-1.5 top-1.5 flex h-2 w-2 rounded-full bg-rose" />
            )}
            <span className="sr-only">Notifications</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.length === 0 ? (
              <p className="px-3 py-4 text-sm text-muted">You&apos;re all caught up.</p>
            ) : (
              notifications.slice(0, 5).map((n) => (
                <DropdownMenuItem key={n.id} asChild>
                  <Link href={n.href ?? "/notifications"} className="flex-col items-start gap-0.5">
                    <span className="flex w-full items-center justify-between gap-2">
                      <span className="font-medium">{n.title}</span>
                      {!n.read && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />}
                    </span>
                    <span className="text-xs text-muted">{n.message}</span>
                    <span className="text-[11px] text-muted">{timeAgo(n.createdAt)}</span>
                  </Link>
                </DropdownMenuItem>
              ))
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/notifications" className="justify-center text-primary">
                View all notifications
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 transition-colors hover:bg-surface-muted">
            <Avatar name={user.name} color={user.avatarColor} size="sm" />
            <span className="hidden text-sm font-medium sm:block">{user.name.split(" ")[0]}</span>
            <ChevronDown className="hidden h-4 w-4 text-muted sm:block" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Preview as</DropdownMenuLabel>
            {(["student", "teacher", "admin"] as Role[]).map((role) => {
              const Icon = roleIcon[role];
              return (
                <DropdownMenuItem key={role} onSelect={() => switchRole(role)}>
                  <Icon className="h-4 w-4" /> {ROLE_LABEL[role]}
                  {user.role === role && <span className="ml-auto text-xs text-primary">Current</span>}
                </DropdownMenuItem>
              );
            })}
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={handleLogout} className="text-rose">
              <LogOut className="h-4 w-4" /> Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
