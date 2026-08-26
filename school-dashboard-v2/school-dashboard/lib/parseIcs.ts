// Minimal, dependency-free .ics parser tuned for Canvas calendar feed exports.
// Handles: VEVENT blocks, folded lines, weekly RRULE (BYDAY/UNTIL), EXDATE lists.

export interface CourseEvent {
  code: string; // e.g. "STC 116" (from SUMMARY)
  title: string; // e.g. "PRINC PUBL RELATIO" (from DESCRIPTION)
  location: string;
  dtstart: Date;
  dtend: Date;
  byday: string[]; // ['MO','WE'] etc. Empty = single/non-recurring event.
  until: Date | null;
  exdates: Date[];
}

export interface MeetingInstance {
  event: CourseEvent;
  start: Date;
  end: Date;
}

const DAY_CODE: Record<string, number> = {
  SU: 0,
  MO: 1,
  TU: 2,
  WE: 3,
  TH: 4,
  FR: 5,
  SA: 6,
};

export const DAY_LABEL: Record<number, string> = {
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat",
};

function parseIcsDate(value: string): Date {
  // Expected shape: YYYYMMDDTHHMMSS (optionally trailing Z, treated as local)
  const y = Number(value.slice(0, 4));
  const mo = Number(value.slice(4, 6)) - 1;
  const d = Number(value.slice(6, 8));
  const h = Number(value.slice(9, 11) || "0");
  const mi = Number(value.slice(11, 13) || "0");
  const s = Number(value.slice(13, 15) || "0");
  return new Date(y, mo, d, h, mi, s);
}

export function parseIcs(text: string): CourseEvent[] {
  // Unfold lines: continuation lines start with a space or tab.
  const unfolded = text.replace(/\r\n[ \t]/g, "").split(/\r\n|\n/);

  const events: CourseEvent[] = [];
  let cur: Record<string, string> | null = null;

  for (const line of unfolded) {
    if (line === "BEGIN:VEVENT") {
      cur = {};
      continue;
    }
    if (line === "END:VEVENT") {
      if (cur) events.push(finalizeEvent(cur));
      cur = null;
      continue;
    }
    if (!cur) continue;

    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const rawKey = line.slice(0, idx);
    const value = line.slice(idx + 1);
    const key = rawKey.split(";")[0];
    cur[key] = value;
  }

  return events;
}

function finalizeEvent(cur: Record<string, string>): CourseEvent {
  const rrule = cur.RRULE || "";
  const rruleParts: Record<string, string> = {};
  for (const part of rrule.split(";").filter(Boolean)) {
    const [k, v] = part.split("=");
    rruleParts[k] = v;
  }

  const byday = rruleParts.BYDAY ? rruleParts.BYDAY.split(",") : [];
  const until = rruleParts.UNTIL ? parseIcsDate(rruleParts.UNTIL) : null;
  const exdates = cur.EXDATE
    ? cur.EXDATE.split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .map(parseIcsDate)
    : [];

  return {
    code: (cur.SUMMARY || "Untitled").trim(),
    title: (cur.DESCRIPTION || "").trim(),
    location: (cur.LOCATION || "").trim(),
    dtstart: parseIcsDate(cur.DTSTART),
    dtend: parseIcsDate(cur.DTEND),
    byday,
    until,
    exdates,
  };
}

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

// Expands recurring events into individual meeting instances within [rangeStart, rangeEnd].
export function expandInstances(
  events: CourseEvent[],
  rangeStart: Date,
  rangeEnd: Date
): MeetingInstance[] {
  const instances: MeetingInstance[] = [];

  for (const ev of events) {
    const days = ev.byday.length
      ? ev.byday.map((d) => DAY_CODE[d]).filter((n) => n !== undefined)
      : [ev.dtstart.getDay()];

    const boundEnd = ev.until ?? rangeEnd;
    const start = new Date(Math.max(ev.dtstart.getTime(), rangeStart.getTime()));
    const end = new Date(Math.min(boundEnd.getTime(), rangeEnd.getTime()));

    const durationMs = ev.dtend.getTime() - ev.dtstart.getTime();

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      if (!days.includes(d.getDay())) continue;

      const instStart = new Date(d);
      instStart.setHours(
        ev.dtstart.getHours(),
        ev.dtstart.getMinutes(),
        ev.dtstart.getSeconds(),
        0
      );

      const excluded = ev.exdates.some((ex) => sameDay(ex, instStart));
      if (excluded) continue;

      const instEnd = new Date(instStart.getTime() + durationMs);
      instances.push({ event: ev, start: instStart, end: instEnd });
    }
  }

  return instances.sort((a, b) => a.start.getTime() - b.start.getTime());
}

// A "typical week" grid built straight from each course's BYDAY pattern —
// useful for a recurring weekly schedule view that doesn't depend on today's date.
export function weeklyPattern(events: CourseEvent[]) {
  const byDay: Record<number, { event: CourseEvent }[]> = {
    0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [],
  };

  for (const ev of events) {
    const days = ev.byday.length
      ? ev.byday.map((d) => DAY_CODE[d]).filter((n) => n !== undefined)
      : [ev.dtstart.getDay()];
    for (const d of days) {
      byDay[d].push({ event: ev });
    }
  }

  for (const d of Object.keys(byDay)) {
    byDay[Number(d)].sort(
      (a, b) => a.event.dtstart.getTime() - b.event.dtstart.getTime()
    );
  }

  return byDay;
}

export function semesterRange(events: CourseEvent[]) {
  const starts = events.map((e) => e.dtstart.getTime());
  const ends = events
    .map((e) => e.until?.getTime())
    .filter((t): t is number => typeof t === "number");
  return {
    start: new Date(Math.min(...starts)),
    end: ends.length ? new Date(Math.max(...ends)) : null,
  };
}

export function formatTime(d: Date) {
  return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}
