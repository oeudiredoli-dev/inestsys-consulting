"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CounterStatProps {
  target: number;
  prefix?: string;
  suffix?: string;
  label?: string;
  duration?: number;
}

export default function CounterStat({
  target,
  prefix = "",
  suffix = "",
  label = "",
  duration = 2.8,
}: CounterStatProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!isInView) return;
    let rafId: number;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(eased * target));
      if (progress < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, target, duration]);

  /* Number-only mode: no label, no layout wrapper */
  if (!label) {
    return (
      <span ref={ref} className="tabular-nums" style={{ fontFamily: "inherit", color: "inherit" }}>
        {prefix}{count}{suffix}
      </span>
    );
  }

  /* Full stat card mode */
  return (
    <div ref={ref} className="flex items-start gap-6 md:gap-8">
      <div className="shrink-0 flex items-start leading-none">
        {prefix && (
          <span className="text-lg md:text-2xl mt-2 md:mt-4 mr-1" style={{ fontFamily: "var(--font-syne)", color: "#FF8555", opacity: 0.75 }}>
            {prefix}
          </span>
        )}
        <span className="text-[72px] md:text-[108px] font-bold tabular-nums leading-none" style={{ fontFamily: "var(--font-syne)", color: "#FF6B35" }}>
          {count}
        </span>
        {suffix && (
          <span className="text-[32px] md:text-[48px] font-semibold mt-2 md:mt-4 ml-0.5" style={{ fontFamily: "var(--font-syne)", color: "#FF6B35" }}>
            {suffix}
          </span>
        )}
      </div>
      <div className="pt-3 md:pt-5 max-w-xs border-l pl-6 md:pl-8" style={{ borderColor: "rgba(255,107,53,0.25)" }}>
        <p className="text-sm md:text-base leading-relaxed" style={{ color: "#B8A99A" }}>{label}</p>
      </div>
    </div>
  );
}
