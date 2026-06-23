import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, TrendingUp, TrendingDown, RefreshCw, Trophy, Zap, Clock, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoPath from "@/assets/tradex-logo.jpg";

// ── Types ─────────────────────────────────────────────────────────────────────
interface Candle {
  open: number;
  high: number;
  low: number;
  close: number;
  time: number;
  volume: number;
}

type GamePhase = "idle" | "countdown" | "result";
type Prediction = "up" | "down" | null;

const GAME_DURATION = 60; // seconds
const BET_OPTIONS = [10, 25, 50, 100, 250];
const PAYOUT_MULT = 1.85;
const CANDLE_COUNT = 20;
const POLL_INTERVAL = 8000; // ms

// ── Jupiter API (proxied through our API server to avoid CORS) ────────────────
const SOL_MINT = "So11111111111111111111111111111111111111112";

async function fetchSolPrice(): Promise<number | null> {
  // Try API proxy first (Replit), fall back to CoinGecko directly (GitHub Pages / offline API)
  try {
    const base = import.meta.env.BASE_URL?.replace(/\/$/, "") ?? "";
    const res = await fetch(`${base}/api/sol-price`, { signal: AbortSignal.timeout(5000) });
    if (res.ok) {
      const json = await res.json() as { price: number };
      return json.price ?? null;
    }
  } catch { /* fallthrough */ }

  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd",
      { signal: AbortSignal.timeout(8000) }
    );
    if (!res.ok) return null;
    const data = await res.json() as { solana?: { usd: number } };
    return data.solana?.usd ?? null;
  } catch {
    return null;
  }
}

// ── Chart helpers ─────────────────────────────────────────────────────────────
function generateCandles(anchorPrice: number, count: number): Candle[] {
  const candles: Candle[] = [];
  let price = anchorPrice * (1 + (Math.random() * 0.04 - 0.02));
  const now = Date.now();

  for (let i = count - 1; i >= 0; i--) {
    const move = price * (Math.random() * 0.012 - 0.006);
    const open = price;
    const close = price + move;
    const wick = Math.abs(move) * (1 + Math.random() * 1.5);
    const high = Math.max(open, close) + wick * Math.random();
    const low = Math.min(open, close) - wick * Math.random();
    const volume = 50000 + Math.random() * 200000;
    candles.push({ open, high, low, close, time: now - i * 60000, volume });
    price = close;
  }
  // Last candle closes at real anchor price
  const last = candles[candles.length - 1];
  last.close = anchorPrice;
  last.high = Math.max(last.high, anchorPrice);
  last.low = Math.min(last.low, anchorPrice);
  return candles;
}

function addLiveCandle(candles: Candle[], currentPrice: number): Candle[] {
  const prev = candles[candles.length - 1];
  const open = prev.close;
  const close = currentPrice;
  const wick = Math.abs(close - open) * (0.5 + Math.random());
  const high = Math.max(open, close) + wick * Math.random();
  const low = Math.min(open, close) - wick * Math.random();
  return [...candles.slice(-(CANDLE_COUNT - 1)), {
    open, high, low, close,
    time: Date.now(),
    volume: 50000 + Math.random() * 200000,
  }];
}

