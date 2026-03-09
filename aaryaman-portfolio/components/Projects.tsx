"use client";

import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { scrollReveal } from "../lib/animations";
import TiltCard from "./ui/TiltCard";

const PROJECTS = [
  {
    title: "VIT Carpool App",
    desc: "React Native app enabling student ride-sharing with authentication and ride matching flows.",
    tags: ["React Native", "Authentication", "UX"],
    href: "https://github.com/AaryamanVyas", // placeholder repo
  },
  {
    title: "Veteran Reintegration System",
    desc: "MongoDB-based system with role-based access control and structured case management.",
    tags: ["React", "MongoDB", "Role-based access"],
    href: "https://github.com/AaryamanVyas", // placeholder repo
  },
  {
    title: "Front-End Developer Capstone",
    desc: "Meta Front-End Developer Capstone project focusing on real-world UI patterns and accessibility.",
    tags: ["React", "Front-End", "Capstone"],
    href: "https://github.com/AaryamanVyas/Front-End-Developer-Capstone",
  },
  {
    title: "Advanced React Project",
    desc: "Final project for an advanced React course with state management and routing.",
    tags: ["Advanced React", "Routing", "State"],
    href: "https://github.com/AaryamanVyas/advanced-React/tree/main/final-project",
  },
  {
    title: "React Native Capstone Project",
    desc: "Meta React Native Capstone mobile app built with React Native, TypeScript, and clean patterns.",
    tags: ["React Native", "TypeScript", "Capstone"],
    href: "https://github.com/AaryamanVyas/React-native-capstone",
  },
  {
    title: "React Native Final Assignment",
    desc: "Assignment project showcasing React Native layouts, navigation, and data flows.",
    tags: ["React Native", "Assignments"],
    href: "https://github.com/AaryamanVyas/React-native-final-assignment",
  },
  {
    title: "OSPC Website",
    desc: "Official site for the Open Source Programming Club (OSPC) at VIT Chennai.",
    tags: ["Next.js", "Community", "Open Source"],
    href: "https://github.com/OSPC-VITC/ospc-website",
  },
  {
    title: "UX / UI Design Assignment",
    desc: "UX/UI design-focused assignment translating Figma-style thinking into front-end implementation.",
    tags: ["UX/UI", "Design", "Front-End"],
    href: "https://github.com/AaryamanVyas/final-assignment",
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
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Projects</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--accent-dark)] sm:text-4xl">
            Projects & GitHub work.
          </h2>
        </div>
        <p className="hidden max-w-sm text-sm leading-6 text-slate-600 sm:block">
          A mix of course capstones, community work, and production-style projects.
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {PROJECTS.map((p) => (
          <TiltCard
            key={p.title}
            className="group glass rounded-3xl p-6 transition will-change-transform hover:bg-[rgba(255,255,255,0.96)]"
          >
            <div data-project className="flex h-full flex-col">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-[var(--accent-dark)]">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{p.desc}</p>
                </div>
                <a
                  href={p.href}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[rgba(51,92,103,0.05)] ring-1 ring-[rgba(51,92,103,0.15)] transition group-hover:bg-[rgba(51,92,103,0.08)]"
                  aria-label={`Open ${p.title}`}
                >
                  <ArrowUpRight className="h-4 w-4 text-[var(--accent-dark)] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-[var(--border)] bg-[var(--panel-strong)] px-3 py-1 text-xs text-[var(--muted)]"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-7 h-px w-full bg-[rgba(51,92,103,0.12)]" />

              <div className="mt-6 flex items-center justify-between">
                <p className="text-xs text-slate-500">Hover to tilt</p>
                <div className="h-2 w-16 rounded-full bg-gradient-to-r from-[var(--accent-celadon)]/60 via-[var(--accent-wisteria)]/60 to-[var(--accent-coral)]/60 blur-[1px]" />
              </div>
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}

