"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import NavHeader from "@/components/ui/nav-header";
import SlideInButton from "@/components/ui/slide-in-button";

const QuantumMesh = dynamic(() => import("@/components/ui/quantum-mesh"), {
  ssr: false,
  loading: () => <div style={{ width: 46, height: 46 }} />,
});

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(18,20,22,0.80)" : "rgba(18,20,22,0.15)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: scrolled
            ? "1px solid rgba(255,107,53,0.18)"
            : "1px solid rgba(255,107,53,0.06)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="h-[72px] flex items-center justify-between gap-6">

            {/* ── Logo (one instance: sphere + wordmark) ── */}
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "radial-gradient(circle, rgba(255,107,53,0.16) 0%, transparent 70%)",
                    filter: "blur(8px)",
                    transform: "scale(1.4)",
                  }}
                />
                <QuantumMesh size={46} />
              </div>
              <div className="flex flex-col leading-none select-none">
                <span
                  className="text-[21px] font-light tracking-[0.24em] uppercase"
                  style={{ fontFamily: "var(--font-space-grotesk)", color: "#F2E5D7", fontWeight: 300 }}
                >
                  INEST
                </span>
                <span
                  className="text-[7.5px] tracking-[0.38em] uppercase mt-[3px]"
                  style={{ fontFamily: "var(--font-syne)", color: "#FF6B35" }}
                >
                  SYS Consulting
                </span>
              </div>
            </Link>

            {/* ── NavHeader pill ── */}
            <div className="hidden md:block">
              <NavHeader />
            </div>

            {/* ── CTA ── */}
            <div className="hidden md:block shrink-0">
              <Link href="/contact"><SlideInButton>Let's work together</SlideInButton></Link>
            </div>

            {/* ── Mobile hamburger ── */}
            <button
              className="md:hidden flex flex-col gap-[5px] p-2"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <span className={`block w-6 h-[1.5px] transition-all duration-300 origin-center ${mobileOpen ? "rotate-45 translate-y-[6.5px]" : ""}`} style={{ background: "#F2E5D7" }} />
              <span className={`block w-6 h-[1.5px] transition-all duration-300 ${mobileOpen ? "opacity-0 scale-x-0" : ""}`} style={{ background: "#FF6B35" }} />
              <span className={`block w-6 h-[1.5px] transition-all duration-300 origin-center ${mobileOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`} style={{ background: "#F2E5D7" }} />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile drawer ── */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 backdrop-blur-2xl"
          style={{ background: "rgba(14,10,8,0.95)" }}
          onClick={() => setMobileOpen(false)}
        />
        <div className="absolute top-[72px] left-0 right-0 px-6 py-8 flex flex-col gap-0">
          {[
            { label: "Home", href: "/" },
            { label: "Our Mission", href: "/mission" },
            { label: "INEST News", href: "/news" },
            { label: "Contact Us", href: "/contact" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="py-5 group"
              style={{ borderBottom: "1px solid rgba(242,229,215,0.06)" }}
            >
              <span
                className="text-sm tracking-[0.2em] uppercase transition-colors duration-200"
                style={{ fontFamily: "var(--font-syne)", color: "#B8A99A" }}
              >
                {link.label}
              </span>
            </Link>
          ))}
          <div className="mt-8">
            <Link href="/contact" onClick={() => setMobileOpen(false)}><SlideInButton>Let's work together</SlideInButton></Link>
          </div>
        </div>
      </div>
    </>
  );
}
