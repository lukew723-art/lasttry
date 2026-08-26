import MonthCalendar from "@/components/MonthCalendar";
import { assignments, TYPE_STYLE } from "@/lib/assignments";

export default function AssignmentsPage() {
  // Default to today's month if we're within the semester, otherwise August 2026.
  const today = new Date();
  const inSemester = today >= new Date(2026, 7, 1) && today <= new Date(2026, 11, 15);
  const initialYear = inSemester ? today.getFullYear() : 2026;
  const initialMonth = inSemester ? today.getMonth() : 7; // August

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <header className="mb-8">
        <p className="font-mono text-xs text-accent uppercase tracking-[0.2em] mb-2">
          Fall 2026
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">
          Assignments &amp; Exams
        </h1>
        <p className="text-sm text-muted max-w-2xl">
          Built from your course syllabi — not live-synced from Canvas, since
          Canvas doesn't expose assignment due dates through the calendar
          feed. Tap a day to see what's due.
        </p>
      </header>

      <div className="flex flex-wrap gap-3 mb-6">
        {(Object.keys(TYPE_STYLE) as (keyof typeof TYPE_STYLE)[]).map((type) => {
          const style = TYPE_STYLE[type];
          return (
            <span
              key={type}
              className={`text-xs font-medium rounded-full px-2.5 py-1 ${style.bg} ${style.text}`}
            >
              {style.label}
            </span>
          );
        })}
      </div>

      <MonthCalendar events={assignments} initialYear={initialYear} initialMonth={initialMonth} />
    </main>
  );
}
