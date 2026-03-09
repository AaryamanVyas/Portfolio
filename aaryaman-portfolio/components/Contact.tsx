"use client";

import { Github, Linkedin, Mail, Send } from "lucide-react";
import { useEffect, useRef } from "react";
import Magnetic from "./ui/Magnetic";
import { scrollReveal } from "../lib/animations";

const LINKS = [
  {
    label: "Email",
    href: "mailto:aaryamanvyas@example.com",
    icon: Mail,
    detail: "aaryamanvyas@example.com",
  },
  {
    label: "GitHub",
    href: "https://github.com/",
    icon: Github,
    detail: "github.com/…",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/",
    icon: Linkedin,
    detail: "linkedin.com/in/…",
  },
] as const;

export default function Contact() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll("[data-contact-item]"));
    let cleanup = () => {};
    (async () => {
      cleanup = await scrollReveal(items, { stagger: 0.1, y: 18 });
    })();
    return () => cleanup();
  }, []);

  return (
    <section
      ref={rootRef}
      id="contact"
      className="mx-auto max-w-6xl px-4 pt-24 pb-28 sm:px-6"
    >
      <div className="glass rounded-3xl p-8 sm:p-10">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.22em] text-white/45">Contact</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Let’s build something sleek.
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/60">
              If you’re looking for someone who cares about motion, polish, and shipping with high
              standards, I’d love to connect.
            </p>
          </div>

          <Magnetic>
            <a
              href={LINKS[0].href}
              className="glass-strong inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-white transition hover:bg-white/12"
            >
              <Send className="h-4 w-4 text-sky-200" />
              Say hello
            </a>
          </Magnetic>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          {LINKS.map((l) => {
            const Icon = l.icon;
            return (
              <Magnetic key={l.label}>
                <a
                  data-contact-item
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel={l.href.startsWith("http") ? "noreferrer" : undefined}
                  className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10">
                    <Icon className="h-5 w-5 text-white/80" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white">{l.label}</p>
                    <p className="truncate text-xs text-white/50">{l.detail}</p>
                  </div>
                </a>
              </Magnetic>
            );
          })}
        </div>

        <div className="mt-10 flex items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/45">
          <p>© {new Date().getFullYear()} Aaryaman Vyas</p>
          <p className="hidden sm:block">Built with Next.js, R3F, GSAP, and Framer Motion</p>
        </div>
      </div>
    </section>
  );
}

