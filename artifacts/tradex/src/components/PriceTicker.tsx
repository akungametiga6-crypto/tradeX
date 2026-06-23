import { useQuery } from "@tanstack/react-query";
import { TrendingUp, TrendingDown } from "lucide-react";

type PriceEntry = { symbol: string; price: number; change24h: number };

const COIN_IDS = "bitcoin,ethereum,solana,binancecoin,ripple,dogecoin,avalanche-2,polygon-ecosystem-token";
const SYMBOL_MAP: Record<string, string> = {
  bitcoin: "BTC",
  ethereum: "ETH",
  solana: "SOL",
  binancecoin: "BNB",
  ripple: "XRP",
  dogecoin: "DOGE",
  "avalanche-2": "AVAX",
  "polygon-ecosystem-token": "POL",
};

async function fetchPrices(): Promise<PriceEntry[]> {
  // Try the API proxy first (works on Replit), fall back to CoinGecko directly (GitHub Pages)
  const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
  try {
    const res = await fetch(`${BASE}/api/prices`, { signal: AbortSignal.timeout(5000) });
    if (res.ok) return res.json();
  } catch { /* fallthrough */ }

  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${COIN_IDS}&vs_currencies=usd&include_24hr_change=true`;
  const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
  if (!res.ok) throw new Error("Failed to fetch prices from CoinGecko");
  const data = await res.json() as Record<string, { usd: number; usd_24h_change?: number }>;
  return Object.entries(data)
    .map(([id, d]) => ({
      symbol: SYMBOL_MAP[id] ?? id.toUpperCase(),
      price: d.usd,
      change24h: Number((d.usd_24h_change ?? 0).toFixed(2)),
    }))
    .filter((e) => e.price > 0);
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
    refetchInterval: 30_000,
    staleTime: 25_000,
    retry: 2,
  });

  const coins = data && data.length > 0 ? data : null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-9 bg-background/95 backdrop-blur-md border-b border-border/40 overflow-hidden flex items-center">
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div className="absolute left-4 z-20 flex items-center gap-1.5">
        <span className={`w-1.5 h-1.5 rounded-full ${isError ? "bg-red-400" : "bg-emerald-400 animate-pulse"}`} />
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Live</span>
      </div>

      <div className="pl-20 overflow-hidden w-full">
        {!coins ? (
          <span className="text-xs text-muted-foreground pl-4">Fetching live prices…</span>
        ) : (
          <div className="flex whitespace-nowrap animate-ticker will-change-transform">
            {[...coins, ...coins, ...coins, ...coins].map((entry, i) => (
              <Coin key={`${entry.symbol}-${i}`} entry={entry} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
