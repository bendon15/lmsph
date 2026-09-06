"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/stores/auth-store";

// Avoids a hydration mismatch: the persisted auth state only exists in the
// browser, so we wait for mount before trusting it.
export function useCurrentUser() {
  const [mounted, setMounted] = useState(false);
  const userId = useAuthStore((s) => s.userId);
  const currentUser = useAuthStore((s) => s.currentUser);
  const login = useAuthStore((s) => s.login);
  const logout = useAuthStore((s) => s.logout);

  // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional hydration-safe mount flag
  useEffect(() => setMounted(true), []);

  return {
    user: mounted ? currentUser() : null,
    userId: mounted ? userId : null,
    isReady: mounted,
    login,
    logout,
  };
}
