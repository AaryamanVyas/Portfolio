"use client";

type GsapBundle = {
  gsap: typeof import("gsap").gsap;
  ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger;
};

let gsapPromise: Promise<GsapBundle> | null = null;

async function loadGsap(): Promise<GsapBundle> {
  if (gsapPromise) return gsapPromise;
  gsapPromise = (async () => {
    const gsapMod = await import("gsap");
    const stMod = await import("gsap/ScrollTrigger");
    const gsap = (gsapMod as unknown as { gsap: typeof import("gsap").gsap }).gsap;
    const ScrollTrigger = (
      stMod as unknown as { ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger }
    ).ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);
    return { gsap, ScrollTrigger };
  })();
  return gsapPromise;
}

export async function scrollReveal(
  targets: Element | Element[],
  opts?: {
    y?: number;
    duration?: number;
    start?: string;
    once?: boolean;
    stagger?: number;
  },
) {
  const { gsap } = await loadGsap();
  const els = Array.isArray(targets) ? targets : [targets];
  if (!els.length) return () => {};

  gsap.set(els, {
    opacity: 0,
    y: opts?.y ?? 24,
    filter: "blur(10px)",
  });

  const tween = gsap.to(els, {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    duration: opts?.duration ?? 0.85,
    ease: "power3.out",
    stagger: opts?.stagger ?? 0.08,
    scrollTrigger: {
      trigger: els[0],
      start: opts?.start ?? "top 80%",
      once: opts?.once ?? true,
    },
  });

  return () => {
    tween.scrollTrigger?.kill();
    tween.kill();
  };
}

export async function parallaxY(
  el: Element,
  opts?: {
    start?: string;
    end?: string;
    y?: number;
  },
) {
  const { gsap } = await loadGsap();
  const tween = gsap.to(el, {
    y: opts?.y ?? -60,
    ease: "none",
    scrollTrigger: {
      trigger: el,
      start: opts?.start ?? "top bottom",
      end: opts?.end ?? "bottom top",
      scrub: true,
    },
  });

  return () => {
    tween.scrollTrigger?.kill();
    tween.kill();
  };
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}
