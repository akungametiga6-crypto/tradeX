import { Router } from "express";

const router = Router();

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

router.get("/prices", async (req, res) => {
  try {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${COIN_IDS}&vs_currencies=usd&include_24hr_change=true`;
    const response = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!response.ok) {
      res.status(502).json({ error: "CoinGecko error" });
      return;
    }
    const data = await response.json() as Record<string, { usd: number; usd_24h_change?: number }>;
    const result = Object.entries(data)
      .map(([id, d]) => ({
        symbol: SYMBOL_MAP[id] ?? id.toUpperCase(),
        price: d.usd,
        change24h: Number((d.usd_24h_change ?? 0).toFixed(2)),
      }))
      .filter((e) => e.price > 0);
    res.json(result);
  } catch (err) {
    req.log.error({ err }, "Failed to fetch prices");
    res.status(500).json({ error: "Failed to fetch prices" });
  }
});

router.get("/sol-price", async (req, res) => {
  try {
    const url = "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd";
    const response = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!response.ok) {
      res.status(502).json({ error: "CoinGecko error" });
      return;
    }
    const data = await response.json() as { solana?: { usd: number } };
    const price = data.solana?.usd;
    if (!price) {
      res.status(502).json({ error: "No SOL price" });
      return;
    }
    res.json({ price });
  } catch (err) {
    req.log.error({ err }, "Failed to fetch SOL price");
    res.status(500).json({ error: "Failed to fetch SOL price" });
  }
});

export default router;
