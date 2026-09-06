# LMSPH — School LMS for the Philippines (Portfolio Project)

A modern, fully responsive Learning Management System UI built for Philippine schools as a portfolio piece — DepEd-aligned subjects and grading, no backend, no database, just realistic mock data structured so a real one could be swapped in later.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- Hand-written shadcn-style UI primitives (Radix + `cva`)
- Framer Motion for micro-interactions
- Recharts for charts
- Zustand for the demo auth/session state

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`, click **Explore the demo**, and pick Student, Teacher, or Administrator. Each account is pre-loaded with a full school year (S.Y. 2026–2027) of mock data — Grade 10 subjects following the DepEd curriculum (Science, Araling Panlipunan, Mathematics, MAPEH, English, Edukasyon sa Pagpapakatao). You can switch roles anytime from the avatar menu in the top bar.

## Project structure

- `app/` — routes. `(dashboard)` is a route group holding every authenticated page behind a shared shell (sidebar + topbar).
- `components/ui/` — low-level primitives (Button, Card, Dialog, etc.)
- `components/shared/` — reusable composed pieces (DataTable, StatCard, EmptyState, AnnouncementCard)
- `components/dashboard/{role}/` — role-specific dashboard widgets
- `components/charts/` — Recharts wrappers
- `lib/data/` — the mock "database": typed seed data for users, courses, assignments, attendance, announcements, notifications
- `lib/services/` — derived data (grades, dashboards) — this is the layer you'd swap for real API/database calls later
- `lib/stores/` — Zustand auth store (persisted to localStorage for the demo)

## Notes

- Grades follow DepEd's official descriptor bands (Outstanding, Very Satisfactory, Satisfactory, Fairly Satisfactory, Did Not Meet Expectations), shown as compact abbreviations (O, VS, S, FS, DNM) next to the numeric percentage — see `lib/services/grades.ts`.
- All dates are anchored to a fixed "today" (`lib/data/constants.ts`) so the demo data stays consistent across reloads instead of drifting with the real calendar.
- Grading in the teacher's submission view updates local React state only — it's not persisted, since there's no backend. Refreshing resets it.
- Built for deployment on Vercel with zero configuration.
