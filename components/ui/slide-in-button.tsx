"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface SlideInButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function SlideInButton({
  children = "Let's work together",
  onClick,
  className = "",
}: SlideInButtonProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative overflow-hidden px-7 py-3 ${className}`}
      style={{
        border: "1px solid rgba(255,107,53,0.55)",
        minWidth: 200,
      }}
    >
      {/* Ember fill slides in */}
      <motion.span
        className="absolute inset-0"
        style={{ background: "#FF6B35" }}
        initial={{ x: "-100%" }}
        animate={{ x: hovered ? "0%" : "-100%" }}
        transition={{ duration: 0.38, ease: [0.32, 0, 0.08, 1] as [number,number,number,number] }}
        aria-hidden
      />

      <span
        className="relative z-10 flex items-center justify-center gap-2.5"
        style={{ fontFamily: "var(--font-syne)" }}
      >
        <motion.span
          className="text-[11px] tracking-[0.18em] uppercase font-semibold"
          animate={{ color: hovered ? "#1A1D20" : "#F2E5D7" }}
          transition={{ duration: 0.18, delay: hovered ? 0.12 : 0 }}
        >
          {children}
        </motion.span>
        <motion.span
          className="text-sm"
          animate={{ color: hovered ? "#1A1D20" : "#FF6B35", x: hovered ? 3 : 0 }}
          transition={{ duration: 0.18, delay: hovered ? 0.12 : 0 }}
        >
          →
        </motion.span>
      </span>
    </button>
  );
}
