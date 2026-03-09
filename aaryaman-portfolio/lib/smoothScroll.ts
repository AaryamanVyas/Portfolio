"use client";

import Lenis, { type LenisOptions } from "@studio-freight/lenis";
import { useCallback, useEffect, useMemo, useState } from "react";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

type InitResult = {
  lenis: Lenis;
  destroy: () => void;
};

const DEFAULT_LENIS_OPTIONS: Partial<LenisOptions> = {
  duration: 1.1,
  easing: (t: number) => 1 - Math.pow(1 - t, 3),
  smoothWheel: true,
};

export function initSmoothScroll(
  options?: Partial<LenisOptions>,
): InitResult | null {
  if (typeof window === "undefined") return null;
  if (window.__lenis) {
    return {
      lenis: window.__lenis,
      destroy: () => {
        // no-op: caller didn't create it
      },
    };
  }

  const lenis = new Lenis({ ...DEFAULT_LENIS_OPTIONS, ...options });
  window.__lenis = lenis;

  let rafId = 0;
  const raf = (time: number) => {
    lenis.raf(time);
    rafId = window.requestAnimationFrame(raf);
  };
  rafId = window.requestAnimationFrame(raf);

  return {
    lenis,
    destroy: () => {
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
      if (window.__lenis === lenis) delete window.__lenis;
    },
  };
}

export function getLenis(): Lenis | undefined {
  if (typeof window === "undefined") return undefined;
  return window.__lenis;
}

export function useLenisScrollTo() {
  return useCallback((target: string | HTMLElement, options?: unknown) => {
    const lenis = getLenis();
    if (lenis) {
      // Lenis options are not strongly typed across versions
      (lenis as unknown as { scrollTo: (t: unknown, o?: unknown) => void }).scrollTo(
        target,
        options,
      );
      return;
    }
    if (typeof target === "string") {
      const el = document.querySelector(target);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);
}

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  const updateFromNative = useCallback(() => {
    const doc = document.documentElement;
    const max = Math.max(1, doc.scrollHeight - window.innerHeight);
    setProgress(doc.scrollTop / max);
  }, []);

  useEffect(() => {
    const lenis = getLenis();
    if (!lenis) {
      const raf = window.requestAnimationFrame(updateFromNative);
      window.addEventListener("scroll", updateFromNative, { passive: true });
      window.addEventListener("resize", updateFromNative);
      return () => {
        window.cancelAnimationFrame(raf);
        window.removeEventListener("scroll", updateFromNative);
        window.removeEventListener("resize", updateFromNative);
      };
    }

    const handler = (e: unknown) => {
      const data = e as { scroll?: number; limit?: number };
      const limit = Math.max(1, data.limit ?? 1);
      const scroll = Math.max(0, data.scroll ?? 0);
      setProgress(scroll / limit);
    };

    // Initial
    handler({ scroll: (lenis as unknown as { scroll: number }).scroll, limit: 1 });

    (lenis as unknown as { on: (ev: string, cb: (e: unknown) => void) => void }).on(
      "scroll",
      handler,
    );
    window.addEventListener("resize", updateFromNative);

    return () => {
      (
        lenis as unknown as {
          off?: (ev: string, cb: (e: unknown) => void) => void;
        }
      ).off?.("scroll", handler);
      window.removeEventListener("resize", updateFromNative);
    };
  }, [updateFromNative]);

  return useMemo(() => Math.min(1, Math.max(0, progress)), [progress]);
}
