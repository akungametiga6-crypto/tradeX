import { motion } from "framer-motion";
import { Zap, Activity } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden" id="home">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium mb-8"
        >
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
          <Link href="/game">
            <Button size="lg" className="h-14 px-8 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-none box-glow-primary gap-3" data-testid="button-start-trading">
              <Zap className="w-5 h-5" />
              Play Now — Free
            </Button>
          </Link>
          <a href="https://youtu.be/8AGz4TC5a50?si=Oa27f8L76N0U8wuC" target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-border/50 bg-background/50 hover:bg-card rounded-none gap-3" data-testid="button-view-docs">
              <img src="https://www.youtube.com/favicon.ico" alt="YouTube" className="w-5 h-5" />
              View Documentation
            </Button>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="w-full max-w-5xl mt-20 h-48 md:h-64 border-t border-x border-border/50 rounded-t-xl bg-card/30 backdrop-blur-sm relative overflow-hidden flex items-end"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
          <div className="w-full flex items-end justify-between px-4 pb-4 gap-1 opacity-40">
            {Array.from({ length: 40 }).map((_, i) => {
              const h = 20 + ((i * 37 + 13) % 80);
              const isUp = (i * 7 + 3) % 10 > 4;
              return (
                <div
                  key={i}
                  className={`w-full ${isUp ? 'bg-primary' : 'bg-destructive'}`}
                  style={{ height: `${h}%` }}
                />
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
