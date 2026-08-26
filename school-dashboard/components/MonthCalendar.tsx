"use client";

import { useState } from "react";
import { AssignmentEvent, TYPE_STYLE } from "@/lib/assignments";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function toDateKey(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

function dateKeyFromDate(d: Date) {
  return toDateKey(d.getFullYear(), d.getMonth(), d.getDate());
}

function startOfWeek(d: Date) {
  const copy = new Date(d);
  copy.setDate(copy.getDate() - copy.getDay());
  copy.setHours(0, 0, 0, 0);
  return copy;
}

export default function MonthCalendar({
  events,
  initialYear,
  initialMonth, // 0-indexed
}: {
  events: AssignmentEvent[];
  initialYear: number;
  initialMonth: number;
}) {
  const [view, setView] = useState<"month" | "week">("month");
  const [year, setYear] = useState(initialYear);
  const [month, setMonth] = useState(initialMonth);
  const [weekStart, setWeekStart] = useState(() => startOfWeek(new Date(initialYear, initialMonth, 1)));
  const [selected, setSelected] = useState<string | null>(null);

  const eventsByDate = new Map<string, AssignmentEvent[]>();
  for (const ev of events) {
    if (!eventsByDate.has(ev.date)) eventsByDate.set(ev.date, []);
    eventsByDate.get(ev.date)!.push(ev);
  }

  function shiftMonth(delta: number) {
    let m = month + delta;
    let y = year;
    if (m < 0) { m = 11; y -= 1; }
    if (m > 11) { m = 0; y += 1; }
    setMonth(m);
    setYear(y);
    setSelected(null);
  }

  function shiftWeek(delta: number) {
    const next = new Date(weekStart);
    next.setDate(next.getDate() + delta * 7);
    setWeekStart(next);
  }

  const firstDow = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array(firstDow).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    return d;
  });

  const selectedEvents = selected ? eventsByDate.get(selected) ?? [] : [];

  return (
    <div className="rounded-xl border border-line bg-white overflow-hidden">
      <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 border-b border-line gap-2">
        <h2 className="font-display text-base sm:text-lg font-bold truncate">Assignments</h2>
        <div className="flex items-center rounded-full bg-page p-0.5 shrink-0">
          <button
            onClick={() => setView("month")}
            className={`text-[11px] font-medium px-2.5 py-1 rounded-full transition-colors ${
              view === "month" ? "bg-board text-accentSoft" : "text-muted"
            }`}
          >
            Month
          </button>
          <button
            onClick={() => setView("week")}
            className={`text-[11px] font-medium px-2.5 py-1 rounded-full transition-colors ${
              view === "week" ? "bg-board text-accentSoft" : "text-muted"
            }`}
          >
            Week
          </button>
        </div>
      </div>

      {view === "month" ? (
        <>
          <div className="flex items-center justify-between px-3 sm:px-4 py-2 border-b border-line">
            <button onClick={() => shiftMonth(-1)} className="text-muted hover:text-ink px-1.5" aria-label="Previous month">←</button>
            <span className="font-mono text-xs text-muted">{MONTH_NAMES[month]} {year}</span>
            <button onClick={() => shiftMonth(1)} className="text-muted hover:text-ink px-1.5" aria-label="Next month">→</button>
          </div>

          <div className="grid grid-cols-7 border-b border-line">
            {DOW.map((d) => (
              <div key={d} className="text-center text-[9px] font-mono text-muted uppercase py-1.5">
                {d[0]}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7">
            {cells.map((day, i) => {
              const key = day ? toDateKey(year, month, day) : null;
              const dayEvents = key ? eventsByDate.get(key) ?? [] : [];
              const isSelected = key === selected;
              return (
                <button
                  key={i}
                  disabled={!day}
                  onClick={() => key && setSelected(isSelected ? null : key)}
                  className={`min-h-[46px] sm:min-h-[56px] border-b border-r border-line/60 p-1 text-left align-top transition-colors ${
                    day ? "hover:bg-page cursor-pointer" : "bg-page/40"
                  } ${isSelected ? "bg-accentSoft/40" : ""}`}
                >
                  {day && (
                    <>
                      <span className="font-mono text-[10px] text-muted">{day}</span>
                      <div className="mt-0.5 flex flex-wrap gap-0.5">
                        {dayEvents.slice(0, 3).map((ev) => (
                          <span
                            key={ev.id}
                            className={`w-1.5 h-1.5 rounded-full ${TYPE_STYLE[ev.type].bg.replace("/15", "")}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </button>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between px-3 sm:px-4 py-2 border-b border-line">
            <button onClick={() => shiftWeek(-1)} className="text-muted hover:text-ink px-1.5" aria-label="Previous week">←</button>
            <span className="font-mono text-xs text-muted">
              {weekDates[0].toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              {" – "}
              {weekDates[6].toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </span>
            <button onClick={() => shiftWeek(1)} className="text-muted hover:text-ink px-1.5" aria-label="Next week">→</button>
          </div>

          <div>
            {weekDates.map((d) => {
              const key = dateKeyFromDate(d);
              const dayEvents = eventsByDate.get(key) ?? [];
              const isSelected = key === selected;
              return (
                <button
                  key={key}
                  onClick={() => setSelected(isSelected ? null : key)}
                  className={`w-full flex items-start gap-2.5 px-3 sm:px-4 py-2 border-b border-line/60 text-left hover:bg-page transition-colors ${
                    isSelected ? "bg-accentSoft/40" : ""
                  }`}
                >
                  <div className="w-9 shrink-0 text-center">
                    <p className="font-mono text-[9px] text-muted uppercase">
                      {d.toLocaleDateString("en-US", { weekday: "short" })}
                    </p>
                    <p className="font-display text-sm font-bold">{d.getDate()}</p>
                  </div>
                  <div className="flex-1 flex flex-wrap gap-1 pt-1">
                    {dayEvents.length === 0 ? (
                      <span className="text-[11px] text-muted/60">—</span>
                    ) : (
                      dayEvents.map((ev) => {
                        const style = TYPE_STYLE[ev.type];
                        return (
                          <span
                            key={ev.id}
                            className={`text-[10px] font-medium rounded px-1.5 py-0.5 ${style.bg} ${style.text}`}
                          >
                            {ev.course}
                          </span>
                        );
                      })
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </>
      )}

      {selected && selectedEvents.length > 0 && (
        <div className="border-t border-line p-3 space-y-2">
          <p className="font-mono text-[10px] text-muted mb-1">
            {new Date(selected + "T00:00:00").toLocaleDateString("en-US", {
              weekday: "long", month: "long", day: "numeric",
            })}
          </p>
          {selectedEvents.map((ev) => {
            const style = TYPE_STYLE[ev.type];
            return (
              <div key={ev.id} className="flex items-start gap-2">
                <span className={`text-[9px] font-bold uppercase tracking-wide rounded px-1.5 py-0.5 shrink-0 ${style.bg} ${style.text}`}>
                  {style.label}
                </span>
                <div>
                  <p className="text-xs font-medium text-ink">
                    {ev.course} — {ev.title}
                  </p>
                  {ev.note && <p className="text-[10px] text-muted">{ev.note}</p>}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
