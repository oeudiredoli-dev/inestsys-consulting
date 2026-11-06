import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";

const ArcAuraBg = dynamic(() => import("@/components/ui/arc-aura-bg"), { ssr: false });

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      {/* ── DARK hero with ArcAura ── */}
      <div className="relative overflow-hidden bg-[#1A1D20]" style={{ minHeight: "100svh" }}>
        <ArcAuraBg />
        <Navbar />
        <HeroSection />
      </div>

      {/* ── LIGHT intro strip ── */}
      <section style={{ background: "#F5F0EA" }} className="px-8 md:px-16 lg:px-24 py-20 md:py-28">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { n: "01", title: "Strategy First", body: "Every infrastructure decision starts with understanding where your business is going — not just where it is." },
            { n: "02", title: "Zero Complexity", body: "We turn the most intricate network environments into systems your team can actually manage and scale." },
            { n: "03", title: "Always Ahead", body: "We monitor the technology landscape so you don't have to. You focus on the business; we handle the board." },
          ].map((item) => (
            <div key={item.n} className="flex flex-col gap-4">
              <span className="text-[11px] tracking-[0.3em]" style={{ color: "#CC5528", fontFamily: "var(--font-syne)" }}>{item.n}</span>
              <div className="w-8 h-px" style={{ background: "#FF6B35" }} />
              <h3 className="text-[22px] font-semibold tracking-tight" style={{ fontFamily: "var(--font-space-grotesk)", color: "#1A130F" }}>{item.title}</h3>
              <p className="text-[14px] leading-[1.8]" style={{ color: "#5C4A3D" }}>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── DARK CTA band ── */}
      <section className="bg-[#1A130F] px-8 md:px-16 lg:px-24 py-16 md:py-20 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-xl">
          <h2 className="text-[28px] md:text-[36px] font-medium tracking-tight" style={{ fontFamily: "var(--font-space-grotesk)", color: "#F2E5D7" }}>
            The tech industry isn&apos;t waiting.<br />
            <span style={{ color: "#FF6B35" }}>Neither should you.</span>
          </h2>
        </div>
        <a href="/contact" className="shrink-0 px-8 py-4 text-[11px] tracking-[0.2em] uppercase font-semibold transition-all duration-300"
          style={{ background: "#FF6B35", color: "#1A1D20", fontFamily: "var(--font-syne)" }}
          onMouseOver={undefined}>
          Let&apos;s work together →
        </a>
      </section>
      <Footer />
    </main>
  );
}
