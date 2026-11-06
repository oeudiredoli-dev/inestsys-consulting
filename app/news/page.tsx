import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import NewsPage from "@/components/NewsPage";
import ShineText from "@/components/ui/shine-text";
import Footer from "@/components/Footer";

const ArcAuraBg = dynamic(() => import("@/components/ui/arc-aura-bg"), { ssr: false });

export const metadata = {
  title: "INEST News — Tech Insights, Unfiltered",
  description: "Infrastructure deep-dives, AI analysis, and digital strategy from the inetSYS Consulting team.",
};

export default function News() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* Dark ArcAura hero */}
      <section className="relative overflow-hidden" style={{ background: "#1A1D20", minHeight: "54vh" }}>
        <ArcAuraBg />
        <Navbar />
        <div className="relative z-10 flex flex-col gap-5 pt-36 pb-20 px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
          <span
            className="text-[10px] tracking-[0.35em] uppercase"
            style={{ color: "#FF6B35", fontFamily: "var(--font-syne)" }}
          >
            INEST News
          </span>
          <h1
            className="text-[44px] md:text-[68px] font-medium leading-[1.05] tracking-tighter"
            style={{ fontFamily: "var(--font-space-grotesk)", color: "#F2E5D7" }}
          >
            <ShineText variant="cream" duration={5}>Tech Insights.</ShineText>
            <br />
            <span style={{ color: "rgba(242,229,215,0.30)" }}>Unfiltered.</span>
          </h1>
          <p
            className="max-w-lg text-[14px] leading-relaxed"
            style={{ color: "#B8A99A" }}
          >
            Infrastructure deep-dives, AI analysis, and digital strategy from the INEST team —
            plus the week&apos;s most important tech signals.
          </p>
        </div>
      </section>

      <NewsPage />
      <Footer />
    </main>
  );
}
