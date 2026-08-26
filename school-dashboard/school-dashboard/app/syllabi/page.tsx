import { syllabi } from "@/lib/syllabi";

export default function SyllabiPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <header className="mb-8">
        <p className="font-mono text-xs text-accent uppercase tracking-[0.2em] mb-2">
          Fall 2026
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold">Syllabi</h1>
        <p className="text-sm text-muted mt-2">
          Every course syllabus, in one place — no more digging through
          Canvas modules.
        </p>
      </header>

      <div className="grid sm:grid-cols-2 gap-3">
        {syllabi.map((s) => (
          <a
            key={s.course}
            href={`/syllabi/${s.filename}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-line bg-white/60 p-4 flex items-start justify-between gap-3 hover:border-accent/50 transition-colors"
          >
            <div>
              <h2 className="font-display font-bold text-ink">{s.course}</h2>
              <p className="text-sm text-muted">{s.title}</p>
              <p className="text-xs text-muted mt-1">{s.instructor}</p>
            </div>
            <span className="font-mono text-[10px] text-accent uppercase tracking-wide shrink-0 mt-1">
              {s.filename.endsWith(".docx") ? "DOCX" : "PDF"} ↓
            </span>
          </a>
        ))}
      </div>
    </main>
  );
}
