"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Schedule" },
  { href: "/assignments", label: "Assignments" },
  { href: "/syllabi", label: "Syllabi" },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-line bg-white/70 backdrop-blur sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center gap-1 h-14">
        {LINKS.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                active ? "bg-board text-accentSoft" : "text-muted hover:text-ink"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
