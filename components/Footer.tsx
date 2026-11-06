"use client";

import Link from "next/link";
import dynamic from "next/dynamic";

const QuantumMesh = dynamic(() => import("@/components/ui/quantum-mesh"), {
  ssr: false,
  loading: () => <div style={{ width: 36, height: 36 }} />,
});

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Our Mission", href: "/mission" },
  { label: "INEST News", href: "/news" },
  { label: "Contact Us", href: "/contact" },
];

const SERVICES = [
  "Network Infrastructure",
  "Cloud Architecture",
  "Cybersecurity",
  "IT Strategy",
  "AI & ML Integration",
  "Digital Transformation",
];

export default function Footer() {
  return (
    <footer style={{ background: "#0E0A08", borderTop: "1px solid rgba(255,107,53,0.1)" }}>
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 pt-16 pb-8">

        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 pb-12"
          style={{ borderBottom: "1px solid rgba(242,229,215,0.06)" }}>

          {/* Brand column */}
          <div className="md:col-span-1 flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-3 w-fit">
              <QuantumMesh size={36} />
              <div className="flex flex-col leading-none">
                <span className="text-[18px] font-light tracking-[0.24em] uppercase"
                  style={{ fontFamily: "var(--font-space-grotesk)", color: "#F2E5D7" }}>
                  INEST
                </span>
                <span className="text-[7px] tracking-[0.38em] uppercase mt-[2px]"
                  style={{ fontFamily: "var(--font-syne)", color: "#FF6B35" }}>
                  SYS Consulting
                </span>
              </div>
            </Link>
            <p className="text-[13px] leading-[1.8]" style={{ color: "#6B5D53", fontFamily: "var(--font-manrope)", maxWidth: 240 }}>
              Building the digital infrastructure that carries your business into the next decade.
            </p>
            {/* Social icons row */}
            <div className="flex items-center gap-4 mt-1">
              {[
                { href: "https://linkedin.com", label: "LinkedIn", path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" },
                { href: "https://twitter.com", label: "Twitter / X", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className="w-8 h-8 flex items-center justify-center transition-colors duration-200 rounded-sm"
                  style={{ border: "1px solid rgba(255,107,53,0.18)", color: "#6B5D53" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#FF6B35"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,107,53,0.5)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#6B5D53"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,107,53,0.18)"; }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d={s.path} /></svg>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-4">
            <span className="text-[9px] tracking-[0.35em] uppercase" style={{ color: "#FF6B35", fontFamily: "var(--font-syne)" }}>
              Navigation
            </span>
            <nav className="flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href}
                  className="text-[13px] transition-colors duration-200"
                  style={{ color: "#6B5D53", fontFamily: "var(--font-manrope)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#F2E5D7"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#6B5D53"; }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div className="flex flex-col gap-4">
            <span className="text-[9px] tracking-[0.35em] uppercase" style={{ color: "#FF6B35", fontFamily: "var(--font-syne)" }}>
              Services
            </span>
            <nav className="flex flex-col gap-2.5">
              {SERVICES.map((s) => (
                <span key={s} className="text-[13px]" style={{ color: "#6B5D53", fontFamily: "var(--font-manrope)" }}>
                  {s}
                </span>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <span className="text-[9px] tracking-[0.35em] uppercase" style={{ color: "#FF6B35", fontFamily: "var(--font-syne)" }}>
              Get In Touch
            </span>
            <div className="flex flex-col gap-3">
              {[
                { label: "3055 St. Martin Ouest, Suite T500", sub: "Laval, QC, Canada", href: "https://maps.google.com/?q=3055+St+Martin+Ouest+Laval+QC" },
                { label: "+1 514 900 2112", sub: "Mon – Fri, 9am – 6pm EST", href: "tel:+15149002112" },
                { label: "contact@inetsysconsulting.com", sub: "We reply within 24h", href: "mailto:contact@inetsysconsulting.com" },
              ].map((c) => (
                <a key={c.label} href={c.href}
                  className="flex flex-col gap-0.5 group"
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  <span className="text-[12px] transition-colors duration-200 group-hover:text-[#FF8555]"
                    style={{ color: "#B8A99A", fontFamily: "var(--font-manrope)" }}>
                    {c.label}
                  </span>
                  <span className="text-[10px]" style={{ color: "#4A4040", fontFamily: "var(--font-syne)" }}>{c.sub}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-8">
          <span className="text-[11px]" style={{ color: "#3A2E2A", fontFamily: "var(--font-syne)" }}>
            © {new Date().getFullYear()} inetSYS Consulting Inc. All rights reserved.
          </span>
          <div className="flex items-center gap-1">
            <span className="w-1 h-1 rounded-full" style={{ background: "#FF6B35" }} />
            <span className="text-[10px] tracking-[0.25em] uppercase" style={{ color: "#3A2E2A", fontFamily: "var(--font-syne)" }}>
              Laval, QC — Canada
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
