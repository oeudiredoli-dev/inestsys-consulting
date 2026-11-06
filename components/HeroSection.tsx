"use client";

import { motion } from "framer-motion";
import ShineText from "@/components/ui/shine-text";
import CounterStat from "@/components/ui/counter-stat";
import SlideInButton from "@/components/ui/slide-in-button";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] } },
};

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.15, delayChildren: 0.4 } },
};

export default function HeroSection() {
  return (
    <section className="relative z-10 min-h-screen flex items-center px-6 md:px-16 pt-24 pb-16 overflow-hidden">
      
      {/* ── MASSIVE CINEMATIC LIGHTING ── */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20"
           style={{ background: "radial-gradient(circle, #FF6B35 0%, transparent 60%)", filter: "blur(120px)" }} />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-10"
           style={{ background: "radial-gradient(circle, #F2E5D7 0%, transparent 70%)", filter: "blur(100px)" }} />

      <motion.div
        className="relative z-10 w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        {/* ── Left Content (Headline & CTA) ── */}
        <div className="lg:col-span-8 flex flex-col items-start text-left gap-10">
          
          <motion.div variants={fadeUp}>
            <span
              className="inline-flex items-center gap-3 px-0 py-2 text-[10px] sm:text-[11px] tracking-[0.3em] uppercase"
              style={{
                fontFamily: "var(--font-syne)",
                color: "#FF8555",
              }}
            >
              <span
                className="w-1 h-4 rounded-sm"
                style={{ background: "#FF6B35", boxShadow: "0 0 10px rgba(255,107,53,0.5)" }}
              />
              Digital Systems &amp; Network Experts
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-[44px] sm:text-[60px] md:text-[76px] lg:text-[84px] leading-[1.05] tracking-tighter font-medium"
            style={{ fontFamily: "var(--font-space-grotesk)", color: "#F8F9FA" }}
          >
            <ShineText variant="cream" duration={4.5}>
              The tech industry
            </ShineText>
            <br />
            <span style={{ color: "rgba(248, 249, 250, 0.4)" }}>
              keeps evolving.
            </span>
            <br />
            <ShineText variant="cream" duration={5}>
              Don&apos;t hop in last.
            </ShineText>
          </motion.h1>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-4">
            <Link href="/contact"><SlideInButton>Let&apos;s Work Together</SlideInButton></Link>
            <Link
              href="/mission"
              className="flex items-center gap-3 text-[12px] tracking-[0.2em] uppercase transition-all duration-300 group"
              style={{ fontFamily: "var(--font-syne)", color: "#B8A99A" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#FF8555")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#B8A99A")}
            >
              <span className="relative overflow-hidden">
                <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">Our Mission</span>
                <span className="absolute top-0 left-0 inline-block transition-transform duration-300 translate-y-full group-hover:translate-y-0 text-[#FF8555]">Our Mission</span>
              </span>
              <span className="transition-transform duration-300 group-hover:translate-x-2" style={{ color: "#FF6B35" }}>→</span>
            </Link>
          </motion.div>
        </div>

        {/* ── Right Content (Stats & Subtext) ── */}
        <div className="lg:col-span-4 flex flex-col items-start lg:items-end text-left lg:text-right gap-10 mb-4">
          
          <motion.p
            variants={fadeUp}
            className="max-w-xs text-[15px] leading-[1.8] font-light"
            style={{ color: "#B8A99A", fontFamily: "var(--font-manrope)" }}
          >
            Building and optimizing secure, scalable digital infrastructure for
            your business. <span className="text-[#F8F9FA]">We turn network complexity into simple solutions.</span>
          </motion.p>

          {/* ── Nmore-style Floating Glass Card ── */}
          <motion.div variants={fadeUp} className="w-full max-w-[340px] flex flex-col items-start p-8 rounded-3xl relative overflow-hidden"
            style={{ 
              background: "linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 100%)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
              backdropFilter: "blur(20px)"
            }}>
            
            {/* Subtle inner light */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#FF6B35] rounded-full opacity-20 blur-3xl pointer-events-none" />

            <span
              className="text-[10px] tracking-[0.4em] uppercase opacity-70 mb-4"
              style={{ color: "#F8F9FA", fontFamily: "var(--font-syne)" }}
            >
              Market Reality
            </span>
            <div className="flex items-baseline gap-1" style={{ color: "#FF6B35" }}>
              <span className="text-[64px] lg:text-[84px] font-medium tracking-tighter drop-shadow-md" style={{ fontFamily: "var(--font-space-grotesk)", lineHeight: 0.9 }}>
                <CounterStat target={42} duration={3.0} suffix="" label="" />
              </span>
              <span className="text-[28px] font-light">%</span>
            </div>
            <p className="text-[13px] leading-relaxed mt-4 opacity-80" style={{ color: "#F8F9FA", fontFamily: "var(--font-manrope)" }}>
              of enterprises fail due to poor strategy and no market need when trying to go it alone.
            </p>
          </motion.div>

        </div>
      </motion.div>

      {/* ── Modern Scroll indicator ── */}
      <motion.div
        className="absolute bottom-0 left-6 md:left-16 flex items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 1 }}
      >
        <span
          className="text-[9px] tracking-[0.3em] uppercase rotate-[-90deg] origin-left"
          style={{ color: "#B8A99A", fontFamily: "var(--font-syne)", transform: "rotate(-90deg) translateY(50%)" }}
        >
          Scroll
        </span>
        <motion.div
          className="w-px h-16 opacity-30"
          style={{ background: "linear-gradient(to bottom, #F8F9FA, transparent)" }}
          animate={{ scaleY: [0, 1, 0], originY: "top" }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
