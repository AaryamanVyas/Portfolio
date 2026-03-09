"use client";

import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { scrollReveal } from "../lib/animations";
import TiltCard from "./ui/TiltCard";

const PROJECTS = [
  {
    title: "VIT Carpool App",
    desc: "A student-first carpool experience with smooth onboarding, matching, and ride flows.",
    tags: ["React Native", "UI/UX", "Performance"],
    href: "#",
  },
  {
    title: "Veteran Reintegration System",
    desc: "A platform concept focused on structured reintegration with dashboards and workflows.",
    tags: ["React", "Data UI", "APIs"],
    href: "#",
  },
  {
    title: "OSPC Website",
    desc: "A fast, modern site for a developer community with interactive sections and motion.",
    tags: ["Next.js", "GSAP", "SEO"],
    href: "#",
  },
  {
    title: "React Native Capstone",
    desc: "A polished mobile app project built with a product mindset and clean architecture.",
    tags: ["React Native", "TypeScript", "Design Systems"],
    href: "#",
  },
] as const;

export default function Projects() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const cards = Array.from(root.querySelectorAll("[data-project]"));
    let cleanup = () => {};
    (async () => {
      cleanup = await scrollReveal(cards, { stagger: 0.1, y: 22 });
    })();
    return () => cleanup();
  }, []);

  return (
    <section
      ref={rootRef}
      id="projects"
      className="mx-auto max-w-6xl px-4 py-24 sm:px-6"
    >
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-white/45">Projects</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Selected work with a premium feel.
          </h2>
        </div>
        <p className="hidden max-w-sm text-sm leading-6 text-white/55 sm:block">
          A mix of apps and web experiences—built with careful motion, performance, and clean UI
          systems.
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {PROJECTS.map((p) => (
          <TiltCard
            key={p.title}
            className="group glass rounded-3xl p-6 transition will-change-transform hover:bg-white/8"
          >
            <div data-project className="flex h-full flex-col">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-white">{p.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/60">{p.desc}</p>
                </div>
                <a
                  href={p.href}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10 transition group-hover:bg-white/10"
                  aria-label={`Open ${p.title}`}
                >
                  <ArrowUpRight className="h-4 w-4 text-white/80 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/65"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-7 h-px w-full bg-white/10" />

              <div className="mt-6 flex items-center justify-between">
                <p className="text-xs text-white/45">Hover to tilt</p>
                <div className="h-2 w-16 rounded-full bg-gradient-to-r from-sky-400/40 via-violet-400/40 to-emerald-300/40 blur-[1px]" />
              </div>
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}

