import Header from "@/components/Header";
import PriceTicker from "@/components/PriceTicker";
import Hero from "@/components/Hero";
import MarketRankings from "@/components/MarketRankings";
import Features from "@/components/Features";
import GamePromo from "@/components/GamePromo";
import HowItWorks from "@/components/HowItWorks";
import SupportedChains from "@/components/SupportedChains";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import LegalPrivacy from "@/components/LegalPrivacy";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <PriceTicker />
      <Header />
      <main>
        <Hero />
        <MarketRankings />
        <Features />
        <GamePromo />
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
