import fs from "fs";
import path from "path";
import { parseIcs, semesterRange } from "@/lib/parseIcs";
import ScheduleBoard from "@/components/ScheduleBoard";
import CourseList from "@/components/CourseList";
import GradesPanel from "@/components/GradesPanel";

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
  const courseCodes = events.map((e) => e.code);

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <header className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
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

      <section className="mb-10">
        <ScheduleBoard events={events} />
      </section>

      <section className="mb-10">
        <CourseList events={events} />
      </section>

      <section className="grid sm:grid-cols-2 gap-4 mb-10">
        <GradesPanel courseCodes={courseCodes} />

        <div className="rounded-xl border border-dashed border-line p-5 flex flex-col items-start justify-center text-center sm:text-left">
          <h2 className="font-display text-xl mb-1">Assignments &amp; Exams</h2>
          <p className="text-sm text-muted">
            Empty for now — send over your syllabi and this fills in with due
            dates, exam windows, and a full-year timeline.
          </p>
        </div>
      </section>
    </main>
  );
}
