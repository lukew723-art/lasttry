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

export default function MonthCalendar({
  events,
  initialYear,
  initialMonth, // 0-indexed
}: {
  events: AssignmentEvent[];
  initialYear: number;
  initialMonth: number;
}) {
  const [year, setYear] = useState(initialYear);
  const [month, setMonth] = useState(initialMonth);
  const [selected, setSelected] = useState<string | null>(null);

  const firstDow = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = [
    ...Array(firstDow).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

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

  const selectedEvents = selected ? eventsByDate.get(selected) ?? [] : [];

  return (
    <div className="rounded-xl border border-line bg-white overflow-hidden">
      <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-line">
        <button
          onClick={() => shiftMonth(-1)}
          className="text-muted hover:text-ink px-2 py-1 rounded transition-colors"
          aria-label="Previous month"
        >
          ←
        </button>
        <h2 className="font-display text-lg font-bold">
          {MONTH_NAMES[month]} {year}
        </h2>
        <button
          onClick={() => shiftMonth(1)}
          className="text-muted hover:text-ink px-2 py-1 rounded transition-colors"
          aria-label="Next month"
        >
          →
        </button>
      </div>

      <div className="grid grid-cols-7 border-b border-line">
        {DOW.map((d) => (
          <div key={d} className="text-center text-[10px] font-mono text-muted uppercase py-2">
            {d}
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
              className={`min-h-[64px] sm:min-h-[80px] border-b border-r border-line/60 p-1.5 text-left align-top transition-colors ${
                day ? "hover:bg-page cursor-pointer" : "bg-page/40"
              } ${isSelected ? "bg-accentSoft/40" : ""}`}
            >
              {day && (
                <>
                  <span className="font-mono text-[11px] text-muted">{day}</span>
                  <div className="mt-1 space-y-0.5">
                    {dayEvents.slice(0, 3).map((ev) => {
                      const style = TYPE_STYLE[ev.type];
                      return (
                        <div
                          key={ev.id}
                          className={`text-[9px] sm:text-[10px] leading-tight rounded px-1 py-0.5 truncate ${style.bg} ${style.text} font-medium`}
                        >
                          {ev.course}
                        </div>
                      );
                    })}
                    {dayEvents.length > 3 && (
                      <div className="text-[9px] text-muted pl-1">+{dayEvents.length - 3} more</div>
                    )}
                  </div>
                </>
              )}
            </button>
          );
        })}
      </div>

      {selected && selectedEvents.length > 0 && (
        <div className="border-t border-line p-4 space-y-2">
          <p className="font-mono text-xs text-muted mb-2">
            {new Date(selected + "T00:00:00").toLocaleDateString("en-US", {
              weekday: "long", month: "long", day: "numeric",
            })}
          </p>
          {selectedEvents.map((ev) => {
            const style = TYPE_STYLE[ev.type];
            return (
              <div key={ev.id} className="flex items-start gap-3">
                <span className={`text-[10px] font-bold uppercase tracking-wide rounded px-1.5 py-0.5 shrink-0 ${style.bg} ${style.text}`}>
                  {style.label}
                </span>
                <div>
                  <p className="text-sm font-medium text-ink">
                    {ev.course} — {ev.title}
                  </p>
                  {ev.note && <p className="text-xs text-muted">{ev.note}</p>}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
