"use client";

import { useEffect, useState } from "react";

interface GradeEntry {
  course: string;
  grade: string;
}

const STORAGE_KEY = "semester-board-grades";

export default function GradesPanel({ courseCodes }: { courseCodes: string[] }) {
  const [grades, setGrades] = useState<Record<string, string>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setGrades(JSON.parse(raw));
    } catch {
      // ignore
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(grades));
  }, [grades, loaded]);

  return (
    <div className="rounded-xl border border-line bg-white/60 p-4 sm:p-5">
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="font-display text-xl">Grades</h2>
        <span className="text-xs text-muted">
          Entered manually — Canvas doesn't expose grades without an API token
        </span>
      </div>
      <div className="space-y-2">
        {courseCodes.map((code) => (
          <div key={code} className="flex items-center justify-between gap-3">
            <span className="font-mono text-sm text-ink">{code}</span>
            <input
              type="text"
              value={grades[code] ?? ""}
              onChange={(e) =>
                setGrades((g) => ({ ...g, [code]: e.target.value }))
              }
              placeholder="—"
              className="w-24 rounded-md border border-line bg-page px-2 py-1 text-sm text-right font-mono focus:border-accent outline-none"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
