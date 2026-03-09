"use client";

import { useEffect } from "react";
import { initSmoothScroll } from "../lib/smoothScroll";
import CursorGlow from "./CursorGlow";

export default function Providers({ children }: { children: React.ReactNode }) {
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
    <>
      {children}
      <CursorGlow />
    </>
  );
}

