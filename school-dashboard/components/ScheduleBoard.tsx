import { CourseEvent, DAY_LABEL, formatTime, weeklyPattern } from "@/lib/parseIcs";

export default function ScheduleBoard({ events }: { events: CourseEvent[] }) {
  const pattern = weeklyPattern(events);
  const activeDays = [1, 2, 3, 4, 5, 6, 0].filter((d) => pattern[d].length > 0);

  return (
    <div className="rounded-xl bg-board p-4 sm:p-6 shadow-[0_20px_50px_-20px_rgba(15,26,22,0.6)]">
      <div className="flex items-baseline justify-between mb-4 px-1">
        <h2 className="font-display text-accentSoft text-lg sm:text-xl tracking-wide">
          Weekly Schedule
        </h2>
        <span className="font-mono text-[11px] text-accent/70 uppercase tracking-widest">
          Mon–Sun
        </span>
      </div>

      <div className="space-y-1">
        {activeDays.map((day, i) => (
          <div
            key={day}
            className="board-row flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 border-b border-boardline last:border-0 py-3 px-1"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <span className="flap w-12 text-center py-1 text-sm font-bold shrink-0">
              {DAY_LABEL[day]}
            </span>
            <div className="flex flex-wrap gap-2">
              {pattern[day].map(({ event }, j) => (
                <div
                  key={`${event.code}-${j}`}
                  className="flap px-3 py-1.5 flex items-center gap-3 text-sm"
                >
                  <span className="font-bold">{event.code}</span>
                  <span className="text-accentSoft/80">
                    {formatTime(event.dtstart)}–{formatTime(event.dtend)}
                  </span>
                  {event.location && (
                    <span className="text-accentSoft/60 hidden sm:inline">
                      {event.location}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
