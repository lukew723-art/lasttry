import fs from "fs";
import path from "path";
import { parseIcs, semesterRange } from "@/lib/parseIcs";
import WeekCalendarGrid from "@/components/WeekCalendarGrid";
import CourseList from "@/components/CourseList";
import MonthCalendar from "@/components/MonthCalendar";
import NotesPanel from "@/components/NotesPanel";
import { assignments } from "@/lib/assignments";

async function getEvents() {
  // Falls back to the bundled seed file. Swap this for a live fetch of your
  // Canvas Calendar Feed URL (via an env var) once you have it — see README.
  const feedUrl = process.env.CANVAS_ICS_URL;

  if (feedUrl) {
    const res = await fetch(feedUrl, { next: { revalidate: 3600 } });
    const text = await res.text();
    return parseIcs(text);
  }

  const filePath = path.join(process.cwd(), "data", "fall2026.ics");
  const text = fs.readFileSync(filePath, "utf-8");
  return parseIcs(text);
}

export default async function Home() {
  const events = await getEvents();
  const { start, end } = semesterRange(events);

  const today = new Date();
  const inSemester = today >= new Date(2026, 7, 1) && today <= new Date(2026, 11, 15);
  const initialYear = inSemester ? today.getFullYear() : 2026;
  const initialMonth = inSemester ? today.getMonth() : 7; // August

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <header className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
        <div>
          <p className="font-mono text-xs text-accent uppercase tracking-[0.2em] mb-2">
            Fall 2026
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold">
            Semester Board
          </h1>
        </div>
        {start && (
          <p className="font-mono text-sm text-muted">
            {start.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            {" – "}
            {end
              ? end.toLocaleDateString("en-US", { month: "short", day: "numeric" })
              : "TBD"}
          </p>
        )}
      </header>

      <section className="grid md:grid-cols-2 gap-4 mb-10 items-start">
        <WeekCalendarGrid events={events} />
        <MonthCalendar events={assignments} initialYear={initialYear} initialMonth={initialMonth} />
      </section>

      <section className="mb-10">
        <CourseList events={events} />
      </section>

      <section className="mb-10">
        <NotesPanel />
      </section>
    </main>
  );
}
