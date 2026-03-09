"use client";

import { Award } from "lucide-react";
import { useEffect, useRef } from "react";
import { scrollReveal } from "../lib/animations";

const CERTS = [
  {
    title: "Meta Front-End Developer Specialization",
    provider: "Coursera",
    date: "June 2024",
    href: "https://coursera.org/share/d90a0813fda103f6d3ac2f36e1b992d9",
  },
  {
    title: "Meta React Native Specialization",
    provider: "Coursera",
    date: "Jan 2025",
    href: "https://coursera.org/share/e5454a8f6f3929054444cdd46393a241",
  },
] as const;

export default function Certifications() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const rows = Array.from(root.querySelectorAll("[data-cert]"));
    let cleanup = () => {};
    (async () => {
      cleanup = await scrollReveal(rows, { stagger: 0.12, y: 16 });
    })();
    return () => cleanup();
  }, []);

  return (
    <section
      ref={rootRef}
      id="certifications"
      className="mx-auto max-w-6xl px-4 py-24 sm:px-6"
    >
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Certifications</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--accent-dark)] sm:text-4xl">
            Continuous learning.
          </h2>
        </div>
        <p className="hidden max-w-sm text-sm leading-6 text-slate-600 sm:block">
          Industry-recognized specializations focused on modern front-end and React Native.
        </p>
      </div>

      <div className="mt-10 space-y-4">
        {CERTS.map((c) => (
          <a
            key={c.title}
            data-cert
            href={c.href}
            target="_blank"
            rel="noreferrer"
            className="glass flex items-center justify-between gap-4 rounded-3xl p-5 transition hover:bg-[rgba(255,255,255,0.96)]"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgba(51,92,103,0.06)] ring-1 ring-[rgba(51,92,103,0.12)]">
                <Award className="h-5 w-5 text-[var(--accent-dark)]" />
              </span>
              <div>
                <p className="text-sm font-semibold text-[var(--accent-dark)]">{c.title}</p>
                <p className="text-xs text-slate-500">{c.provider}</p>
              </div>
            </div>
            <p className="text-xs text-slate-500">{c.date}</p>
          </a>
        ))}
      </div>
    </section>
  );
}

