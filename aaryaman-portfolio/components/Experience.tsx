"use client";

import { useEffect, useRef } from "react";
import { scrollReveal } from "../lib/animations";

const ITEMS = [
  { role: "Software Engineer Intern", org: "TransBnk" },
  { role: "Frontend Developer Intern", org: "Startup" },
  { role: "Web Developer", org: "OSPC" },
  { role: "App Developer", org: "GDG" },
] as const;

export default function Experience() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const rows = Array.from(root.querySelectorAll("[data-row]"));
    let cleanup = () => {};
    (async () => {
      cleanup = await scrollReveal(rows, { stagger: 0.12, y: 18 });
    })();
    return () => cleanup();
  }, []);

  return (
    <section
      ref={rootRef}
      id="experience"
      className="mx-auto max-w-6xl px-4 py-24 sm:px-6"
    >
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-white/45">Experience</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Shipping in teams, not silos.
          </h2>
        </div>
        <p className="hidden max-w-sm text-sm leading-6 text-white/55 sm:block">
          I enjoy collaborating closely with design and product, iterating fast, and polishing the
          final 10%.
        </p>
      </div>

      <div className="mt-10 glass rounded-3xl p-6 sm:p-8">
        <div className="relative">
          <div className="pointer-events-none absolute left-[13px] top-2 h-[calc(100%-16px)] w-px bg-white/10" />

          <ul className="space-y-4">
            {ITEMS.map((item, idx) => (
              <li
                key={`${item.org}-${idx}`}
                data-row
                className="group relative flex gap-4 rounded-2xl p-4 transition hover:bg-white/5"
              >
                <div className="mt-1 h-7 w-7 shrink-0 rounded-full bg-white/5 ring-1 ring-white/12">
                  <div className="mx-auto mt-[10px] h-2 w-2 rounded-full bg-gradient-to-r from-sky-400 via-violet-400 to-emerald-300" />
                </div>
                <div className="flex w-full flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">{item.role}</p>
                    <p className="text-sm text-white/60">{item.org}</p>
                  </div>
                  <p className="text-xs text-white/45">Internship / Community</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

