"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ─── Reveal wrapper ─── */
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
    >{children}</motion.div>
  );
}

/* ─── Info card ─── */
function InfoCard({ icon, label, value, href }: { icon: "email" | "phone" | "address"; label: string; value: string; href: string }) {
  const isWeb = href.startsWith("http");
  const handleClick = (e: React.MouseEvent) => {
    if (icon === "email") {
      navigator.clipboard.writeText("contact@inetsysconsulting.com");
    }
  };

  return (
    <Reveal className="flex-1">
      <a href={href} target={isWeb ? "_blank" : undefined} rel={isWeb ? "noopener noreferrer" : undefined}
        onClick={handleClick}
        className="group flex items-center gap-5 p-6 transition-all duration-300 cursor-pointer"
        style={{ background: "rgba(42,31,26,0.5)", border: "1px solid rgba(255,107,53,0.12)", backdropFilter: "blur(8px)" }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,107,53,0.35)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,107,53,0.12)"; }}
      >
        {/* Icon */}
        <div className="w-10 h-10 flex items-center justify-center shrink-0 transition-colors duration-300"
          style={{ border: "1px solid rgba(255,107,53,0.25)", background: "rgba(255,107,53,0.08)" }}>
          {icon === "email" ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          ) : icon === "phone" ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.32 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          )}
        </div>
        {/* Text */}
        <div className="flex flex-col gap-0.5">
          <span className="text-[9px] tracking-[0.3em] uppercase" style={{ color: "#6B5D53", fontFamily: "var(--font-syne)" }}>
            {label}
          </span>
          <span className="text-[15px] font-medium transition-colors duration-300 group-hover:text-[#FF8555]"
            style={{ color: "#F2E5D7", fontFamily: "var(--font-space-grotesk)" }}>
            {value}
          </span>
        </div>
      </a>
    </Reveal>
  );
}

/* ─── Form field ─── */
function Field({
  label, type = "text", name, value, onChange, placeholder, required = true, rows
}: {
  label: string; type?: string; name: string; value: string;
  onChange: (v: string) => void; placeholder?: string; required?: boolean; rows?: number;
}) {
  const [focused, setFocused] = useState(false);
  const sharedStyle: React.CSSProperties = {
    borderColor: focused ? "#FF6B35" : "rgba(242,229,215,0.12)",
    color: "#F2E5D7",
    fontFamily: "var(--font-manrope)",
    background: "rgba(26,19,15,0.35)",
    transition: "border-color 0.2s ease",
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-[9px] tracking-[0.28em] uppercase"
        style={{ color: focused ? "#FF6B35" : "#6B5D53", fontFamily: "var(--font-syne)", transition: "color 0.2s ease" }}>
        {label}
      </label>
      {rows ? (
        <textarea
          name={name}
          rows={rows}
          value={value}
          required={required}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full px-4 py-3 text-[14px] outline-none resize-none border"
          style={sharedStyle}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          required={required}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full px-4 py-3 text-[14px] outline-none border"
          style={sharedStyle}
        />
      )}
    </div>
  );
}

