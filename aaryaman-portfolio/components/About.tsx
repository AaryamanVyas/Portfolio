"use client";

import { GraduationCap, Laptop, Rocket } from "lucide-react";
import { useEffect, useRef } from "react";
import { scrollReveal } from "../lib/animations";

const CARDS = [
  {
    icon: GraduationCap,
    title: "VIT Chennai student",
    body: "Computer Science student focused on building real products, not just demos.",
  },
  {
    icon: Rocket,
    title: "Frontend + software engineer intern",
    body: "Comfortable shipping features end-to-end with clean architecture and strong UX.",
  },
  {
    icon: Laptop,
    title: "React / React Native developer",
    body: "Component-driven UI, performance-first patterns, and smooth interactions across devices.",
  },
] as const;

export default function About() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const cards = Array.from(root.querySelectorAll("[data-card]"));
    let cleanup = () => {};
    (async () => {
      cleanup = await scrollReveal(cards, { stagger: 0.12, y: 22 });
    })();
    return () => cleanup();
  }, []);

  return (
    <section
      ref={rootRef}
      id="about"
      className="mx-auto max-w-6xl px-4 py-24 sm:px-6"
    >
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-white/45">About</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Design-minded engineer. Motion-first.
          </h2>
        </div>
        <p className="hidden max-w-sm text-sm leading-6 text-white/55 sm:block">
          I care about the tiny UI details that make a product feel premium—timing, spacing,
          feedback, and performance.
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              data-card
              className="glass group rounded-3xl p-6 transition hover:bg-white/8"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10">
                  <Icon className="h-5 w-5 text-white/80" />
                </span>
                <span className="h-2 w-2 rounded-full bg-gradient-to-r from-sky-400 via-violet-400 to-emerald-300 opacity-70" />
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight text-white">
                {card.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-white/60">{card.body}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

