import { motion } from "framer-motion";
import { SiSolana, SiEthereum, SiBinance, SiPolygon } from "react-icons/si";
import { Network } from "lucide-react";
import type { IconType } from "react-icons";
import type { LucideIcon } from "lucide-react";

type ChainIcon = IconType | LucideIcon;

const chains: { name: string; icon: ChainIcon; color: string; label?: string }[] = [
  { name: "Solana", icon: SiSolana, color: "hover:text-[#14F195]" },
  { name: "Ethereum", icon: SiEthereum, color: "hover:text-[#627EEA]" },
  { name: "Base", icon: SiEthereum, color: "hover:text-[#0052FF]" },
  { name: "BSC", icon: SiBinance, color: "hover:text-[#F3BA2F]" },
  { name: "Polygon", icon: SiPolygon, color: "hover:text-[#8247E5]" },
  { name: "Arbitrum", icon: Network, color: "hover:text-[#28A0F0]" },
  { name: "Avalanche", icon: Network, color: "hover:text-[#E84142]" },
  { name: "Near", icon: Network, color: "hover:text-[#00C08B]" },
];

export default function SupportedChains() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-12">One Terminal. Every Chain.</h2>

        <div className="flex flex-wrap justify-center gap-4 md:gap-8 max-w-4xl mx-auto">
          {chains.map((chain, i) => {
            const Icon = chain.icon as React.ElementType;
            return (
              <motion.div
                key={chain.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`flex flex-col items-center justify-center p-6 bg-card border border-border/50 rounded-xl min-w-[120px] transition-all duration-300 hover:border-primary/50 group cursor-default`}
              >
                <Icon className={`w-12 h-12 mb-4 text-muted-foreground transition-colors duration-300 ${chain.color}`} />
                <span className="font-medium text-sm">{chain.name}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
