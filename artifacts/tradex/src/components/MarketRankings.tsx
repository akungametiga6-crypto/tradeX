import { motion } from "framer-motion";
import { SiSolana, SiEthereum, SiBinance, SiPolygon } from "react-icons/si";
import { TrendingUp, TrendingDown } from "lucide-react";

const chains = [
  { rank: 1,  name: "Solana",      ticker: "SOL",  volume: "$1.24B",  share: 35.4, change: +12.3, color: "#14F195", Icon: SiSolana },
  { rank: 2,  name: "Base",        ticker: "BASE", volume: "$579.4M", share: 16.5, change: +8.1,  color: "#0052FF", Icon: SiEthereum },
  { rank: 3,  name: "Ethereum",    ticker: "ETH",  volume: "$532.5M", share: 15.2, change: -2.4,  color: "#627EEA", Icon: SiEthereum },
  { rank: 4,  name: "BNB Chain",   ticker: "BNB",  volume: "$479.9M", share: 13.7, change: +4.8,  color: "#F3BA2F", Icon: SiBinance },
  { rank: 5,  name: "Polygon",     ticker: "MATIC",volume: "$255.9M", share:  7.3, change: -1.1,  color: "#8247E5", Icon: SiPolygon },
  { rank: 6,  name: "Hyperliquid", ticker: "HYPE", volume: "$192.7M", share:  5.5, change: +22.6, color: "#00D4AA", Icon: SiEthereum },
  { rank: 7,  name: "Arbitrum",    ticker: "ARB",  volume: "$102.8M", share:  2.9, change: -0.8,  color: "#28A0F0", Icon: SiEthereum },
];

const totalVol = "$3.51B";

export default function MarketRankings() {
  return (
    <section className="py-24 border-t border-border/30 relative" id="markets">
      <div className="container mx-auto px-4">

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Markets</p>
            <h2 className="text-3xl md:text-4xl font-black">DEX Volume by Chain</h2>
          </div>
          <div className="text-right">
            <p className="text-3xl font-black">{totalVol}</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">total 24h volume</p>
          </div>
        </div>

        <div className="bg-card border border-border/50 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-[2rem_1fr_auto_auto_auto] md:grid-cols-[2rem_1fr_auto_auto_auto_160px] items-center gap-4 px-6 py-3 border-b border-border/30 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
            <span>#</span>
            <span>Chain</span>
            <span className="text-right">24h Volume</span>
            <span className="text-right hidden sm:block">Share</span>
            <span className="text-right">24h Change</span>
            <span className="hidden md:block" />
          </div>

          {chains.map((c, i) => {
            const up = c.change >= 0;
            return (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="grid grid-cols-[2rem_1fr_auto_auto_auto] md:grid-cols-[2rem_1fr_auto_auto_auto_160px] items-center gap-4 px-6 py-4 border-b border-border/20 last:border-0 hover:bg-background/40 transition-colors group"
              >
                <span className="text-sm font-black text-muted-foreground/40">{c.rank}</span>

                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border border-border/40 group-hover:border-border/80 transition-colors"
                    style={{ background: `${c.color}18` }}
                  >
                    <c.Icon className="w-4 h-4" style={{ color: c.color }} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-sm truncate">{c.name}</p>
                    <p className="text-[11px] text-muted-foreground font-mono">{c.ticker}</p>
                  </div>
                </div>

                <span className="text-sm font-mono font-bold text-right">{c.volume}</span>
                <span className="text-sm font-mono text-muted-foreground text-right hidden sm:block">{c.share}%</span>

                <div className={`flex items-center justify-end gap-1 text-sm font-bold ${up ? "text-emerald-400" : "text-red-400"}`}>
                  {up ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                  {up ? "+" : ""}{c.change}%
                </div>

                <div className="hidden md:block">
                  <div className="h-1.5 w-full bg-background rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${c.share * 2.82}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 + i * 0.06, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ background: c.color }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <p className="text-xs text-muted-foreground/50 mt-3 text-right">Volume data indicative · updates every 30s</p>
      </div>
    </section>
  );
}