// ── SVG Candlestick Chart ─────────────────────────────────────────────────────
function CandlestickChart({ candles, prediction }: { candles: Candle[]; prediction: Prediction }) {
  const W = 600;
  const H = 220;
  const PAD = { top: 12, right: 40, bottom: 30, left: 60 };
  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top - PAD.bottom;

  if (candles.length === 0) return null;

  const prices = candles.flatMap(c => [c.high, c.low]);
  const minP = Math.min(...prices);
  const maxP = Math.max(...prices);
  const range = maxP - minP || 1;
  const pad = range * 0.08;

  const scaleY = (v: number) => PAD.top + ((maxP + pad - v) / (range + pad * 2)) * chartH;
  const candleW = Math.max(4, chartW / candles.length - 2);
  const xStep = chartW / candles.length;

  // Y-axis ticks
  const ticks: number[] = [];
  const tickCount = 5;
  for (let i = 0; i <= tickCount; i++) {
    ticks.push(minP - pad + ((range + pad * 2) * i) / tickCount);
  }

  const lastCandle = candles[candles.length - 1];
  const lastY = scaleY(lastCandle.close);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" style={{ fontFamily: "monospace" }}>
      {/* Grid lines */}
      {ticks.map((t, i) => (
        <line
          key={i}
          x1={PAD.left} y1={scaleY(t)}
          x2={W - PAD.right} y2={scaleY(t)}
          stroke="#ffffff08" strokeWidth="1"
        />
      ))}

      {/* Candles */}
      {candles.map((c, i) => {
        const x = PAD.left + i * xStep + xStep / 2;
        const isUp = c.close >= c.open;
        const color = isUp ? "#00e5b0" : "#f04c68";
        const bodyTop = scaleY(Math.max(c.open, c.close));
        const bodyBot = scaleY(Math.min(c.open, c.close));
        const bodyH = Math.max(1, bodyBot - bodyTop);
        const isLast = i === candles.length - 1;

        return (
          <g key={c.time}>
            {/* Wick */}
            <line x1={x} y1={scaleY(c.high)} x2={x} y2={scaleY(c.low)}
              stroke={color} strokeWidth="1.5" opacity={isLast ? 1 : 0.75} />
            {/* Body */}
            <rect
              x={x - candleW / 2} y={bodyTop}
              width={candleW} height={bodyH}
              fill={color}
              opacity={isLast ? 1 : 0.8}
              rx={1}
            />
            {isLast && (
              <rect x={x - candleW / 2} y={bodyTop} width={candleW} height={bodyH}
                fill={color} opacity={0.3} rx={1}
                filter="url(#glow)"
              />
            )}
          </g>
        );
      })}

      {/* Current price line */}
      <line
        x1={PAD.left} y1={lastY}
        x2={W - PAD.right} y2={lastY}
        stroke={lastCandle.close >= lastCandle.open ? "#00e5b0" : "#f04c68"}
        strokeWidth="1" strokeDasharray="4 3" opacity={0.7}
      />

      {/* Price label */}
      <rect x={W - PAD.right} y={lastY - 9} width={PAD.right - 2} height={18} rx={3}
        fill={lastCandle.close >= lastCandle.open ? "#00e5b0" : "#f04c68"} />
      <text x={W - PAD.right / 2 - 1} y={lastY + 4} textAnchor="middle"
        fontSize="9" fontWeight="700" fill="#0a0f1e">
        {lastCandle.close.toFixed(2)}
      </text>

      {/* Y-axis labels */}
      {ticks.filter((_, i) => i % 2 === 0).map((t, i) => (
        <text key={i} x={PAD.left - 4} y={scaleY(t) + 4}
          textAnchor="end" fontSize="9" fill="#6b7a99">
          {t.toFixed(1)}
        </text>
      ))}

      {/* Prediction overlay arrow */}
      {prediction && (
        <g>
          <line
            x1={PAD.left + (candles.length - 1) * xStep + xStep / 2}
            y1={lastY}
            x2={W - PAD.right - 4}
            y2={prediction === "up" ? lastY - 30 : lastY + 30}
            stroke={prediction === "up" ? "#00e5b0" : "#f04c68"}
            strokeWidth="2" strokeDasharray="5 3" opacity={0.9}
          />
        </g>
      )}

      {/* Glow filter */}
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
    </svg>
  );
}

// ── Volume bars ───────────────────────────────────────────────────────────────
function VolumeBars({ candles }: { candles: Candle[] }) {
  const maxVol = Math.max(...candles.map(c => c.volume), 1);
  return (
    <div className="flex items-end gap-[2px] w-full h-12 px-1">
      {candles.map((c, i) => {
        const isUp = c.close >= c.open;
        const pct = (c.volume / maxVol) * 100;
        return (
          <div
            key={i}
            className="flex-1 rounded-sm"
            style={{
              height: `${pct}%`,
              background: isUp ? "rgba(0,229,176,0.35)" : "rgba(240,76,104,0.35)",
            }}
          />
        );
      })}
    </div>
  );
}

