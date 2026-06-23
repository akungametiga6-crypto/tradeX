import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MarketRankings from "@/components/MarketRankings";
import Features from "@/components/Features";
import About from "@/components/About";
import HowItWorks from "@/components/HowItWorks";
import SupportedChains from "@/components/SupportedChains";
import Testimonials from "@/components/Testimonials";
import LegalPrivacy from "@/components/LegalPrivacy";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Header />
      <main>
        <Hero />
        <MarketRankings />
        <Features />
        <HowItWorks />
        <SupportedChains />
        <About />
        <Testimonials />
        <LegalPrivacy />
      </main>
      <Footer />
    </div>
  );
}
