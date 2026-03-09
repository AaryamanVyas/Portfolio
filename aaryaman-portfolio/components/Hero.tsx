"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";
import Magnetic from "./ui/Magnetic";
import { parallaxY } from "../lib/animations";
import { useLenisScrollTo } from "../lib/smoothScroll";

const Scene3D = dynamic(() => import("./Scene3D"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 grid place-items-center">
      <div className="glass h-24 w-24 animate-pulse rounded-3xl" />
    </div>
  ),
});

export default function Hero() {
  const scrollTo = useLenisScrollTo();
  const bubbleRef = useRef<HTMLDivElement | null>(null);
  const bubble2Ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cleanups: Array<() => void> = [];
    (async () => {
      if (bubbleRef.current) cleanups.push(await parallaxY(bubbleRef.current, { y: -90 }));
      if (bubble2Ref.current) cleanups.push(await parallaxY(bubble2Ref.current, { y: -60 }));
    })();
    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <section id="top" className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Scene3D />
      </div>

      {/* subtle overlay just to ground the 3D object, keep overall page light */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-gradient-to-b from-[rgba(255,255,255,0.85)] via-[rgba(255,255,255,0.9)] to-[rgba(255,255,255,0.95)]" />

      <div
        ref={bubbleRef}
        className="pointer-events-none absolute -left-28 top-28 h-72 w-72 rounded-full bg-sky-500/10 blur-2xl"
      />
      <div
        ref={bubble2Ref}
        className="pointer-events-none absolute -right-28 top-10 h-80 w-80 rounded-full bg-violet-500/12 blur-2xl"
      />

      <div className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-4 pt-28 pb-20 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <div className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs text-[var(--accent-celadon)]">
            <Sparkles className="h-4 w-4 text-[var(--accent-light-green)]" />
            Front-End Developer & Software Engineering Intern
          </div>

          <h1 className="mt-6 text-balance text-5xl font-semibold leading-[1.03] tracking-tight text-[var(--accent-dark)] sm:text-6xl">
            <span className="animated-gradient-text">Aaryaman Vyas</span>{" "}
            <span className="text-slate-800">— Frontend Developer</span>
          </h1>

          <p className="mt-5 max-w-2xl text-pretty text-lg leading-8 text-slate-600">
            Front-End Developer and Software Engineering intern experienced in React, React Native,
            and Node.js. Second-year CSE undergraduate, active in student developer communities at
            VIT Chennai (OSPC, GDG).
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Magnetic>
              <button
                onClick={() => scrollTo("#projects", { offset: -72 })}
                className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium text-[var(--accent-dark)] shadow-[0_18px_40px_-24px_rgba(0,0,0,0.95)] transition"
                style={{
                  background:
                    "linear-gradient(135deg, var(--accent-coral), var(--accent-light-green))",
                }}
              >
                Explore projects
              </button>
            </Magnetic>
            <Magnetic>
              <button
                onClick={() => scrollTo("#contact", { offset: -72 })}
                className="glass inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium text-white/90 transition hover:bg-white/10"
              >
                Let’s talk
              </button>
            </Magnetic>
          </div>
        </motion.div>

        <div className="mt-14 flex items-center gap-3 text-xs text-slate-500">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="hidden sm:inline">Scroll</span>
          <button
            onClick={() => scrollTo("#about", { offset: -72 })}
            className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white transition hover:bg-slate-50"
            aria-label="Scroll to About"
          >
            <ArrowDown className="h-4 w-4 text-slate-700 transition group-hover:translate-y-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
}

