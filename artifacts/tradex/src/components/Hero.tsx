import { motion } from "framer-motion";
import { Activity, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const CHART_BARS = Array.from({ length: 40 }, (_, i) => ({
  h: 20 + ((i * 37 + 13) % 80),
  isUp: (i * 7 + 3) % 10 > 3,
}));

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-[116px] overflow-hidden" id="home">
      {/* Ambient glow — contained, responsive */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(600px,90vw)] h-[min(600px,90vw)] bg-primary/8 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[min(400px,60vw)] h-[min(400px,60vw)] bg-secondary/7 rounded-full blur-[80px] pointer-events-none" />
      {/* Bottom fade so glow doesn't bleed into next section */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />

      {/* Grid — lighter on mobile, visible on desktop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px] md:bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_20%,#000_60%,transparent_100%)] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <Activity className="w-4 h-4" />
          <span>Live Market Data Active</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 text-glow-primary"
        >
          Trade Smart. <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Grow Fast.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10"
        >
          The intelligent crypto trading platform for serious traders. High-speed execution, deep liquidity, and precision tools wrapped in a next-generation terminal.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <a href="https://tradexeasy.online/game" target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              className="h-14 px-8 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-none box-glow-primary group gap-3"
              data-testid="button-start-trading"
            >
              <Zap className="w-5 h-5" />
              Play Now — Free
            </Button>
          </a>
          <a href="https://youtu.be/8AGz4TC5a50?si=Oa27f8L76N0U8wuC" target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-8 text-lg border-border/50 bg-background/50 hover:bg-card rounded-none gap-3"
              data-testid="button-view-docs"
            >
              <img src="https://www.youtube.com/favicon.ico" alt="YouTube" className="w-5 h-5" />
              View Documentation
            </Button>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-8 mt-12 text-sm"
        >
          {[
            { label: "Active Traders", value: "250K+" },
            { label: "Volume Tracked", value: "$12B+" },
            { label: "Chains Supported", value: "8" },
            { label: "Uptime", value: "99.99%" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="text-2xl font-black text-primary">{stat.value}</span>
              <span className="text-muted-foreground text-xs uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="w-full max-w-5xl mt-16 h-48 md:h-64 border-t border-x border-border/50 rounded-t-xl bg-card/30 backdrop-blur-sm relative overflow-hidden flex items-end"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
          <div className="absolute top-3 left-4 flex items-center gap-2 z-20">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-mono text-muted-foreground">BTC/USD · 1m · Live</span>
          </div>
          <div className="absolute top-3 right-4 z-20">
            <span className="text-xs font-mono font-bold text-primary">▲ +2.34%</span>
          </div>
          <div className="w-full flex items-end justify-between px-4 pb-4 gap-1 opacity-40">
            {CHART_BARS.map((bar, i) => (
              <div
                key={i}
                className={`w-full ${bar.isUp ? "bg-primary" : "bg-destructive"}`}
                style={{ height: `${bar.h}%` }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
