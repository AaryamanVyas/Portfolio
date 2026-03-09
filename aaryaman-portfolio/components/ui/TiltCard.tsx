"use client";

import { useRef } from "react";

export default function TiltCard({
  children,
  className,
  maxTilt = 10,
}: {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={ref}
      className={className}
      style={{ transformStyle: "preserve-3d" }}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;

        const ry = (px - 0.5) * (maxTilt * 2);
        const rx = -(py - 0.5) * (maxTilt * 2);

        el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
      }}
      onPointerLeave={() => {
        const el = ref.current;
        if (!el) return;
        el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
      }}
    >
      <div style={{ transform: "translateZ(18px)" }}>{children}</div>
    </div>
  );
}