// ── Main Game ─────────────────────────────────────────────────────────────────
export default function TradingGame() {
  const [price, setPrice] = useState<number | null>(null);
  const [entryPrice, setEntryPrice] = useState<number | null>(null);
  const [candles, setCandles] = useState<Candle[]>([]);
  const [phase, setPhase] = useState<GamePhase>("idle");
  const [prediction, setPrediction] = useState<Prediction>(null);
  const [bet, setBet] = useState(25);
  const [balance, setBalance] = useState(1000);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [resultMsg, setResultMsg] = useState("");
  const [resultWon, setResultWon] = useState(false);
  const [pnl, setPnl] = useState(0);
  const [streak, setStreak] = useState(0);
  const [totalTrades, setTotalTrades] = useState(0);
  const [wins, setWins] = useState(0);
  const [priceChange, setPriceChange] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Initial price fetch + chart seed
  const initPrice = useCallback(async () => {
    setLoading(true);
    setError(false);
    const p = await fetchSolPrice();
    if (!p) { setError(true); setLoading(false); return; }
    setPrice(p);
    setCandles(generateCandles(p, CANDLE_COUNT));
    setLoading(false);
  }, []);

  useEffect(() => { initPrice(); }, [initPrice]);

  // Live price polling
  useEffect(() => {
    if (loading || error) return;
    const poll = async () => {
      const p = await fetchSolPrice();
      if (!p) return;
      setPriceChange(prev => prev === null ? null : p - (price ?? p));
      setPrice(p);
      setCandles(prev => addLiveCandle(prev, p));
    };
    pollRef.current = setInterval(poll, POLL_INTERVAL);
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, [loading, error, price]);

  // Countdown timer
  useEffect(() => {
    if (phase !== "countdown") return;
    setTimeLeft(GAME_DURATION);
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          resolveGame();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [phase]);

  const resolveGame = useCallback(async () => {
    const finalPrice = await fetchSolPrice();
    const fp = finalPrice ?? price ?? 0;
    const ep = entryPrice ?? fp;
    const moved = fp - ep;
    const won =
      (prediction === "up" && moved > 0) ||
      (prediction === "down" && moved < 0) ||
      (moved === 0 ? false : false);

    const profit = won ? Math.floor(bet * PAYOUT_MULT) - bet : -bet;
    setBalance(b => Math.max(0, b + profit));
    setPnl(profit);
    setResultWon(won);
    setTotalTrades(t => t + 1);
    if (won) {
      setWins(w => w + 1);
      setStreak(s => s + 1);
      setResultMsg(`+$${Math.abs(profit)} USDC — Correct! Price moved ${moved >= 0 ? "UP" : "DOWN"} to $${fp.toFixed(2)}`);
    } else {
      setStreak(0);
      setResultMsg(`-$${Math.abs(profit)} USDC — Wrong! Price moved ${moved >= 0 ? "UP" : "DOWN"} to $${fp.toFixed(2)}`);
    }
    if (fp) { setPrice(fp); setCandles(prev => addLiveCandle(prev, fp)); }
    setPhase("result");
  }, [prediction, entryPrice, price, bet]);

  const startGame = (dir: Prediction) => {
    if (balance < bet) return;
    setPrediction(dir);
    setEntryPrice(price);
    setPhase("countdown");
  };

  const reset = () => {
    setPrediction(null);
    setEntryPrice(null);
    setPhase("idle");
    setResultMsg("");
    setTimeLeft(GAME_DURATION);
  };

  const winRate = totalTrades > 0 ? Math.round((wins / totalTrades) * 100) : 0;
  const timerPct = (timeLeft / GAME_DURATION) * 100;
  const timerColor = timeLeft <= 10 ? "#f04c68" : timeLeft <= 20 ? "#f0a030" : "#00e5b0";
  const priceColor = (priceChange ?? 0) >= 0 ? "text-[#00e5b0]" : "text-[#f04c68]";

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Top bar */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-primary" data-testid="button-back-home">
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back</span>
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <img src={logoPath} alt="TradeX" className="h-7 w-7 object-contain" />
              <span className="font-bold text-sm bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                TRADEX GAME
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a href={`https://jup.ag/tokens/${SOL_MINT}`} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-border/50 bg-card text-xs text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
              data-testid="link-jup-token">
              <img src="https://jup.ag/favicon.ico" alt="Jupiter" className="w-3 h-3 rounded-full" />
              <span>Live on Jupiter</span>
            </a>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-border/50">
              <DollarSign className="w-3.5 h-3.5 text-primary" />
              <span className="font-mono font-bold text-sm">{balance.toLocaleString()}</span>
              <span className="text-xs text-muted-foreground">USDC</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6 max-w-3xl">
        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: "Win Rate", value: `${winRate}%`, icon: <Trophy className="w-3.5 h-3.5 text-yellow-400" /> },
            { label: "Streak", value: `${streak}x`, icon: <Zap className="w-3.5 h-3.5 text-primary" /> },
            { label: "Trades", value: totalTrades, icon: <RefreshCw className="w-3.5 h-3.5 text-secondary" /> },
          ].map((s) => (
            <div key={s.label} className="bg-card border border-border/50 rounded-xl p-3 flex items-center gap-2.5">
              {s.icon}
              <div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="font-bold text-sm font-mono">{s.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Chart card */}
        <div className="bg-card border border-border/50 rounded-2xl overflow-hidden mb-4">
          {/* Chart header */}
          <div className="flex items-center justify-between px-4 pt-4 pb-2 border-b border-border/30">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#00e5b0] animate-pulse" />
              <span className="text-xs font-mono text-muted-foreground">SOL/USD · 1m · jup.ag</span>
            </div>
            <div className="flex items-center gap-3">
              {price && (
                <span className={`text-xs font-mono ${priceColor}`}>
                  {(priceChange ?? 0) >= 0 ? "▲" : "▼"} {Math.abs(priceChange ?? 0).toFixed(3)}
                </span>
              )}
              <span className="text-lg font-black font-mono">
                {loading ? "—" : price ? `$${price.toFixed(2)}` : "N/A"}
              </span>
            </div>
          </div>

          {/* Candlestick chart */}
          <div className="px-2 pt-2" style={{ height: 230 }}>
            {loading ? (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm gap-2">
                <RefreshCw className="w-4 h-4 animate-spin" /> Fetching live price…
              </div>
            ) : error ? (
              <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                <p className="text-muted-foreground text-sm">Failed to fetch price from Jupiter.</p>
                <Button size="sm" variant="outline" onClick={initPrice}>Retry</Button>
              </div>
            ) : (
              <CandlestickChart candles={candles} prediction={phase === "countdown" ? prediction : null} />
            )}
          </div>

          {/* Volume bars */}
          {!loading && !error && (
            <div className="px-2 pb-2">
              <VolumeBars candles={candles} />
            </div>
          )}
        </div>

        {/* Timer bar (only during countdown) */}
        <AnimatePresence>
          {phase === "countdown" && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="mb-4 bg-card border border-border/50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" style={{ color: timerColor }} />
                  <span className="text-sm font-medium">
                    Predicting{" "}
                    <span style={{ color: prediction === "up" ? "#00e5b0" : "#f04c68" }} className="font-bold uppercase">
                      {prediction}
                    </span>{" "}
                    from ${entryPrice?.toFixed(2)}
                  </span>
                </div>
                <span className="font-mono font-black text-xl" style={{ color: timerColor }}>
                  {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:{String(timeLeft % 60).padStart(2, "0")}
                </span>
              </div>
              <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full transition-colors duration-300"
                  style={{ width: `${timerPct}%`, background: timerColor }}
                  animate={{ width: `${timerPct}%` }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result card */}
        <AnimatePresence>
          {phase === "result" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`mb-4 rounded-2xl p-5 border-2 ${resultWon ? "bg-[#00e5b0]/10 border-[#00e5b0]/60" : "bg-[#f04c68]/10 border-[#f04c68]/60"}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-black text-2xl" style={{ color: resultWon ? "#00e5b0" : "#f04c68" }}>
                    {resultWon ? "CORRECT!" : "WRONG!"}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">{resultMsg}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono font-black text-2xl" style={{ color: resultWon ? "#00e5b0" : "#f04c68" }}>
                    {pnl >= 0 ? "+" : ""}{pnl} USDC
                  </p>
                  <p className="text-xs text-muted-foreground">Balance: {balance} USDC</p>
                </div>
              </div>
              <Button className="w-full mt-4 bg-card border border-border/50 hover:bg-background text-foreground" onClick={reset}>
                Play Again
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main game panel */}
        {phase === "idle" && !loading && !error && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border/50 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-bold text-base">Predict Up or Down?</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#f04c68] animate-pulse" />
                  <span className="text-xs text-muted-foreground font-mono">{GAME_DURATION}s · Live</span>
                </div>
              </div>
              <a href={`https://jup.ag/tokens/${SOL_MINT}`} target="_blank" rel="noopener noreferrer"
                className="text-xs text-primary hover:underline flex items-center gap-1">
                <img src="https://jup.ag/favicon.ico" alt="" className="w-3 h-3 rounded-full" />
                Trade real on Jupiter
              </a>
            </div>

            {/* Bet amount selector */}
            <div className="mb-4">
              <p className="text-xs text-muted-foreground mb-2">Bet Amount (virtual USDC)</p>
              <div className="flex gap-2 flex-wrap">
                {BET_OPTIONS.map(b => (
                  <button
                    key={b}
                    onClick={() => setBet(b)}
                    disabled={b > balance}
                    data-testid={`button-bet-${b}`}
                    className={`px-3 py-1.5 rounded-lg text-sm font-mono font-bold border transition-all ${
                      bet === b
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background border-border/50 text-muted-foreground hover:border-primary/50 hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed"
                    }`}
                  >
                    ${b}
                  </button>
                ))}
              </div>
            </div>

            {/* Payout info */}
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-5 px-1">
              <span>Bet: <span className="text-foreground font-mono font-bold">${bet}</span></span>
              <span>Win: <span className="text-[#00e5b0] font-mono font-bold">+${Math.floor(bet * PAYOUT_MULT) - bet}</span></span>
              <span>Payout: <span className="text-foreground font-mono">{PAYOUT_MULT}x</span></span>
            </div>

            {/* Up / Down buttons */}
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => startGame("up")}
                disabled={balance < bet}
                data-testid="button-predict-up"
                className="flex items-center justify-center gap-2 h-14 rounded-xl font-black text-lg border-2 border-[#00e5b0] bg-[#00e5b0]/15 text-[#00e5b0] hover:bg-[#00e5b0]/25 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ boxShadow: "0 0 20px rgba(0,229,176,0.2)" }}
              >
                <TrendingUp className="w-5 h-5" />
                UP
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => startGame("down")}
                disabled={balance < bet}
                data-testid="button-predict-down"
                className="flex items-center justify-center gap-2 h-14 rounded-xl font-black text-lg border-2 border-[#f04c68] bg-[#f04c68]/15 text-[#f04c68] hover:bg-[#f04c68]/25 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ boxShadow: "0 0 20px rgba(240,76,104,0.2)" }}
              >
                <TrendingDown className="w-5 h-5" />
                DOWN
              </motion.button>
            </div>

            {balance === 0 && (
              <p className="text-center text-xs text-muted-foreground mt-3">
                Out of balance.{" "}
                <button onClick={() => setBalance(1000)} className="text-primary underline">Refill $1000</button>
              </p>
            )}
          </motion.div>
        )}

        {/* Disclaimer */}
        <p className="text-center text-xs text-muted-foreground mt-5 leading-relaxed">
          Simulation only — virtual USDC, no real funds at risk.
          Price data from{" "}
          <a href="https://jup.ag" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            Jupiter
          </a>.
          {" "}
          <a href={`https://jup.ag/tokens/${SOL_MINT}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            Trade real SOL on Jupiter →
          </a>
        </p>
      </main>
    </div>
  );
}
