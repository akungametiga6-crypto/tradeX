import { Link } from "wouter";
import { SiX, SiSolana, SiEthereum, SiBinance, SiPolygon } from "react-icons/si";
import { ExternalLink, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoPath from "@/assets/tradexeasy-logo.png";

const blockchains = [
  { name: "Solana", icon: SiSolana, color: "text-[#14F195]", website: "https://solana.com", x: "https://x.com/solana", xHandle: "@solana" },
  { name: "Ethereum", icon: SiEthereum, color: "text-[#627EEA]", website: "https://ethereum.org", x: "https://x.com/ethereum", xHandle: "@ethereum" },
  { name: "Base", icon: SiEthereum, color: "text-[#0052FF]", website: "https://base.org", x: "https://x.com/base", xHandle: "@base" },
  { name: "BNB Chain", icon: SiBinance, color: "text-[#F3BA2F]", website: "https://bnbchain.org", x: "https://x.com/BNBCHAIN", xHandle: "@BNBCHAIN" },
  { name: "Polygon", icon: SiPolygon, color: "text-[#8247E5]", website: "https://polygon.technology", x: "https://x.com/0xPolygon", xHandle: "@0xPolygon" },
  { name: "Arbitrum", icon: SiEthereum, color: "text-[#28A0F0]", website: "https://arbitrum.io", x: "https://x.com/arbitrum", xHandle: "@arbitrum" },
  { name: "Avalanche", icon: SiEthereum, color: "text-[#E84142]", website: "https://avax.network", x: "https://x.com/avax", xHandle: "@avax" },
  { name: "NEAR", icon: SiEthereum, color: "text-[#00C08B]", website: "https://near.org", x: "https://x.com/nearprotocol", xHandle: "@nearprotocol" },
];

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border/50 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">

          {/* Brand */}
          <div className="md:col-span-4">
            <Link href="/" className="flex items-center mb-5">
              <img src={logoPath} alt="tradexeasy Logo" className="h-9 w-auto object-contain" />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-xs">
              Trade Smart. Grow Fast. Platform intelijen multi-chain untuk trader crypto serius — tanpa batasan, tanpa kompromi.
            </p>

            {/* Social buttons — each with its own labeled button */}
            <div className="flex flex-col gap-2">
              <a href="https://x.com/TradeXeasy" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="w-full border-border/50 bg-background/50 hover:bg-card hover:text-primary gap-2 justify-start" data-testid="link-footer-founder-x">
                  <SiX className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>@TradeXeasy</span>
                </Button>
              </a>
              <a href="https://kickstart.easya.io/" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="w-full border-border/50 bg-background/50 hover:bg-card hover:text-primary gap-2 justify-start" data-testid="link-footer-easya">
                  <Rocket className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>EasyA Kickstart</span>
                </Button>
              </a>
              <a href="https://x.com/EasyA_Kickstart" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="w-full border-border/50 bg-background/50 hover:bg-card hover:text-primary gap-2 justify-start" data-testid="link-footer-easya-x">
                  <SiX className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>@EasyA_Kickstart</span>
                </Button>
              </a>
            </div>
          </div>

          {/* Platform links */}
          <div className="md:col-span-2">
            <h4 className="font-bold mb-5 text-sm uppercase tracking-wider text-muted-foreground">Platform</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#markets" className="text-muted-foreground hover:text-primary transition-colors">Markets</a></li>
              <li><a href="#features" className="text-muted-foreground hover:text-primary transition-colors">Features</a></li>
              <li><a href="#game" className="text-muted-foreground hover:text-primary transition-colors">Trading Game</a></li>
              <li><a href="#about" className="text-muted-foreground hover:text-primary transition-colors">About</a></li>
              <li><a href="#legal" className="text-muted-foreground hover:text-primary transition-colors">Legal</a></li>
            </ul>
          </div>

          {/* Blockchain links */}
          <div className="md:col-span-6">
            <h4 className="font-bold mb-5 text-sm uppercase tracking-wider text-muted-foreground">Supported Blockchains</h4>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              {blockchains.map((chain) => {
                const Icon = chain.icon;
                return (
                  <div key={chain.name} className="flex items-start gap-2">
                    <Icon className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${chain.color}`} />
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-semibold text-foreground/80">{chain.name}</span>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <a href={chain.website} target="_blank" rel="noopener noreferrer"
                          className="hover:text-primary transition-colors flex items-center gap-0.5">
                          <ExternalLink className="w-2.5 h-2.5" /> Site
                        </a>
                        <span>·</span>
                        <a href={chain.x} target="_blank" rel="noopener noreferrer"
                          className="hover:text-primary transition-colors flex items-center gap-0.5">
                          <SiX className="w-2.5 h-2.5" /> {chain.xHandle}
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Legal row */}
        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; 2026 TradeX. All rights reserved. Trading crypto involves significant risk.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <a href="#legal" className="hover:text-primary transition-colors">Terms</a>
            <a href="#legal" className="hover:text-primary transition-colors">Privacy</a>
            <span className="flex items-center gap-1">
              Powered by{" "}
              <a href="https://kickstart.easya.io/" target="_blank" rel="noopener noreferrer"
                className="font-bold text-foreground hover:text-primary transition-colors ml-1">
                EasyA Kickstart
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
