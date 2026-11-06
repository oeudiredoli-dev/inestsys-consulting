import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import MissionPage from "@/components/MissionPage";
import Footer from "@/components/Footer";

const ArcAuraBg = dynamic(() => import("@/components/ui/arc-aura-bg"), {
  ssr: false,
});

export const metadata = {
  title: "Our Mission — INEST | inetSYS Consulting",
  description: "Strategy-first technology consulting. We think 10 moves ahead.",
};

export default function Mission() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#1A1D20]">
      <ArcAuraBg />
      <Navbar />
      <MissionPage />
      <Footer />
    </main>
  );
}
