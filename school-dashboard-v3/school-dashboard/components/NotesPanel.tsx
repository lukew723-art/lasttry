"use client";

import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "semester-board-notes";

export default function NotesPanel() {
  const [text, setText] = useState("");
  const [status, setStatus] = useState<"idle" | "saved">("idle");
  const loaded = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved !== null) setText(saved);
    } catch {
      // ignore
    }
    loaded.current = true;
  }, []);

  function handleChange(value: string) {
    setText(value);
    if (!loaded.current) return;

    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      window.localStorage.setItem(STORAGE_KEY, value);
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 1200);
    }, 500);
  }

  return (
    <div className="rounded-xl border border-line bg-white/60 p-4 sm:p-5">
      <div className="flex items-baseline justify-between mb-2">
        <h2 className="font-display text-xl">Notes</h2>
        <span className="text-xs text-muted h-4">
          {status === "saved" ? "Saved" : "Autosaves in this browser"}
        </span>
      </div>
      <textarea
        value={text}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Anything you want to jot down — reminders, professor contact info, whatever..."
        rows={5}
        className="w-full rounded-md border border-line bg-page px-3 py-2 text-sm text-ink focus:border-accent outline-none resize-y"
      />
    </div>
  );
}
