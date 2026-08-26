import { CourseEvent, weeklyPattern, formatTime } from "@/lib/parseIcs";

const COURSE_COLORS = [
  { bg: "bg-accent/15", border: "border-accent", text: "text-accent" },
  { bg: "bg-quizBlue/15", border: "border-quizBlue", text: "text-quizBlue" },
  { bg: "bg-projectGreen/15", border: "border-projectGreen", text: "text-projectGreen" },
  { bg: "bg-examRed/15", border: "border-examRed", text: "text-examRed" },
  { bg: "bg-purple-500/15", border: "border-purple-500", text: "text-purple-700" },
  { bg: "bg-pink-500/15", border: "border-pink-500", text: "text-pink-700" },
];

function minutesFromMidnight(d: Date) {
  return d.getHours() * 60 + d.getMinutes();
}

export default function WeekCalendarGrid({ events }: { events: CourseEvent[] }) {
  const pattern = weeklyPattern(events);
  const days = [1, 2, 3, 4, 5]; // Mon–Fri
  const dayLabels: Record<number, string> = { 1: "Mon", 2: "Tue", 3: "Wed", 4: "Thu", 5: "Fri" };

  // Assign a stable color per course code.
  const codes = Array.from(new Set(events.map((e) => e.code)));
  const colorFor = (code: string) => COURSE_COLORS[codes.indexOf(code) % COURSE_COLORS.length];

  // Determine grid bounds from actual class times, padded by 30 min.
  const allStarts = events.map((e) => minutesFromMidnight(e.dtstart));
  const allEnds = events.map((e) => minutesFromMidnight(e.dtend));
  const gridStart = Math.max(0, Math.min(...allStarts) - 30);
  const gridEnd = Math.min(24 * 60, Math.max(...allEnds) + 30);
  const totalMinutes = gridEnd - gridStart;
  const pxPerMin = 1.1;
  const gridHeight = totalMinutes * pxPerMin;

  const hourMarks: number[] = [];
  for (let h = Math.ceil(gridStart / 60); h * 60 <= gridEnd; h++) hourMarks.push(h);

  return (
    <div className="rounded-xl border border-line bg-white overflow-hidden">
      <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-line">
        <h2 className="font-display text-xl">Weekly Schedule</h2>
        <span className="font-mono text-[11px] text-muted uppercase tracking-widest">
          A typical week
        </span>
      </div>

      <div className="overflow-x-auto">
        <div className="flex min-w-[640px]">
          {/* Time axis */}
          <div className="w-14 sm:w-16 shrink-0 relative" style={{ height: gridHeight }}>
            {hourMarks.map((h) => (
              <div
                key={h}
                className="absolute left-0 right-0 text-right pr-2 -translate-y-1/2"
                style={{ top: (h * 60 - gridStart) * pxPerMin }}
              >
                <span className="font-mono text-[10px] text-muted">
                  {h === 0 ? "12am" : h < 12 ? `${h}am` : h === 12 ? "12pm" : `${h - 12}pm`}
                </span>
              </div>
            ))}
          </div>

          {/* Day columns */}
          <div className="flex-1 grid grid-cols-5">
            {days.map((day) => (
              <div key={day} className="border-l border-line relative" style={{ height: gridHeight }}>
                <div className="sticky top-0 text-center text-xs font-display font-bold py-2 border-b border-line bg-page/80">
                  {dayLabels[day]}
                </div>

                {/* Hour gridlines */}
                {hourMarks.map((h) => (
                  <div
                    key={h}
                    className="absolute left-0 right-0 border-t border-line/60"
                    style={{ top: (h * 60 - gridStart) * pxPerMin }}
                  />
                ))}

                {/* Class blocks */}
                {pattern[day].map(({ event }, i) => {
                  const start = minutesFromMidnight(event.dtstart);
                  const end = minutesFromMidnight(event.dtend);
                  const top = (start - gridStart) * pxPerMin + 28; // + header offset
                  const height = Math.max(28, (end - start) * pxPerMin);
                  const color = colorFor(event.code);
                  return (
                    <div
                      key={i}
                      className={`absolute left-1 right-1 rounded-md border-l-4 px-2 py-1 overflow-hidden ${color.bg} ${color.border}`}
                      style={{ top, height }}
                    >
                      <p className={`text-[11px] font-bold leading-tight ${color.text}`}>
                        {event.code}
                      </p>
                      <p className="text-[10px] text-muted leading-tight hidden sm:block">
                        {formatTime(event.dtstart)}–{formatTime(event.dtend)}
                      </p>
                      {event.location && (
                        <p className="text-[10px] text-muted leading-tight hidden sm:block">
                          {event.location}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
