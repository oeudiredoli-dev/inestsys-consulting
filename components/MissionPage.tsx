"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import ShineText from "@/components/ui/shine-text";
import SlideInButton from "@/components/ui/slide-in-button";
import Link from "next/link";

/* ─── animation presets ─── */
const fadeUp = { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] } } };
const fadeIn  = { hidden: { opacity: 0 },        show: { opacity: 1,        transition: { duration: 0.9, ease: "easeOut" } } };

function Reveal({ children, className = "", delay = 0, style }: { children: React.ReactNode; className?: string; delay?: number; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/* ─── pillar data ─── */
const PILLARS = [
  {
    number: "01",
    title: "Strategic Architecture",
    body: "We don't just build infrastructure. We design the systems that power your competitive advantage — before your competitors see the move coming.",
  },
  {
    number: "02",
    title: "Network Mastery",
    body: "From complex enterprise networks to cloud-native ecosystems, we simplify what others overcomplicate. Clarity is the most underrated advantage.",
  },
  {
    number: "03",
    title: "Future-Ready Systems",
    body: "Technology evolves faster than most organizations can adapt. We make sure you're not reacting — you're already positioned 10 moves ahead.",
  },
];

export default function MissionPage() {
  const videoRef   = useRef<HTMLDivElement>(null);
  const { scrollYProgress: videoScroll } = useScroll({ target: videoRef, offset: ["start start", "end start"] });
  const videoY = useTransform(videoScroll, [0, 1], ["0%", "20%"]);

  return (
    <>
      {/* ══════════════════════════════════════════
          1 — CINEMATIC VIDEO HERO
          Cropped via object-position to show only
          the piece-placement moment
      ══════════════════════════════════════════ */}
      <section ref={videoRef} className="relative w-full overflow-hidden" style={{ height: "100svh" }}>

        {/* Parallax video wrapper */}
        <motion.div className="absolute inset-0 w-full h-[120%] -top-[10%]" style={{ y: videoY }}>
          <video
            src="/chess-move.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full"
            style={{
              objectFit: "cover",
              /* Crop: zoom to the hand + piece placement in the centre-right */
              objectPosition: "55% 40%",
              transform: "scale(1.18)",
              transformOrigin: "55% 40%",
              filter: "brightness(0.42) saturate(0.7)",
            }}
          />
        </motion.div>

        {/* Dark gradient overlays */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(26,29,32,0.55) 0%, rgba(26,29,32,0.15) 40%, rgba(26,29,32,0.75) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(255,107,53,0.06) 0%, transparent 65%)" }} />

        {/* Overlay content */}
        <div className="absolute inset-0 flex flex-col items-start justify-end pb-16 md:pb-24 px-8 md:px-16 lg:px-24 max-w-7xl mx-auto left-0 right-0 z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
            className="flex flex-col gap-5 max-w-2xl"
          >
            {/* Label */}
            <span
              className="text-[10px] tracking-[0.35em] uppercase"
              style={{ color: "#FF6B35", fontFamily: "var(--font-syne)" }}
            >
              Our Mission
            </span>

            {/* Headline */}
            <h1
              className="text-[44px] sm:text-[58px] md:text-[72px] leading-[1.05] font-light"
              style={{ fontFamily: "var(--font-space-grotesk)", color: "#F2E5D7" }}
            >
              <ShineText variant="cream" duration={5}>
                Every network decision
              </ShineText>
              <br />
              <span style={{ color: "rgba(242,229,215,0.70)" }}>is a move.</span>
              <br />
              <span
                className="italic"
                style={{ color: "#FF8555" }}
              >
                We think 10 ahead.
              </span>
            </h1>
          </motion.div>
        </div>

        {/* Bottom scroll cue */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          <motion.div
            className="w-px h-12"
            style={{ background: "linear-gradient(to bottom, #FF6B35, transparent)" }}
            animate={{ scaleY: [0, 1, 0], originY: "top" }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </section>


      {/* ══════════════════════════════════════════
          2 — MANIFESTO STATEMENT
      ══════════════════════════════════════════ */}
      <section className="relative z-10 py-24 md:py-36 px-8 md:px-16 lg:px-24" style={{ background: "#F5F0EA" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2px_1fr] gap-10 md:gap-0 items-start">

            {/* Left: label block */}
            <Reveal className="flex flex-col gap-4 md:pr-16">
              <span
                className="text-[10px] tracking-[0.35em] uppercase"
                style={{ color: "#FF6B35", fontFamily: "var(--font-syne)" }}
              >
                Who We Are
              </span>
              <h2
                className="text-[36px] md:text-[48px] font-light leading-[1.1]"
                style={{ fontFamily: "var(--font-space-grotesk)", color: "#1A1D20" }}
              >
                The architects of your digital future
              </h2>
            </Reveal>

            {/* Vertical divider */}
            <div className="hidden md:block w-px self-stretch mx-12" style={{ background: "linear-gradient(to bottom, transparent, rgba(255,107,53,0.3), transparent)" }} />

            {/* Right: body */}
            <Reveal delay={0.15} className="md:pl-16 flex flex-col gap-6">
              <p className="text-[15px] md:text-[16px] leading-[1.85]" style={{ color: "#4A4D50" }}>
                inetSYS Consulting was built on a single conviction: most organizations
                fail not from lack of talent, but from a lack of strategic clarity in their
                technology decisions.
              </p>
              <p className="text-[15px] md:text-[16px] leading-[1.85]" style={{ color: "#4A4D50" }}>
                We partner with enterprises and growth-stage companies to build the digital
                infrastructure that doesn&apos;t just support their business today — it&apos;s
                engineered to carry them into the next decade.
              </p>
              <p className="text-[15px] md:text-[16px] leading-[1.85]" style={{ color: "#4A4D50" }}>
                Like a grandmaster who sees the board in its entirety, we map every
                dependency, every bottleneck, every opportunity — before a single line of
                configuration is written.
              </p>
            </Reveal>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          3 — THREE PILLARS
      ══════════════════════════════════════════ */}
      <section className="relative z-10 py-20 md:py-28 px-8 md:px-16 lg:px-24" style={{ background: "#1A1D20", borderTop: "1px solid rgba(242,229,215,0.06)" }}>
        <div className="max-w-7xl mx-auto">

          <Reveal className="mb-16">
            <span
              className="text-[10px] tracking-[0.35em] uppercase"
              style={{ color: "#FF6B35", fontFamily: "var(--font-syne)" }}
            >
              How We Work
            </span>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:divide-x" style={{ borderColor: "rgba(242,229,215,0.07)" }}>
            {PILLARS.map((p, i) => (
              <Reveal key={p.number} delay={i * 0.12} className="flex flex-col gap-6 px-0 md:px-10 first:pl-0 last:pr-0 py-10 md:py-0">
                {/* Number */}
                <span
                  className="text-[11px] tracking-[0.3em]"
                  style={{ color: "#6B5D53", fontFamily: "var(--font-syne)" }}
                >
                  {p.number}
                </span>

                {/* Ember line */}
                <div className="w-10 h-px" style={{ background: "#FF6B35" }} />

                {/* Title */}
                <h3
                  className="text-[24px] md:text-[28px] font-light leading-snug"
                  style={{ fontFamily: "var(--font-space-grotesk)", color: "#F2E5D7" }}
                >
                  {p.title}
                </h3>

                {/* Body */}
                <p className="text-[14px] leading-[1.8]" style={{ color: "#B8A99A" }}>
                  {p.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          4 — CHESS STILL IMAGE + QUOTE
      ══════════════════════════════════════════ */}
      <section
        className="relative z-10 py-20 md:py-28 px-8 md:px-16 lg:px-0 overflow-hidden"
        style={{ borderTop: "1px solid rgba(242,229,215,0.06)" }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-0 items-center">

          {/* Image */}
          <Reveal className="relative overflow-hidden" style={{ height: 480 }}>
            <Image
              src="/chess.png"
              alt="Strategic move — inetSYS Consulting"
              fill
              className="object-cover"
              style={{
                objectPosition: "60% 35%",
                filter: "brightness(0.72) saturate(0.65)",
              }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Ember overlay gradient */}
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to right, rgba(26,29,32,0) 50%, rgba(26,29,32,0.9) 100%)" }}
            />
            {/* INEST watermark on image */}
            <div className="absolute bottom-6 left-6">
              <span
                className="text-[9px] tracking-[0.4em] uppercase opacity-50"
                style={{ color: "#FF6B35", fontFamily: "var(--font-syne)" }}
              >
                inetSYS Consulting
              </span>
            </div>
          </Reveal>

          {/* Quote + CTA */}
          <Reveal
            delay={0.2}
            className="flex flex-col gap-8 px-8 md:px-14 lg:px-16 py-10 md:py-0"
            style={{
              background: "rgba(26,19,15,0.6)",
              backdropFilter: "blur(8px)",
            }}
          >
            {/* Large quote mark */}
            <span
              className="text-[80px] leading-none select-none -mb-4"
              style={{ color: "rgba(255,107,53,0.18)", fontFamily: "var(--font-space-grotesk)" }}
            >
              &ldquo;
            </span>

            <blockquote
              className="text-[22px] md:text-[28px] font-light leading-[1.45] italic"
              style={{ fontFamily: "var(--font-space-grotesk)", color: "#F2E5D7" }}
            >
              The tech industry keeps evolving — don&apos;t be the last one to
              hop in the boat. Let us show you the way.
            </blockquote>

            <div className="flex flex-col gap-1">
              <span
                className="text-[11px] tracking-[0.2em] uppercase"
                style={{ color: "#FF6B35", fontFamily: "var(--font-syne)" }}
              >
                inetSYS Consulting
              </span>
              <span className="text-[12px]" style={{ color: "#6B5D53" }}>
                Digital Systems &amp; Network Experts
              </span>
            </div>

            <div className="w-12 h-px" style={{ background: "linear-gradient(to right, #FF6B35, transparent)" }} />

            <div className="flex items-center gap-4">
              <Link href="/contact">
                <SlideInButton>Work With Us</SlideInButton>
              </Link>
            </div>
          </Reveal>

        </div>
      </section>


      {/* ══════════════════════════════════════════
          5 — BOTTOM CTA STRIP
      ══════════════════════════════════════════ */}
      <section className="relative z-10 py-20 md:py-28 px-8 md:px-16 lg:px-24 flex flex-col items-center text-center gap-6" 
        style={{ background: "#F5F0EA", borderTop: "1px solid rgba(26,29,32,0.06)" }}
      >
        <Reveal>
          <h2
            className="text-[36px] md:text-[54px] font-light leading-[1.1] max-w-2xl"
            style={{ fontFamily: "var(--font-space-grotesk)", color: "#1A1D20" }}
          >
            Ready to make your{" "}
            <ShineText variant="ember" duration={3.5}>
              next move?
            </ShineText>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-md text-[14px] leading-relaxed" style={{ color: "#4A4D50" }}>
            Let&apos;s map your infrastructure, identify your blind spots, and build a roadmap that puts you ahead.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <Link href="/contact">
            <SlideInButton>Let&apos;s work together</SlideInButton>
          </Link>
        </Reveal>
      </section>
    </>
  );
}



