"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GraduationCap, PencilRuler, ShieldCheck, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import type { Role } from "@/lib/types";

const roles: { key: Role; icon: typeof GraduationCap; title: string; description: string; name: string }[] = [
  {
    key: "student",
    icon: GraduationCap,
    title: "Student",
    description: "Assignments, grades, and today's schedule.",
    name: "Andrea Villanueva",
  },
  {
    key: "teacher",
    icon: PencilRuler,
    title: "Teacher",
    description: "Classes, the gradebook, and submissions to review.",
    name: "Maria Santos",
  },
  {
    key: "admin",
    icon: ShieldCheck,
    title: "Administrator",
    description: "School-wide attendance, analytics, and staff.",
    name: "Corazon Ibarra",
  },
];

export default function LoginPage() {
  const router = useRouter();
  const { login } = useCurrentUser();
  const [selected, setSelected] = useState<Role | null>(null);

  function enter(role: Role) {
    setSelected(role);
    login(role);
    router.push("/dashboard");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-16">
      <Link href="/" className="mb-10 flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary font-display text-sm font-semibold text-white">
          B
        </span>
        <span className="font-display text-lg font-semibold">LMSPH</span>
      </Link>

      <div className="w-full max-w-3xl text-center">
        <h1 className="font-display text-3xl font-semibold sm:text-4xl">
          Look around as whoever you&apos;d like
        </h1>
        <p className="mt-3 text-lg text-muted">
          Every account here is pre-loaded with a term&apos;s worth of real-feeling
          data — pick a seat and explore.
        </p>
      </div>

      <div className="mt-12 grid w-full max-w-3xl grid-cols-1 gap-5 sm:grid-cols-3">
        {roles.map((role, i) => (
          <motion.button
            key={role.key}
            onClick={() => enter(role.key)}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            whileTap={{ scale: 0.98 }}
            className="group flex flex-col items-start rounded-lg border border-border bg-surface p-7 text-left transition-colors hover:border-primary/50 disabled:opacity-60"
            disabled={selected !== null}
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-tint text-primary">
              <role.icon className="h-5 w-5" />
            </div>
            <h2 className="mt-5 font-display text-lg font-semibold">{role.title}</h2>
            <p className="mt-1.5 text-sm text-muted">{role.description}</p>
            <p className="mt-4 text-xs text-muted">Demo account: {role.name}</p>
            <span className="mt-5 flex items-center gap-1.5 text-sm font-medium text-primary">
              {selected === role.key ? "Entering…" : "Enter as " + role.title}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </motion.button>
        ))}
      </div>

      <Button asChild variant="ghost" size="sm" className="mt-10">
        <Link href="/">Back to home</Link>
      </Button>
    </main>
  );
}
