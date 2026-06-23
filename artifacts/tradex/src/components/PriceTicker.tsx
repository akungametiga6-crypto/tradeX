import { useQuery } from "@tanstack/react-query";
import { TrendingUp, TrendingDown } from "lucide-react";

type PriceEntry = { symbol: string; price: number; change24h: number };

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

async function fetchPrices(): Promise<PriceEntry[]> {
  const res = await fetch(`${BASE}/api/prices`);
  if (!res.ok) throw new Error("Failed to fetch prices");
  return res.json();
}

function fmt(price: number): string {
  if (price >= 1000) return price.toLocaleString("en-US", { maximumFractionDigits: 0 });
  if (price >= 1) return price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return price.toLocaleString("en-US", { minimumFractionDigits: 4, maximumFractionDigits: 4 });
}

function Coin({ entry }: { entry: PriceEntry }) {
  const up = entry.change24h >= 0;
  return (
    <span className="inline-flex items-center gap-2 px-5">
      <span className="font-bold text-foreground/90 text-xs tracking-wider">{entry.symbol}</span>
      <span className="font-mono text-xs text-foreground/70">${fmt(entry.price)}</span>
      <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${up ? "text-emerald-400" : "text-red-400"}`}>
        {up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
        {up ? "+" : ""}{entry.change24h.toFixed(2)}%
      </span>
      <span className="text-border/50 text-xs">·</span>
    </span>
  );
}

export default function PriceTicker() {
  const { data, isError } = useQuery<PriceEntry[]>({
    queryKey: ["prices"],
    queryFn: fetchPrices,
    refetchInterval: 15_000,
    staleTime: 14_000,
    retry: 2,
  });

  const coins = data && data.length > 0 ? data : null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-9 bg-background/95 backdrop-blur-md border-b border-border/40 overflow-hidden flex items-center">
      {/* Left gradient fade */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      {/* Right gradient fade */}
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      {/* Label */}
      <div className="absolute left-4 z-20 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Live</span>
      </div>

      {/* Scrolling track */}
      <div className="pl-20 overflow-hidden w-full">
        {isError || !coins ? (
          <span className="text-xs text-muted-foreground pl-4">Fetching live prices…</span>
        ) : (
          <div className="flex whitespace-nowrap animate-ticker will-change-transform">
            {/* Duplicate 4× for seamless loop */}
            {[...coins, ...coins, ...coins, ...coins].map((entry, i) => (
              <Coin key={`${entry.symbol}-${i}`} entry={entry} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
