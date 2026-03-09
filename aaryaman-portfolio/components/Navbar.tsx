"use client";

import { useEffect, useMemo, useState } from "react";
import { Github, Linkedin, Mail, Sparkles } from "lucide-react";
import Magnetic from "./ui/Magnetic";
import { useLenisScrollTo, useScrollProgress } from "../lib/smoothScroll";

const NAV = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;

export default function Navbar() {
  const progress = useScrollProgress();
  const scrollTo = useLenisScrollTo();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled((document.documentElement.scrollTop ?? 0) > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const progressPct = useMemo(() => `${Math.round(progress * 100)}%`, [progress]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="h-[2px] w-full bg-white/5">
        <div
          className="h-full bg-gradient-to-r from-sky-400 via-violet-400 to-emerald-300"
          style={{ width: progressPct }}
        />
      </div>

      <div
        className={[
          "mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6",
          "transition-all",
          scrolled ? "glass shadow-[0_12px_40px_-22px_rgba(0,0,0,0.75)]" : "bg-transparent",
        ].join(" ")}
      >
        <button
          onClick={() => scrollTo("#top", { offset: -80 })}
          className="group flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium tracking-tight text-white/90 hover:text-white"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 transition group-hover:bg-white/8">
            <Sparkles className="h-4 w-4 text-violet-200" />
          </span>
          <span className="hidden sm:inline">Aaryaman Vyas</span>
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href, { offset: -90 })}
              className="rounded-full px-3 py-2 text-sm text-white/70 transition hover:bg-white/5 hover:text-white/90"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Magnetic>
            <a
              href="mailto:aaryamanvyas@example.com"
              className="glass inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/10"
              aria-label="Email"
            >
              <Mail className="h-4 w-4 text-white/80" />
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="glass inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/10"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4 text-white/80" />
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="glass inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/10"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4 text-white/80" />
            </a>
          </Magnetic>

          <Magnetic className="hidden sm:block">
            <button
              onClick={() => scrollTo("#projects", { offset: -90 })}
              className="glass-strong ml-1 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white shadow-[0_10px_28px_-18px_rgba(0,0,0,0.9)] transition hover:bg-white/12"
            >
              View work
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10">
                <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-sky-400 via-violet-400 to-emerald-300" />
              </span>
            </button>
          </Magnetic>
        </div>
      </div>
    </header>
  );
}

