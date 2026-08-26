import { CourseEvent, formatTime } from "@/lib/parseIcs";

const DAY_NAME: Record<string, string> = {
  MO: "Mon", TU: "Tue", WE: "Wed", TH: "Thu", FR: "Fri", SA: "Sat", SU: "Sun",
};

export default function CourseList({ events }: { events: CourseEvent[] }) {
  return (
    <div>
      <h2 className="font-display text-xl mb-4">Your Courses</h2>
      <div className="grid sm:grid-cols-2 gap-3">
        {events.map((ev, i) => (
          <div
            key={i}
            className="rounded-xl border border-line bg-white/60 p-4 hover:border-accent/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-1">
              <h3 className="font-display font-bold text-ink">{ev.code}</h3>
              <span className="font-mono text-[10px] text-muted uppercase tracking-wider">
                {ev.byday.map((d) => DAY_NAME[d]).join(" / ")}
              </span>
            </div>
            {ev.title && (
              <p className="text-sm text-muted mb-3 capitalize">
                {ev.title.toLowerCase()}
              </p>
            )}
            <div className="flex items-center justify-between text-xs font-mono text-muted">
              <span>
                {formatTime(ev.dtstart)}–{formatTime(ev.dtend)}
              </span>
              {ev.location && <span>{ev.location}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
