import { motion } from "framer-motion";
import { SiX } from "react-icons/si";

const featured = {
  quote: "I've been trading on-chain for three years. The routing alone saved me more in slippage last month than I spent on gas all year. This is what a DEX aggregator should feel like.",
  name: "0xMarcus",
  handle: "@0xMarcus_",
  role: "Prop Trader · Solana",
  stat: "+$3,240",
  statLabel: "slippage saved (30d)",
  color: "from-primary/20 to-secondary/5",
};

const others = [
  {
    quote: "Set a trailing stop on a 200 SOL position, went to sleep, woke up green. The auto stop-loss feature is the first one I've trusted enough to actually leave on overnight.",
    name: "Elena.eth",
    handle: "@elanaonchain",
    role: "DeFi Analyst",
    stat: "200 SOL",
    statLabel: "position managed hands-free",
  },
  {
    quote: "Sub-100ms feeds actually matter when you're fading big prints. I tested it side-by-side against two other tools. tradexeasy was first every time.",
    name: "Kaito",
    handle: "@kaito_degen",
    role: "Full-time trader · 4y",
    stat: "< 80ms",
    statLabel: "price feed latency",
  },
  {
    quote: "Route preview before signing changed how I trade. I see the exact split and estimated output before I commit. No more 1.2% slippage surprises on illiquid pools.",
    name: "sol_punter",
    handle: "@sol_punter",
    role: "Swing trader",
    stat: "0.03%",
    statLabel: "avg slippage on $50K+ orders",
  },
];

const avatarColors = [
  "bg-violet-500",
  "bg-emerald-500",
  "bg-sky-500",
  "bg-amber-500",
];

export default function Testimonials() {
  return (
    <section className="py-24 relative overflow-hidden border-t border-border/30">
      <div className="container mx-auto px-4">

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Community</p>
            <h2 className="text-3xl md:text-5xl font-black leading-tight">
              From the traders<br />using it daily.
            </h2>
          </div>
          <a
            href="https://x.com/TradeXeasy"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors border border-border/50 hover:border-primary/50 px-4 py-2 rounded-lg w-fit"
          >
            <SiX className="w-3.5 h-3.5" /> Follow @TradeXeasy
          </a>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`relative bg-gradient-to-br ${featured.color} border border-primary/20 rounded-2xl p-8 md:p-10 mb-4`}
        >
          <p className="text-xl md:text-2xl font-medium leading-relaxed mb-8 max-w-3xl">
            "{featured.quote}"
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full ${avatarColors[0]} flex items-center justify-center text-white font-black text-lg flex-shrink-0`}>
                {featured.name[0]}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-bold">{featured.name}</p>
                  <a href={`https://x.com/${featured.handle.replace("@", "")}`} target="_blank" rel="noopener noreferrer"
                    className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                    <SiX className="w-3 h-3" />{featured.handle}
                  </a>
                </div>
                <p className="text-sm text-muted-foreground">{featured.role}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-black text-primary">{featured.stat}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">{featured.statLabel}</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {others.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-card border border-border/50 rounded-2xl p-6 flex flex-col justify-between gap-6 hover:border-border transition-colors"
            >
              <p className="text-sm text-muted-foreground leading-relaxed">"{t.quote}"</p>

              <div>
                <div className="mb-4 border-t border-border/30 pt-4">
                  <p className="text-2xl font-black text-foreground">{t.stat}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{t.statLabel}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full ${avatarColors[i + 1]} flex items-center justify-center text-white font-black text-sm flex-shrink-0`}>
                    {t.name[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="font-bold text-sm">{t.name}</p>
                      <a href={`https://x.com/${t.handle.replace("@", "")}`} target="_blank" rel="noopener noreferrer"
                        className="text-[10px] text-muted-foreground hover:text-primary transition-colors">
                        <SiX className="w-2.5 h-2.5" />
                      </a>
                    </div>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