/* ─── Main ─── */
export default function ContactPage() {
  const [fields, setFields] = useState({ firstName: "", lastName: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const set = (k: keyof typeof fields) => (v: string) => setFields((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setSent(true); }, 1600);
  };

  return (
    <>
      {/* ══ LIGHT EDITORIAL SECTION ══ */}
      <section className="relative z-10" style={{ background: "#F5F0EA" }}>
        <div className="px-8 md:px-16 lg:px-24 pt-20 pb-20 max-w-7xl mx-auto">

          {/* Oversized editorial heading */}
          <div className="overflow-hidden mb-14">
            <Reveal>
              <h2
                className="font-medium leading-[0.92] tracking-tighter"
                style={{
                  fontFamily: "var(--font-space-grotesk)",
                  color: "#1A130F",
                  fontSize: "clamp(48px, 7.5vw, 108px)",
                }}
              >
                Let&apos;s work
              </h2>
            </Reveal>
            <Reveal delay={0.07}>
              <h2
                className="font-medium leading-[0.92] tracking-tighter pb-6"
                style={{
                  fontFamily: "var(--font-space-grotesk)",
                  color: "#1A130F",
                  fontSize: "clamp(48px, 7.5vw, 108px)",
                }}
              >
                together<span style={{ color: "#FF6B35" }}>.</span>
              </h2>
            </Reveal>
          </div>

          {/* Divider + subtext grid */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-10"
            style={{ borderTop: "1px solid rgba(26,19,15,0.1)" }}
          >
            <Reveal>
              <p className="text-[15px] leading-[1.85]" style={{ color: "#5C4A3D" }}>
                Ready to transform your enterprise infrastructure? We partner with organizations to engineer digital systems that don&apos;t just work today — they&apos;re built to lead tomorrow.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-[15px] leading-[1.85]" style={{ color: "#5C4A3D" }}>
                Our team of architects responds within 24 hours. For urgent network incidents, include <span style={{ color: "#1A130F", fontWeight: 500 }}>"URGENT"</span> in your message and we&apos;ll escalate immediately.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ DARK FORM SECTION ══ */}
      <section
        className="relative z-10"
        style={{ background: "#1A1D20", borderTop: "1px solid rgba(242,229,215,0.06)" }}
      >
        <div className="px-8 md:px-16 lg:px-24 pt-16 pb-24 max-w-7xl mx-auto">

          {/* Info cards */}
          <div className="flex flex-col md:flex-row gap-4 mb-14">
            <InfoCard icon="address" label="Address" value="3055 St. Martin Ouest, Suite T500, Laval, QC" href="https://maps.google.com/?q=3055+St+Martin+Ouest+Laval+QC" />
            <InfoCard icon="phone" label="Telephone" value="+1 514 900 2112" href="tel:+15149002112" />
            <InfoCard icon="email" label="Email | Web" value="contact@inetsysconsulting.com" href="mailto:contact@inetsysconsulting.com" />
          </div>

          {/* Form */}
          <Reveal>
            {sent ? (
              /* Success state */
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
                className="flex flex-col items-center justify-center text-center py-24 gap-6"
                style={{ border: "1px solid rgba(255,107,53,0.15)", background: "rgba(42,31,26,0.35)" }}
              >
                {/* Pulse ring */}
                <div className="relative w-16 h-16 flex items-center justify-center mb-2">
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ border: "1px solid rgba(255,107,53,0.4)" }}
                    animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                  />
                  <div className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(255,107,53,0.1)", border: "1px solid rgba(255,107,53,0.3)" }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                </div>
                <h3
                  className="text-[26px] md:text-[32px] font-medium"
                  style={{ fontFamily: "var(--font-space-grotesk)", color: "#F2E5D7" }}
                >
                  Message received.
                </h3>
                <p className="max-w-sm text-[14px] leading-relaxed" style={{ color: "#B8A99A" }}>
                  Let&apos;s build the future together. We will contact you as soon as possible.
                </p>
                <div className="w-16 h-px mt-2" style={{ background: "linear-gradient(to right, transparent, #FF6B35, transparent)" }} />
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div
                  className="p-8 md:p-12"
                  style={{ border: "1px solid rgba(242,229,215,0.07)", background: "rgba(26,19,15,0.35)" }}
                >
                  {/* Row 1: First + Last */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <Field label="First Name" name="firstName" value={fields.firstName} onChange={set("firstName")} placeholder="Jane" />
                    <Field label="Last Name" name="lastName" value={fields.lastName} onChange={set("lastName")} placeholder="Smith" />
                  </div>

                  {/* Row 2: Email + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <Field label="Email" type="email" name="email" value={fields.email} onChange={set("email")} placeholder="jane@company.com" />
                    <Field label="Phone" type="tel" name="phone" value={fields.phone} onChange={set("phone")} placeholder="+1 (555) 000-0000" required={false} />
                  </div>

                  {/* Message */}
                  <div className="mb-10">
                    <Field label="Message" name="message" value={fields.message} onChange={set("message")} placeholder="Hi, I want help with..." rows={5} />
                  </div>

                  {/* Submit */}
                  <div className="flex justify-end">
                    <motion.button
                      type="submit"
                      disabled={submitting}
                      className="relative overflow-hidden px-10 py-4 text-[10px] tracking-[0.22em] uppercase font-semibold flex items-center gap-3 transition-opacity"
                      style={{
                        fontFamily: "var(--font-syne)",
                        color: submitting ? "rgba(26,29,32,0.7)" : "#1A1D20",
                        background: "#FF6B35",
                        opacity: submitting ? 0.85 : 1,
                      }}
                      whileHover={{ backgroundColor: "#FF8555" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {submitting ? (
                        <>
                          <motion.span
                            animate={{ opacity: [1, 0.4, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          >
                            Sending…
                          </motion.span>
                        </>
                      ) : (
                        <>
                          Submit Form
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                          </svg>
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}
