"use client";

import { useEffect, useMemo, useState } from "react";
import { Github, Linkedin, Mail, Moon, Sparkles, Sun } from "lucide-react";
import Magnetic from "./ui/Magnetic";
import { useLenisScrollTo, useScrollProgress } from "../lib/smoothScroll";
import { useTheme } from "./Providers";

const NAV = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
] as const;

export default function Navbar() {
  const progress = useScrollProgress();
  const scrollTo = useLenisScrollTo();
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled((document.documentElement.scrollTop ?? 0) > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const progressPct = useMemo(() => `${Math.round(progress * 100)}%`, [progress]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="h-[2px] w-full bg-[rgba(255,255,255,0.9)]">
        <div
          className="h-full bg-gradient-to-r from-[var(--accent-celadon)] via-[var(--accent-wisteria)] to-[var(--accent-coral)]"
          style={{ width: progressPct }}
        />
      </div>

      <div
        className={[
          "mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6",
          "transition-all",
          scrolled
            ? "glass shadow-[0_12px_40px_-22px_rgba(15,23,42,0.35)]"
            : "bg-[var(--panel-strong)]",
        ].join(" ")}
      >
        <button
          onClick={() => scrollTo("#top", { offset: -72 })}
          className="group flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium tracking-tight text-[var(--foreground)] hover:text-[var(--accent-dark)]"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 transition group-hover:bg-white/8">
                <Sparkles className="h-4 w-4 text-[var(--accent-soft)]" />
          </span>
          <span className="hidden sm:inline">Aaryaman Vyas</span>
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href, { offset: -72 })}
              className="rounded-full px-3 py-2 text-sm text-[var(--muted)] transition hover:bg-[color-mix(in_srgb,var(--accent-subtle)_18%,transparent)] hover:text-[var(--accent-dark)]"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Magnetic>
            <a
              href="mailto:aaryaman.v.vyas@gmail.com"
              className="glass inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-[var(--panel-strong)]"
              aria-label="Email"
            >
              <Mail className="h-4 w-4 text-[var(--accent-dark)]" />
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="https://github.com/AaryamanVyas"
              target="_blank"
              rel="noreferrer"
              className="glass inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-[var(--panel-strong)]"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4 text-[var(--accent-dark)]" />
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="https://www.linkedin.com/in/aaryaman-vyas-44240121a/"
              target="_blank"
              rel="noreferrer"
              className="glass inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-[var(--panel-strong)]"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4 text-[var(--accent-dark)]" />
            </a>
          </Magnetic>

          <Magnetic className="hidden sm:block">
            <button
              onClick={() => scrollTo("#projects", { offset: -90 })}
              className="glass-strong ml-1 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-[var(--accent-dark)] shadow-[0_10px_28px_-18px_rgba(0,0,0,0.25)] transition hover:bg-[var(--panel-strong)]"
            >
              View work
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10">
                <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[var(--accent-subtle)] via-[var(--accent-soft)] to-[var(--accent-pop)]" />
              </span>
            </button>
          </Magnetic>

          <Magnetic>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle color mode"
              className="glass inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/10"
            >
              {theme === "light" ? (
                <Moon className="h-4 w-4 text-[var(--accent-dark)]" />
              ) : (
                <Sun className="h-4 w-4 text-[var(--accent-subtle)]" />
              )}
            </button>
          </Magnetic>
        </div>
      </div>
    </header>
  );
}

