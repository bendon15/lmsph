"use client";

import { motion, type Variants, type Easing } from "framer-motion";
import { CheckCircle2, Clock, FileText } from "lucide-react";

const EASE_OUT: Easing = [0.22, 1, 0.36, 1];


const items = [
  {
    icon: Clock,
    tint: "bg-amber-tint text-amber",
    title: "Science 10 — Biodiversity quiz",
    meta: "Due today, 11:59 PM",
  },
  {
    icon: FileText,
    tint: "bg-primary-tint text-primary",
    title: "Araling Panlipunan sanaysay graded",
    meta: "92 / 100 · Mrs. Dela Cruz",
  },
  {
    icon: CheckCircle2,
    tint: "bg-emerald-tint text-emerald",
    title: "MAPEH — Covered Court",
    meta: "Starts in 20 minutes",
  },
];

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_OUT } },
};

export function HeroPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE_OUT }}
      className="relative w-full max-w-md"
    >
      <div className="rounded-lg border border-border bg-surface p-6 shadow-[0_1px_2px_rgba(24,24,27,0.04),0_16px_40px_-16px_rgba(24,24,27,0.16)]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted">Tuesday, September 9</p>
            <h3 className="font-display text-lg font-semibold">Today for Andrea</h3>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-tint font-display text-sm font-semibold text-primary">
            M
          </div>
        </div>

        <motion.ul
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-6 space-y-3"
        >
          {items.map((entry) => (
            <motion.li
              key={entry.title}
              variants={item}
              className="flex items-start gap-3 rounded-md border border-border/70 bg-background p-3"
            >
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${entry.tint}`}
              >
                <entry.icon className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">
                  {entry.title}
                </p>
                <p className="text-xs text-muted">{entry.meta}</p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      {/* Secondary card peeking out — depth without glassmorphism */}
      <motion.div
        initial={{ opacity: 0, y: 12, rotate: -3 }}
        animate={{ opacity: 1, y: 0, rotate: -4 }}
        transition={{ duration: 0.6, delay: 0.5, ease: EASE_OUT }}
        className="absolute -right-6 -bottom-8 hidden w-56 rounded-lg border border-border bg-surface p-4 shadow-[0_16px_32px_-12px_rgba(24,24,27,0.18)] sm:block"
      >
        <p className="text-xs text-muted">This term&apos;s average</p>
        <p className="font-display text-2xl font-semibold text-foreground">VS</p>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface-muted">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "91%" }}
            transition={{ duration: 0.8, delay: 0.9, ease: EASE_OUT }}
            className="h-full rounded-full bg-emerald"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
