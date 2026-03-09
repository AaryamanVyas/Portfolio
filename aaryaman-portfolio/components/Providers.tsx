"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { initSmoothScroll } from "../lib/smoothScroll";
import CursorGlow from "./CursorGlow";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function resolveInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within Providers");
  }
  return ctx;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  // On client, reconcile with stored / system preference *after* hydration
  useEffect(() => {
    const initial = resolveInitialTheme();
    setTheme(initial);
  }, []);

  useEffect(() => {
    // apply theme to <html>
    if (typeof document !== "undefined") {
      document.documentElement.dataset.theme = theme;
      window.localStorage.setItem("theme", theme);
    }
  }, [theme]);

  useEffect(() => {
    const init = initSmoothScroll();
    if (!init) return;

    let cleanupScrollTrigger = () => {};
    (async () => {
      const gsapMod = await import("gsap");
      const stMod = await import("gsap/ScrollTrigger");
      const gsap = (gsapMod as unknown as { gsap: typeof import("gsap").gsap }).gsap;
      const ScrollTrigger = (
        stMod as unknown as { ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger }
      ).ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      const lenis = init.lenis as unknown as {
        on: (ev: string, cb: () => void) => void;
        off?: (ev: string, cb: () => void) => void;
      };

      const update = () => ScrollTrigger.update();
      lenis.on("scroll", update);
      ScrollTrigger.refresh();

      cleanupScrollTrigger = () => lenis.off?.("scroll", update);
    })();

    return () => {
      cleanupScrollTrigger();
      init.destroy();
    };
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme: () => setTheme((prev) => (prev === "light" ? "dark" : "light")),
      }}
    >
      {children}
      <CursorGlow />
    </ThemeContext.Provider>
  );
}

