import { motion } from "framer-motion";
import { SiSolana, SiEthereum, SiBinance, SiPolygon, SiX } from "react-icons/si";
import { Network, ExternalLink } from "lucide-react";
import type { IconType } from "react-icons";
import type { LucideIcon } from "lucide-react";

type ChainIcon = IconType | LucideIcon;

const chains: {
  name: string;
  icon: ChainIcon;
  color: string;
  hoverBorder: string;
  website: string;
  xProfile: string;
  xHandle: string;
  description: string;
}[] = [
  {
    name: "Solana",
    icon: SiSolana,
    color: "text-[#14F195]",
    hoverBorder: "hover:border-[#14F195]/50",
    website: "https://solana.com",
    xProfile: "https://x.com/solana",
    xHandle: "@solana",
    description: "High-speed L1",
  },
  {
    name: "Ethereum",
    icon: SiEthereum,
    color: "text-[#627EEA]",
    hoverBorder: "hover:border-[#627EEA]/50",
    website: "https://ethereum.org",
    xProfile: "https://x.com/ethereum",
    xHandle: "@ethereum",
    description: "The OG smart chain",
  },
  {
    name: "Base",
    icon: SiEthereum,
    color: "text-[#0052FF]",
    hoverBorder: "hover:border-[#0052FF]/50",
    website: "https://www.base.org",
    xProfile: "https://x.com/base",
    xHandle: "@base",
    description: "Coinbase L2",
  },
  {
    name: "BNB Chain",
    icon: SiBinance,
    color: "text-[#F3BA2F]",
    hoverBorder: "hover:border-[#F3BA2F]/50",
    website: "https://www.bnbchain.org",
    xProfile: "https://x.com/BNBCHAIN",
    xHandle: "@BNBCHAIN",
    description: "High throughput EVM",
  },
  {
    name: "Polygon",
    icon: SiPolygon,
    color: "text-[#8247E5]",
    hoverBorder: "hover:border-[#8247E5]/50",
    website: "https://polygon.technology",
    xProfile: "https://x.com/0xPolygon",
    xHandle: "@0xPolygon",
    description: "Ethereum sidechain",
  },
  {
    name: "Arbitrum",
    icon: Network,
    color: "text-[#28A0F0]",
    hoverBorder: "hover:border-[#28A0F0]/50",
    website: "https://arbitrum.io",
    xProfile: "https://x.com/arbitrum",
    xHandle: "@arbitrum",
    description: "Ethereum L2 rollup",
  },
  {
    name: "Avalanche",
    icon: Network,
    color: "text-[#E84142]",
    hoverBorder: "hover:border-[#E84142]/50",
    website: "https://avax.network",
    xProfile: "https://x.com/avax",
    xHandle: "@avax",
    description: "Fast finality L1",
  },
  {
    name: "NEAR",
    icon: Network,
    color: "text-[#00C08B]",
    hoverBorder: "hover:border-[#00C08B]/50",
    website: "https://near.org",
    xProfile: "https://x.com/nearprotocol",
    xHandle: "@nearprotocol",
    description: "Sharded L1",
  },
];

export default function SupportedChains() {
  return (
    <section className="py-24 border-t border-border/30" id="chains">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">One Terminal. Every Chain.</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            tradexeasy aggregates liquidity across every major network — switch chains in one click, no wallet reconfig needed.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {chains.map((chain, i) => {
            const Icon = chain.icon as React.ElementType;
            return (
              <motion.div
                key={chain.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className={`group relative bg-card border border-border/50 rounded-xl p-5 flex flex-col gap-3 transition-all duration-300 ${chain.hoverBorder} hover:shadow-lg`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg bg-background border border-border/50 flex items-center justify-center flex-shrink-0 ${chain.color} transition-colors`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-sm leading-tight">{chain.name}</p>
                    <p className="text-xs text-muted-foreground">{chain.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1 border-t border-border/30">
                  <a
                    href={chain.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>Website</span>
                  </a>
                  <span className="text-border/50">·</span>
                  <a
                    href={chain.xProfile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    <SiX className="w-3 h-3" />
                    <span>{chain.xHandle}</span>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
