import { motion } from "framer-motion";
import { Link } from "wouter";
import { TrendingUp, TrendingDown, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GamePromo() {
  return (
    <section className="py-24 relative overflow-hidden" id="game">
      {/* Glow background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto bg-card border border-border/50 rounded-2xl overflow-hidden"
          style={{ boxShadow: "0 0 60px rgba(0,229,176,0.06), 0 0 120px rgba(120,60,240,0.06)" }}
        >
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left: info */}
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-medium mb-5 w-fit">
                <div className="w-1.5 h-1.5 rounded-full bg-[#f04c68] animate-pulse" />
                <span>Live SOL Price · jup.ag</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-black mb-3 leading-tight">
                Predict Up<br />or Down?
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Play our SOL/USD prediction game powered by real Jupiter price data. 
                Start with $1,000 virtual USDC — no wallet needed.
              </p>

              <div className="flex flex-col gap-3 mb-8">
                {[
                  "Real-time price from Jupiter API",
                  "Live candlestick chart · 1m candles",
                  "60-second prediction rounds",
                  "Virtual USDC — no real funds at risk",
                ].map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Zap className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>

              <Link href="/game">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-bold gap-2 box-glow-primary"
                  data-testid="button-play-game"
                >
                  <Zap className="w-4 h-4" />
                  Play Now — Free
                </Button>
              </Link>
            </div>

            {/* Right: mock UI */}
            <div className="relative bg-background/60 border-l border-border/30 p-6 flex flex-col justify-center gap-4">
              {/* Fake chart lines */}
              <div className="w-full h-32 relative overflow-hidden rounded-lg border border-border/30 bg-background/80">
                <svg viewBox="0 0 300 100" className="w-full h-full">
                  <polyline
                    points="0,70 30,65 60,72 90,55 120,60 150,45 180,50 210,38 240,42 270,30 300,35"
                    fill="none" stroke="#00e5b0" strokeWidth="2" opacity="0.8"
                  />
                  <polyline
                    points="0,70 30,65 60,72 90,55 120,60 150,45 180,50 210,38 240,42 270,30 300,35"
                    fill="url(#greenFill)" strokeWidth="0"
                  />
                  <defs>
                    <linearGradient id="greenFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00e5b0" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#00e5b0" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute top-2 left-3 text-xs font-mono text-muted-foreground">SOL/USD · 1m</div>
                <div className="absolute bottom-2 right-3 text-sm font-mono font-bold text-[#00e5b0]">$70.xx</div>
              </div>

              {/* Up/Down buttons preview */}
              <div className="grid grid-cols-2 gap-3">
                <motion.div
                  animate={{ boxShadow: ["0 0 10px rgba(0,229,176,0.1)", "0 0 25px rgba(0,229,176,0.3)", "0 0 10px rgba(0,229,176,0.1)"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex items-center justify-center gap-2 h-12 rounded-xl border-2 border-[#00e5b0] bg-[#00e5b0]/10 text-[#00e5b0] font-black"
                >
                  <TrendingUp className="w-4 h-4" />
                  UP
                </motion.div>
                <div className="flex items-center justify-center gap-2 h-12 rounded-xl border-2 border-[#f04c68] bg-[#f04c68]/10 text-[#f04c68] font-black opacity-60">
                  <TrendingDown className="w-4 h-4" />
                  DOWN
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-2 text-center">
                {[
                  { label: "Balance", val: "$1,000" },
                  { label: "Payout", val: "1.85x" },
                  { label: "Duration", val: "60s" },
                ].map((s) => (
                  <div key={s.label} className="bg-card/60 rounded-lg py-2 border border-border/30">
                    <p className="text-xs font-mono font-bold text-primary">{s.val}</p>
                    <p className="text-[10px] text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
