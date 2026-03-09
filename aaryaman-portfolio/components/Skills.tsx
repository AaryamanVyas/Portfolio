"use client";

import { Braces, Database, Wrench } from "lucide-react";
import { useEffect, useRef } from "react";
import { scrollReveal } from "../lib/animations";

const GROUPS = [
  {
    title: "Frontend",
    icon: Braces,
    skills: ["React", "React Native", "Angular", "HTML", "CSS"],
  },
  {
    title: "Backend",
    icon: Database,
    skills: ["Node.js", "MySQL", "REST APIs"],
  },
  {
    title: "Tools",
    icon: Wrench,
    skills: ["Git", "Linux", "Figma"],
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
          <p className="text-xs uppercase tracking-[0.22em] text-white/45">Skills</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            A stack built for shipping.
          </h2>
        </div>
        <p className="hidden max-w-sm text-sm leading-6 text-white/55 sm:block">
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
              className="glass rounded-3xl p-6 transition hover:bg-white/8"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10">
                  <Icon className="h-5 w-5 text-white/80" />
                </span>
                <div>
                  <p className="text-sm font-semibold tracking-tight text-white">{g.title}</p>
                  <p className="text-xs text-white/45">{g.skills.length} items</p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {g.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
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

