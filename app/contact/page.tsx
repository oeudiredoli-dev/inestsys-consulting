import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import ContactPage from "@/components/ContactPage";
import ShineText from "@/components/ui/shine-text";
import Footer from "@/components/Footer";

const ArcAuraBg = dynamic(() => import("@/components/ui/arc-aura-bg"), { ssr: false });

export const metadata = {
  title: "Contact — inetSYS Consulting",
  description: "Ready to transform your digital infrastructure? Reach out to the inetSYS Consulting team.",
};

export default function Contact() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* Dark ArcAura hero */}
      <section className="relative overflow-hidden" style={{ background: "#1A1D20", minHeight: "52vh" }}>
        <ArcAuraBg />
        <Navbar />
        <div className="relative z-10 flex flex-col gap-5 pt-36 pb-20 px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
          <span
            className="text-[10px] tracking-[0.35em] uppercase"
            style={{ color: "#FF6B35", fontFamily: "var(--font-syne)" }}
          >
            Contact Us
          </span>
          <h1
            className="text-[44px] md:text-[68px] font-light leading-[1.05] tracking-tight"
            style={{ fontFamily: "var(--font-space-grotesk)", color: "#F2E5D7" }}
          >
            <ShineText variant="cream" duration={5}>Let&apos;s build</ShineText>
            <br />
            <span style={{ color: "#FF6B35" }}>the future.</span>
          </h1>
          <p
            className="max-w-md text-[14px] leading-relaxed"
            style={{ color: "#B8A99A" }}
          >
            Tell us about your infrastructure challenges. We respond within 24 hours.
          </p>
        </div>
      </section>

      <ContactPage />
      <Footer />
    </main>
  );
}
