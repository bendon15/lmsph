"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AppUser, Role } from "@/lib/types";
import {
  getUserById,
  DEMO_STUDENT_ID,
  DEMO_TEACHER_ID,
  DEMO_ADMIN_ID,
} from "@/lib/data/users";

const DEMO_USER_ID_BY_ROLE: Record<Role, string> = {
  student: DEMO_STUDENT_ID,
  teacher: DEMO_TEACHER_ID,
  admin: DEMO_ADMIN_ID,
};

interface AuthState {
  userId: string | null;
  login: (role: Role) => void;
  logout: () => void;
  currentUser: () => AppUser | null;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      userId: null,
      login: (role) => set({ userId: DEMO_USER_ID_BY_ROLE[role] }),
      logout: () => set({ userId: null }),
      currentUser: () => {
        const id = get().userId;
        if (!id) return null;
        return getUserById(id) as AppUser | null;
      },
    }),
    { name: "lmsph-auth" }
  )
);
