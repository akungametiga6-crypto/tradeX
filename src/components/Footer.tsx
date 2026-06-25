import { Link } from "wouter";
import { SiX, SiSolana } from "react-icons/si";
import { ExternalLink } from "lucide-react";
import logoPath from "@assets/a87c8240-7053-4b07-97aa-3f1afaec6e84_1782194174325.png";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border/50 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 inline-flex">
              <img src={logoPath} alt="TradeX Logo" className="h-8 w-8 object-contain" />
              <span className="font-display font-bold text-lg tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                TRADEX
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              TRADE SMART. GROW FAST. The premier intelligence platform for serious crypto traders.
            </p>
            <div className="flex gap-4">
              <a
                href="https://x.com/TradeXeasy"
                target="_blank"
                rel="noopener noreferrer"
                title="Follow on X"
                data-testid="link-footer-founder-x"
                className="w-10 h-10 rounded-full bg-background border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
              >
                <SiX className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6">Platform</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/game" className="hover:text-primary transition-colors flex items-center gap-2"><ExternalLink className="w-3 h-3" />Play Now — Free</Link></li>
              <li><a href="#markets" className="hover:text-primary transition-colors">Markets</a></li>
              <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#about" className="hover:text-primary transition-colors">About</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Blockchain</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://solana.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="link-footer-solana"
                  className="hover:text-primary transition-colors flex items-center gap-2"
                >
                  <SiSolana className="w-3 h-3 text-[#14F195]" />
                  Solana Network
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/solana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors flex items-center gap-2"
                >
                  <SiX className="w-3 h-3" />
                  @solana
                </a>
              </li>
              <li><a href="#legal" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#legal" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; 2026 TradeX. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built for serious traders
          </p>
        </div>
      </div>
    </footer>
  );
}
