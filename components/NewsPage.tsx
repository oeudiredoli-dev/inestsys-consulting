"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";
import {
  ACTUAL_TECH_NEWS,
  COMPANY_NEWS,
  TECH_CATEGORIES,
  COMPANY_CATEGORIES,
  CATEGORY_COLORS,
  type TechArticle,
  type CompanyArticle,
  type TechCategory,
  type CompanyCategory,
} from "@/lib/news-data";
import SlideInButton from "@/components/ui/slide-in-button";

/* ─── Scroll Reveal Wrapper ─── */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Category Tag ─── */
function CategoryTag({ category }: { category: string }) {
  const color = CATEGORY_COLORS[category] || "#FF6B35";
  return (
    <span
      className="text-[9px] tracking-[0.22em] uppercase font-semibold px-2.5 py-1 rounded-sm inline-flex items-center"
      style={{
        fontFamily: "var(--font-syne)",
        color,
        background: `${color}15`,
        border: `1px solid ${color}35`,
      }}
    >
      {category}
    </span>
  );
}

/* ─── Source Badge for Actual Tech News ─── */
function SourceBadge({ source, color }: { source: string; color: string }) {
  return (
    <span
      className="text-[9px] tracking-[0.2em] uppercase font-bold px-2 py-0.5 rounded-sm inline-flex items-center gap-1.5"
      style={{
        fontFamily: "var(--font-syne)",
        color: "#F2E5D7",
        background: "rgba(26,29,32,0.85)",
        border: `1px solid ${color}55`,
        backdropFilter: "blur(4px)",
      }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
      {source}
    </span>
  );
}

/* ─── Tech News Featured Card ─── */
function TechFeaturedCard({ article }: { article: TechArticle }) {
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    window.open(article.link, "_blank", "noopener,noreferrer");
  };

  return (
    <Reveal className="w-full">
      <div
        className="relative w-full overflow-hidden cursor-pointer group transition-all duration-300"
        style={{
          border: "1px solid rgba(26,19,15,0.12)",
          boxShadow: hovered
            ? "0 12px 40px rgba(26,19,15,0.14)"
            : "0 4px 32px rgba(26,19,15,0.08)",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={handleClick}
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Thumbnail */}
          <div className="relative overflow-hidden min-h-[300px] md:min-h-[380px]" style={{ background: "#1A1D20" }}>
            <img
              src={article.thumbnail}
              alt={article.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute top-6 left-6 flex items-center gap-2">
              <span
                className="text-[9px] tracking-[0.35em] uppercase px-3 py-1.5 font-bold"
                style={{
                  fontFamily: "var(--font-syne)",
                  color: "#FF6B35",
                  border: "1px solid rgba(255,107,53,0.5)",
                  background: "rgba(26,19,15,0.85)",
                }}
              >
                Top Story
              </span>
              <SourceBadge source={article.source} color={article.sourceBadgeColor} />
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-between p-8 md:p-10" style={{ background: "#FDF8F4" }}>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <CategoryTag category={article.category} />
                <span className="text-[11px]" style={{ color: "#9C8B80", fontFamily: "var(--font-syne)" }}>
                  {article.date}
                </span>
                <span className="text-[11px] ml-auto text-orange-600 font-medium flex items-center gap-1">
                  Live External Source ↗
                </span>
              </div>
              <h2
                className="text-[22px] md:text-[28px] font-medium leading-[1.25] tracking-tight group-hover:text-[#FF6B35] transition-colors"
                style={{ fontFamily: "var(--font-space-grotesk)", color: "#1A130F" }}
              >
                {article.title}
              </h2>
              <p className="text-[14px] leading-[1.8]" style={{ color: "#5C4A3D" }}>
                {article.excerpt}
              </p>
            </div>

            <div className="flex items-center justify-between mt-8 pt-6" style={{ borderTop: "1px solid rgba(26,19,15,0.1)" }}>
              <span className="text-[11px]" style={{ color: "#9C8B80", fontFamily: "var(--font-syne)" }}>
                {article.readTime}
              </span>
              <SlideInButton className="!px-5 !py-2 text-[10px]">
                Read on {article.source} ↗
              </SlideInButton>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ─── Tech News Grid Card ─── */
function TechArticleCard({ article, index }: { article: TechArticle; index: number }) {
  const [hovered, setHovered] = useState(false);
  const color = CATEGORY_COLORS[article.category] || "#FF6B35";

  const handleClick = () => {
    window.open(article.link, "_blank", "noopener,noreferrer");
  };

  return (
    <Reveal delay={index * 0.05} className="h-full">
      <motion.div
        className="relative h-full flex flex-col overflow-hidden cursor-pointer group rounded-sm"
        style={{
          background: "#FFFFFF",
          border: hovered ? `1px solid ${color}66` : "1px solid rgba(26,19,15,0.1)",
          boxShadow: hovered ? "0 8px 24px rgba(26,19,15,0.08)" : "0 2px 14px rgba(26,19,15,0.04)",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={handleClick}
        transition={{ duration: 0.2 }}
      >
        {/* Thumbnail */}
        <div className="relative overflow-hidden h-[180px]" style={{ background: "#1A1D20" }}>
          <img
            src={article.thumbnail}
            alt={article.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <SourceBadge source={article.source} color={article.sourceBadgeColor} />
          </div>
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-[10px] bg-[#1A1D20]/90 text-[#FF6B35] px-2 py-0.5 rounded font-mono">
              Open ↗
            </span>
          </div>
        </div>

        {/* Card Content */}
        <div className="flex flex-col flex-1 p-5 gap-3">
          <div className="flex items-center justify-between">
            <CategoryTag category={article.category} />
            <span className="text-[10px]" style={{ color: "#9C8B80", fontFamily: "var(--font-syne)" }}>
              {article.date}
            </span>
          </div>

          <h3
            className="text-[16px] font-medium leading-snug tracking-tight group-hover:text-[#FF6B35] transition-colors line-clamp-2"
            style={{ fontFamily: "var(--font-space-grotesk)", color: "#1A130F" }}
          >
            {article.title}
          </h3>

          <p className="text-[13px] leading-relaxed flex-1 line-clamp-3" style={{ color: "#5C4A3D" }}>
            {article.excerpt}
          </p>
        </div>

        {/* Card Footer */}
        <div
          className="flex items-center justify-between px-5 pb-4 pt-3 mt-auto"
          style={{ borderTop: "1px solid rgba(26,19,15,0.07)" }}
        >
          <span className="text-[10px]" style={{ color: "#9C8B80", fontFamily: "var(--font-syne)" }}>
            {article.readTime}
          </span>
          <span className="text-[11px] font-medium tracking-wider uppercase text-[#FF6B35] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            Read Story ↗
          </span>
        </div>
      </motion.div>
    </Reveal>
  );
}

/* ─── Company News Featured Card ─── */
function CompanyFeaturedCard({
  article,
  onSelect,
}: {
  article: CompanyArticle;
  onSelect: (a: CompanyArticle) => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Reveal className="w-full">
      <div
        className="relative w-full overflow-hidden cursor-pointer group transition-all duration-300"
        style={{
          border: "1px solid rgba(255,107,53,0.3)",
          boxShadow: hovered
            ? "0 12px 40px rgba(255,107,53,0.12)"
            : "0 4px 32px rgba(26,19,15,0.08)",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => onSelect(article)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Visual Header */}
          <div className="relative overflow-hidden min-h-[320px] md:min-h-[400px]" style={{ background: "#1A1D20" }}>
            <img
              src={article.thumbnail}
              alt={article.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1D20] via-black/40 to-transparent" />
            <div className="absolute top-6 left-6">
              <span
                className="text-[9px] tracking-[0.35em] uppercase px-3 py-1.5 font-bold"
                style={{
                  fontFamily: "var(--font-syne)",
                  color: "#FF6B35",
                  border: "1px solid rgba(255,107,53,0.5)",
                  background: "rgba(26,19,15,0.9)",
                }}
              >
                iNestSys Special Report
              </span>
            </div>

            {/* Stat Callouts at bottom of image on desktop */}
            {article.stats && (
              <div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-2">
                {article.stats.map((s, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-black/70 backdrop-blur-md border border-white/10 rounded-sm"
                  >
                    <div className="text-[16px] font-bold text-[#FF6B35]" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                      {s.value}
                    </div>
                    <div className="text-[9px] tracking-wider uppercase text-neutral-300 font-mono">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex flex-col justify-between p-8 md:p-10" style={{ background: "#FDF8F4" }}>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <CategoryTag category={article.category} />
                <span className="text-[11px]" style={{ color: "#9C8B80", fontFamily: "var(--font-syne)" }}>
                  {article.date}
                </span>
                <span className="text-[11px] font-semibold text-[#FF6B35] ml-auto">
                  Click to Read Full Story
                </span>
              </div>

              <h2
                className="text-[22px] md:text-[28px] font-medium leading-[1.25] tracking-tight group-hover:text-[#FF6B35] transition-colors"
                style={{ fontFamily: "var(--font-space-grotesk)", color: "#1A130F" }}
              >
                {article.title}
              </h2>

              <p className="text-[13px] font-medium text-[#7C6A5D] italic">
                {article.subtitle}
              </p>

              <p className="text-[14px] leading-[1.8]" style={{ color: "#5C4A3D" }}>
                {article.excerpt}
              </p>
            </div>

            <div className="flex items-center justify-between mt-8 pt-6" style={{ borderTop: "1px solid rgba(26,19,15,0.1)" }}>
              <div className="flex flex-col">
                <span className="text-[12px] font-medium" style={{ color: "#1A130F" }}>
                  {article.author}
                </span>
                <span className="text-[10px]" style={{ color: "#9C8B80" }}>
                  {article.authorRole} • {article.readTime}
                </span>
              </div>
              <SlideInButton className="!px-5 !py-2 text-[10px]">
                Read Full Story
              </SlideInButton>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ─── Company News Grid Card ─── */
function CompanyArticleCard({
  article,
  index,
  onSelect,
}: {
  article: CompanyArticle;
  index: number;
  onSelect: (a: CompanyArticle) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const color = CATEGORY_COLORS[article.category] || "#FF6B35";

  return (
    <Reveal delay={index * 0.05} className="h-full">
      <motion.div
        className="relative h-full flex flex-col overflow-hidden cursor-pointer group rounded-sm"
        style={{
          background: "#FFFFFF",
          border: hovered ? `1px solid ${color}` : "1px solid rgba(26,19,15,0.1)",
          boxShadow: hovered ? "0 8px 28px rgba(255,107,53,0.1)" : "0 2px 14px rgba(26,19,15,0.04)",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => onSelect(article)}
        transition={{ duration: 0.2 }}
      >
        {/* Top Accent Line */}
        <div className="h-1.5 w-full" style={{ background: color }} />

        {/* Card Content */}
        <div className="flex flex-col flex-1 p-6 gap-3">
          <div className="flex items-center justify-between">
            <CategoryTag category={article.category} />
            <span className="text-[10px]" style={{ color: "#9C8B80", fontFamily: "var(--font-syne)" }}>
              {article.date}
            </span>
          </div>

          <h3
            className="text-[17px] font-medium leading-snug tracking-tight group-hover:text-[#FF6B35] transition-colors"
            style={{ fontFamily: "var(--font-space-grotesk)", color: "#1A130F" }}
          >
            {article.title}
          </h3>

          <p className="text-[13px] leading-relaxed flex-1 line-clamp-3" style={{ color: "#5C4A3D" }}>
            {article.excerpt}
          </p>

          {/* Quick Metrics (if available) */}
          {article.stats && (
            <div className="grid grid-cols-3 gap-2 pt-2 mt-2 border-t border-neutral-100">
              {article.stats.map((s, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-[13px] font-bold text-[#FF6B35]">{s.value}</span>
                  <span className="text-[9px] uppercase tracking-wider text-neutral-500 line-clamp-1">{s.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Card Footer */}
        <div
          className="flex items-center justify-between px-6 pb-4 pt-3 mt-auto bg-[#FBF7F3]"
          style={{ borderTop: "1px solid rgba(26,19,15,0.06)" }}
        >
          <div className="flex flex-col">
            <span className="text-[11px] font-medium text-neutral-900">{article.author}</span>
            <span className="text-[10px] text-neutral-500">{article.readTime}</span>
          </div>
          <span className="text-[11px] font-semibold text-[#FF6B35] group-hover:translate-x-1 transition-transform flex items-center gap-1">
            Read Details →
          </span>
        </div>
      </motion.div>
    </Reveal>
  );
}

/* ─── Company Article Reader Modal ─── */
function CompanyArticleModal({
  article,
  onClose,
}: {
  article: CompanyArticle;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/75 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#FAF6F0] rounded-sm shadow-2xl p-6 md:p-10 text-[#1A1D20]"
        onClick={(e) => e.stopPropagation()}
        style={{ border: "1px solid rgba(255,107,53,0.3)" }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-neutral-200/70 hover:bg-[#FF6B35] hover:text-white flex items-center justify-center transition-all duration-200 text-lg font-bold"
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <CategoryTag category={article.category} />
          <span className="text-[12px] text-neutral-500 font-mono">{article.date}</span>
          <span className="text-[12px] text-neutral-500 font-mono">• {article.readTime}</span>
        </div>

        <h1
          className="text-[26px] md:text-[38px] font-medium leading-[1.2] tracking-tight mb-3"
          style={{ fontFamily: "var(--font-space-grotesk)", color: "#1A130F" }}
        >
          {article.title}
        </h1>

        <p className="text-[15px] md:text-[17px] text-[#7C6A5D] font-medium italic mb-6">
          {article.subtitle}
        </p>

        {/* Author & Team info */}
        <div className="flex items-center gap-3 py-4 border-y border-neutral-200/80 mb-8">
          <div className="w-10 h-10 rounded-full bg-[#1A1D20] text-[#FF6B35] font-bold flex items-center justify-center text-sm">
            {article.author.split(" ").map((n) => n[0]).join("")}
          </div>
          <div>
            <div className="text-[13px] font-semibold text-neutral-900">{article.author}</div>
            <div className="text-[11px] text-neutral-500">{article.authorRole} — iNestSys Consulting</div>
          </div>
        </div>

        {/* Stats Grid if available */}
        {article.stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {article.stats.map((s, idx) => (
              <div
                key={idx}
                className="p-4 bg-white border border-neutral-200 rounded-sm shadow-sm"
              >
                <div className="text-[24px] font-bold text-[#FF6B35]" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                  {s.value}
                </div>
                <div className="text-[11px] font-semibold tracking-wider uppercase text-neutral-600">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Lead paragraph */}
        <p className="text-[16px] md:text-[18px] leading-relaxed text-[#2C241E] font-medium mb-8">
          {article.content.lead}
        </p>

        {/* Main Article Sections */}
        <div className="space-y-8 text-[14px] md:text-[15px] leading-[1.8] text-[#4A3D34]">
          {article.content.sections.map((sec, idx) => (
            <div key={idx} className="space-y-3">
              <h3
                className="text-[19px] md:text-[22px] font-medium text-neutral-900 tracking-tight"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {sec.heading}
              </h3>
              <p>{sec.body}</p>

              {sec.quote && (
                <blockquote
                  className="my-5 p-4 border-l-4 border-[#FF6B35] bg-[#F3ECE4] italic text-[14px] md:text-[15px] text-[#2C241E]"
                >
                  &ldquo;{sec.quote}&rdquo;
                </blockquote>
              )}
            </div>
          ))}
        </div>

        {/* Key Takeaways */}
        {article.content.takeaways && (
          <div className="my-8 p-6 bg-white border border-neutral-200 rounded-sm">
            <h4
              className="text-[14px] font-bold uppercase tracking-wider text-[#FF6B35] mb-3"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Key Engineering Takeaways
            </h4>
            <ul className="space-y-2">
              {article.content.takeaways.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-[13px] md:text-[14px] text-neutral-700">
                  <span className="text-[#FF6B35] font-bold">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Contact CTA in Modal */}
        <div className="mt-10 p-6 bg-[#1A1D20] text-[#F2E5D7] rounded-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-[17px] font-medium" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Need this architecture in your organization?
            </h4>
            <p className="text-[12px] text-neutral-400">
              Schedule a technical consultation with our principal engineering team.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-6 py-3 text-[11px] font-semibold tracking-wider uppercase bg-[#FF6B35] text-[#1A1D20] hover:bg-[#FF8555] transition-colors whitespace-nowrap rounded-sm"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Contact iNestSys
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Newsletter Strip ─── */
function NewsletterStrip() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <div className="w-full px-8 py-14 md:py-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 max-w-7xl mx-auto">
      <div className="flex flex-col gap-2 max-w-sm">
        <span
          className="text-[10px] tracking-[0.3em] uppercase"
          style={{ color: "#FF6B35", fontFamily: "var(--font-syne)" }}
        >
          Weekly Briefing
        </span>
        <h3
          className="text-[24px] font-medium"
          style={{ fontFamily: "var(--font-space-grotesk)", color: "#F2E5D7" }}
        >
          Stay 10 moves ahead.
        </h3>
        <p className="text-[13px] leading-relaxed" style={{ color: "#B8A99A" }}>
          Curated infrastructure insights, enterprise security signals, and iNestSys announcements delivered weekly.
        </p>
      </div>
      {sent ? (
        <div className="flex items-center gap-3">
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: "#22C55E", boxShadow: "0 0 8px #22C55E" }}
          />
          <span className="text-[13px]" style={{ color: "#B8A99A" }}>
            You&apos;re subscribed. First issue arrives on Monday.
          </span>
        </div>
      ) : (
        <div className="flex gap-0 w-full md:w-auto">
          <input
            type="email"
            placeholder="your.email@enterprise.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 md:w-72 px-4 py-3 bg-transparent text-[13px] outline-none"
            style={{
              border: "1px solid rgba(255,107,53,0.3)",
              borderRight: "none",
              color: "#F2E5D7",
              fontFamily: "var(--font-manrope)",
            }}
          />
          <button
            onClick={() => email && setSent(true)}
            className="px-6 py-3 text-[10px] tracking-[0.18em] uppercase font-semibold shrink-0 transition-all duration-300"
            style={{
              background: "#FF6B35",
              color: "#1A1D20",
              fontFamily: "var(--font-syne)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#FF8555";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#FF6B35";
            }}
          >
            Subscribe
          </button>
        </div>
      )}
    </div>
  );
}

/* ─── Main News Page Component ─── */
export default function NewsPage() {
  // Primary View Mode: "tech" (Actual Tech News) vs "company" (iNestSys Company News)
  const [mainTab, setMainTab] = useState<"tech" | "company">("tech");

  // Category filters for each tab
  const [techCategory, setTechCategory] = useState<TechCategory>("All");
  const [companyCategory, setCompanyCategory] = useState<CompanyCategory>("All");

  // Selected company article for reading modal
  const [selectedCompanyArticle, setSelectedCompanyArticle] = useState<CompanyArticle | null>(null);

  // Live tech articles fetched from RSS API
  const [liveTechArticles, setLiveTechArticles] = useState<TechArticle[]>(ACTUAL_TECH_NEWS);

  useEffect(() => {
    async function fetchTechNews() {
      try {
        const res = await fetch("/api/news");
        const data = await res.json();
        if (data.articles?.length > 0) {
          setLiveTechArticles(data.articles);
        }
      } catch (err) {
        console.warn("Using offline curated tech news:", err);
      }
    }
    fetchTechNews();
  }, []);

  // Filtered lists
  const filteredTech = liveTechArticles.filter(
    (a) => techCategory === "All" || a.category === techCategory
  );
  const featuredTech = filteredTech[0] || liveTechArticles[0];
  const gridTech = filteredTech.filter((a) => a.id !== featuredTech.id);

  const filteredCompany = COMPANY_NEWS.filter(
    (a) => companyCategory === "All" || a.category === companyCategory
  );
  const featuredCompany = filteredCompany[0] || COMPANY_NEWS[0];
  const gridCompany = filteredCompany.filter((a) => a.id !== featuredCompany.id);

  return (
    <>
      {/* ── Main News Section ── */}
      <section className="relative z-10" style={{ background: "#F5F0EA" }}>
        <div className="pt-10 pb-16 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">

          {/* ── Dual View Switcher (Actual Tech News vs Company News) ── */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-neutral-300">
            <div className="flex bg-[#EAE3D9] p-1.5 rounded-sm gap-1 self-start">
              <button
                onClick={() => setMainTab("tech")}
                className="px-5 py-2.5 text-[11px] tracking-[0.16em] uppercase font-bold rounded-sm transition-all duration-200 flex items-center gap-2"
                style={{
                  fontFamily: "var(--font-syne)",
                  background: mainTab === "tech" ? "#1A1D20" : "transparent",
                  color: mainTab === "tech" ? "#FF6B35" : "#6E5E52",
                  boxShadow: mainTab === "tech" ? "0 2px 8px rgba(0,0,0,0.15)" : "none",
                }}
              >
                <span>🌐 Actual Tech News</span>
                <span className="text-[9px] px-1.5 py-0.2 bg-[#FF6B35]/20 text-[#FF6B35] rounded">
                  Live Sources
                </span>
              </button>

              <button
                onClick={() => setMainTab("company")}
                className="px-5 py-2.5 text-[11px] tracking-[0.16em] uppercase font-bold rounded-sm transition-all duration-200 flex items-center gap-2"
                style={{
                  fontFamily: "var(--font-syne)",
                  background: mainTab === "company" ? "#1A1D20" : "transparent",
                  color: mainTab === "company" ? "#FF6B35" : "#6E5E52",
                  boxShadow: mainTab === "company" ? "0 2px 8px rgba(0,0,0,0.15)" : "none",
                }}
              >
                <span>🏢 Company News</span>
                <span className="text-[9px] px-1.5 py-0.2 bg-[#FF6B35]/20 text-[#FF6B35] rounded">
                  iNestSys
                </span>
              </button>
            </div>

            <div className="text-[12px] text-neutral-600 font-mono self-end sm:self-center">
              {mainTab === "tech" ? (
                <span>Clicking any tech news opens the verified source ↗</span>
              ) : (
                <span>Click any company story to open the full reader modal</span>
              )}
            </div>
          </div>

          {/* ── Sub-Category Filters ── */}
          <div className="flex flex-wrap gap-2 mb-10">
            {mainTab === "tech" ? (
              TECH_CATEGORIES.map((cat) => {
                const active = cat === techCategory;
                const color = cat === "All" ? "#FF6B35" : CATEGORY_COLORS[cat] || "#FF6B35";
                return (
                  <button
                    key={cat}
                    onClick={() => setTechCategory(cat)}
                    className="px-4 py-1.5 text-[10px] tracking-[0.2em] uppercase transition-all duration-200 font-semibold rounded-sm"
                    style={{
                      fontFamily: "var(--font-syne)",
                      color: active ? "#FFFFFF" : color,
                      background: active ? color : "transparent",
                      border: `1px solid ${color}55`,
                    }}
                  >
                    {cat}
                  </button>
                );
              })
            ) : (
              COMPANY_CATEGORIES.map((cat) => {
                const active = cat === companyCategory;
                const color = cat === "All" ? "#FF6B35" : CATEGORY_COLORS[cat] || "#FF6B35";
                return (
                  <button
                    key={cat}
                    onClick={() => setCompanyCategory(cat)}
                    className="px-4 py-1.5 text-[10px] tracking-[0.2em] uppercase transition-all duration-200 font-semibold rounded-sm"
                    style={{
                      fontFamily: "var(--font-syne)",
                      color: active ? "#FFFFFF" : color,
                      background: active ? color : "transparent",
                      border: `1px solid ${color}55`,
                    }}
                  >
                    {cat}
                  </button>
                );
              })
            )}
          </div>

          {/* ── CONTENT FOR TECH NEWS TAB ── */}
          {mainTab === "tech" && (
            <div>
              {/* Featured Tech News Card */}
              {featuredTech && (
                <div className="mb-10">
                  <TechFeaturedCard article={featuredTech} />
                </div>
              )}

              {/* Tech News Cards Grid */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={techCategory}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {gridTech.map((article, i) => (
                    <TechArticleCard key={article.id} article={article} index={i} />
                  ))}
                  {gridTech.length === 0 && !featuredTech && (
                    <div className="col-span-3 py-16 text-center">
                      <p style={{ color: "#9C8B80", fontFamily: "var(--font-syne)" }}>
                        No articles found in this category.
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          )}

          {/* ── CONTENT FOR COMPANY NEWS TAB ── */}
          {mainTab === "company" && (
            <div>
              {/* Featured Company Story Card */}
              {featuredCompany && (
                <div className="mb-10">
                  <CompanyFeaturedCard
                    article={featuredCompany}
                    onSelect={(a) => setSelectedCompanyArticle(a)}
                  />
                </div>
              )}

              {/* Company News Cards Grid */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={companyCategory}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {gridCompany.map((article, i) => (
                    <CompanyArticleCard
                      key={article.id}
                      article={article}
                      index={i}
                      onSelect={(a) => setSelectedCompanyArticle(a)}
                    />
                  ))}
                  {gridCompany.length === 0 && !featuredCompany && (
                    <div className="col-span-3 py-16 text-center">
                      <p style={{ color: "#9C8B80", fontFamily: "var(--font-syne)" }}>
                        No company news in this category yet.
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          )}

        </div>
      </section>

      {/* ── Interactive Modal for Company Articles ── */}
      <AnimatePresence>
        {selectedCompanyArticle && (
          <CompanyArticleModal
            article={selectedCompanyArticle}
            onClose={() => setSelectedCompanyArticle(null)}
          />
        )}
      </AnimatePresence>

      {/* ── Dark Newsletter Strip ── */}
      <section style={{ background: "#1A130F", borderTop: "1px solid rgba(255,107,53,0.12)" }}>
        <NewsletterStrip />
      </section>
    </>
  );
}
