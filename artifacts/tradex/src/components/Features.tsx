import { motion } from "framer-motion";
import { Activity, Bell, Network, ShieldAlert, BookOpen, ArrowRight } from "lucide-react";

const primary = [
  {
    icon: Activity,
    tag: "Price Feeds",
    title: "Sub-100ms market data",
    body: "Direct RPC aggregation across Jupiter, Birdeye, and 6 on-chain sources. No middlemen. No stale quotes. Just the live order book — every millisecond.",
    stat: "< 80ms",
    statLabel: "median latency",
  },
];

const secondary = [
  {
    icon: Bell,
    title: "Whale alert engine",
    body: "On-chain monitoring flags wallets moving >$50K. Get notified before the chart moves.",
  },
  {
    icon: ShieldAlert,
    title: "Account-level stop-loss",
    body: "Set a single max drawdown rule. TradeX closes all positions automatically when your floor is hit.",
  },
  {
    icon: Network,
    title: "Optimal DEX routing",
    body: "Splits your order across 15+ liquidity pools per chain to minimise slippage. Route preview shown before you sign.",
  },
  {
    icon: BookOpen,
    title: "P&L attribution",
    body: "Every closed trade tagged by strategy, chain, and time-of-day. Know exactly which setups work for you.",
  },
];

export default function Features() {
  return (
    <section className="py-24 relative border-t border-border/30" id="features">
      <div className="container mx-auto px-4">

        {/* Header — left-aligned, not centred */}
        <div className="mb-14 max-w-xl">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Tools</p>
          <h2 className="text-3xl md:text-5xl font-black leading-tight mb-4">
            The edge you've<br />been missing.
          </h2>
          <p className="text-muted-foreground text-lg">
            Not buzzwords. Actual infrastructure built for traders who care about execution quality.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* Hero feature — spans 2 cols */}
          {primary.map((f) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-2 bg-card border border-border/50 rounded-2xl p-8 flex flex-col justify-between gap-8 hover:border-primary/40 transition-colors group"
              >
                <div>
                  <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold text-primary border border-primary/30 bg-primary/5 px-2.5 py-1 rounded-full mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    {f.tag}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-black mb-3">{f.title}</h3>
                  <p className="text-muted-foreground leading-relaxed max-w-md">{f.body}</p>
                </div>

                {/* Terminal mockup */}
                <div className="bg-background rounded-xl border border-border/50 p-4 font-mono text-xs overflow-hidden">
                  <div className="flex items-center gap-1.5 mb-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                    <span className="ml-2 text-muted-foreground/50 text-[10px]">tradex · price-stream</span>
                  </div>
                  {[
                    { time: "09:41:03.812", pair: "SOL/USDC", bid: "68.441", ask: "68.443", src: "jupiter" },
                    { time: "09:41:03.891", pair: "SOL/USDC", bid: "68.443", ask: "68.445", src: "raydium" },
                    { time: "09:41:03.923", pair: "SOL/USDC", bid: "68.444", ask: "68.445", src: "orca" },
                  ].map((row, i) => (
                    <div key={i} className={`flex gap-3 py-0.5 ${i === 2 ? "text-primary" : "text-muted-foreground/70"}`}>
                      <span className="text-muted-foreground/40">{row.time}</span>
                      <span className="text-foreground/60">{row.pair}</span>
                      <span className="text-emerald-400">bid {row.bid}</span>
                      <span className="text-red-400">ask {row.ask}</span>
                      <span className="text-muted-foreground/40">[{row.src}]</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-4xl font-black text-primary">{f.stat}</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{f.statLabel}</p>
                  </div>
                  <Icon className="w-8 h-8 text-border group-hover:text-primary transition-colors" />
                </div>
              </motion.div>
            );
          })}

          {/* Secondary stack — 1 col, 2 rows */}
          <div className="flex flex-col gap-4">
            {secondary.slice(0, 2).map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex-1 bg-card border border-border/50 rounded-2xl p-6 hover:border-primary/40 transition-colors group"
                >
                  <Icon className="w-5 h-5 text-primary mb-4" />
                  <h3 className="font-bold text-base mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.body}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom 2 features */}
          {secondary.slice(2).map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.1 }}
                className="bg-card border border-border/50 rounded-2xl p-6 hover:border-primary/40 transition-colors group"
              >
                <Icon className="w-5 h-5 text-secondary mb-4" />
                <h3 className="font-bold text-base mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.body}</p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-6 bg-card border border-border/50 rounded-2xl px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm text-muted-foreground">All features live on EasyA Kickstart. No sign-up required to start trading.</p>
          <a
            href="https://kickstart.easya.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all"
          >
            Launch terminal <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
