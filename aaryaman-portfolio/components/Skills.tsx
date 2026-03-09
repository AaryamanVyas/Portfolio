"use client";

import { Braces, Database, Wrench } from "lucide-react";
import { useEffect, useRef } from "react";
import { scrollReveal } from "../lib/animations";

const GROUPS = [
  {
    title: "Frontend",
    icon: Braces,
    skills: ["React.js", "React Native", "Angular", "HTML", "CSS", "JavaScript", "TypeScript"],
  },
  {
    title: "Backend",
    icon: Database,
    skills: ["Node.js", "Sequelize", "MySQL", "REST APIs"],
  },
  {
    title: "Tools",
    icon: Wrench,
    skills: ["Git", "GitHub", "Bitbucket", "Postman", "Linux", "Figma"],
  },
] as const;

export default function Skills() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll("[data-skill-group]"));
    let cleanup = () => {};
    (async () => {
      cleanup = await scrollReveal(items, { stagger: 0.12, y: 18 });
    })();
    return () => cleanup();
  }, []);

  return (
    <section
      ref={rootRef}
      id="skills"
      className="mx-auto max-w-6xl px-4 py-24 sm:px-6"
    >
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Skills</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--accent-dark)] sm:text-4xl">
            A stack built for shipping.
          </h2>
        </div>
        <p className="hidden max-w-sm text-sm leading-6 text-slate-600 sm:block">
          Strong fundamentals, modern tooling, and a focus on maintainable systems.
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {GROUPS.map((g) => {
          const Icon = g.icon;
          return (
            <div
              key={g.title}
              data-skill-group
              className="glass rounded-3xl p-6 transition hover:bg-[rgba(255,255,255,0.96)]"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[color-mix(in_srgb,var(--accent-subtle)_18%,transparent)] ring-1 ring-[var(--border)]">
                  <Icon className="h-5 w-5 text-[var(--accent-dark)]" />
                </span>
                <div>
                  <p className="text-sm font-semibold tracking-tight text-[var(--accent-dark)]">
                    {g.title}
                  </p>
                  <p className="text-xs text-slate-500">{g.skills.length} items</p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {g.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-[var(--border)] bg-[var(--panel-strong)] px-3 py-1 text-xs text-[var(--muted)]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

