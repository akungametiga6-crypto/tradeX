import { motion } from "framer-motion";
import { SiSolana, SiEthereum, SiBinance } from "react-icons/si";

const chainData = [
  { name: "Solana", volume: "$1.24B", value: 100, color: "bg-primary", icon: SiSolana },
  { name: "Base", volume: "$579.4M", value: 46, color: "bg-blue-500", icon: SiEthereum },
  { name: "Ethereum", volume: "$532.5M", value: 42, color: "bg-indigo-500", icon: SiEthereum },
  { name: "BSC", volume: "$479.9M", value: 38, color: "bg-yellow-500", icon: SiBinance },
  { name: "Polygon", volume: "$255.9M", value: 20, color: "bg-purple-500", icon: SiEthereum },
  { name: "Hyperliquid", volume: "$192.7M", value: 15, color: "bg-teal-500", icon: SiEthereum },
  { name: "Arbitrum", volume: "$102.8M", value: 8, color: "bg-sky-500", icon: SiEthereum },
];

export default function MarketRankings() {
  return (
    <section className="py-24 bg-background border-t border-border/30 relative" id="markets">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Live Market Volume</h2>
          <p className="text-muted-foreground">Top chains by 24h DEX volume tracked by TradeX.</p>
        </div>

        <div className="max-w-4xl bg-card border border-border/50 rounded-xl p-6 md:p-8 box-glow-secondary/10">
          <div className="space-y-6">
            {chainData.map((chain, i) => {
              const Icon = chain.icon;
              return (
                <motion.div
                  key={chain.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group"
                >
                  <div className="flex justify-between items-end mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center border border-border/50 group-hover:border-primary/50 transition-colors">
                        <Icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <span className="font-semibold">{chain.name}</span>
                    </div>
                    <span className="text-sm font-mono text-muted-foreground">{chain.volume}</span>
                  </div>
                  <div className="h-3 w-full bg-background rounded-full overflow-hidden border border-border/30">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${chain.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 + i * 0.1, ease: "easeOut" }}
                      className={`h-full ${chain.color} opacity-80 group-hover:opacity-100 transition-opacity`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
