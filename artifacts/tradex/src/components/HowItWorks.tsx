import { motion } from "framer-motion";
import { Wallet, ScanLine, Route, CheckCircle2 } from "lucide-react";

const steps = [
  {
    icon: Wallet,
    num: "01",
    title: "Connect your wallet",
    detail: "Non-custodial. tradexeasy never holds your keys. Phantom, Backpack, Solflare — any Solana wallet connects in one click.",
    terminal: "> wallet.connect({ provider: 'phantom' })\n✓ Connected: 7xKp...f3Wd\n✓ Balance: 12.4 SOL",
  },
  {
    icon: ScanLine,
    num: "02",
    title: "Scan live order books",
    detail: "Real-time depth data from Jupiter, Raydium, and Orca simultaneously. Spot the tightest spread before entering.",
    terminal: "> market.scan('SOL/USDC')\n  bid  68.441  ██████████  1,240 SOL\n  ask  68.443  ████████    980 SOL\n  spread: 0.002 USDC",
  },
  {
    icon: Route,
    num: "03",
    title: "Preview your route",
    detail: "tradexeasy simulates the split across every pool and shows you exact output before you sign. No surprise slippage.",
    terminal: "> route.preview({ in: '100 SOL' })\n  → Orca    42%  out: 2,877.2 USDC\n  → Jupiter 33%  out: 2,253.0 USDC\n  → Raydium 25%  out: 1,711.2 USDC\n  total: 6,841.4 USDC  slippage: 0.03%",
  },
  {
    icon: CheckCircle2,
    num: "04",
    title: "Sign once, confirmed on-chain",
    detail: "One wallet signature. tradexeasy bundles the full split route into a single transaction. Average confirmation: 400ms.",
    terminal: "> tx.send(bundle)\n  sig: 5tYm...nX9k\n  slot: 338,241,904\n✓ Confirmed in 412ms",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 relative overflow-hidden" id="how">
      <div className="absolute top-0 left-0 w-1/3 h-full bg-primary/3 blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          <div className="lg:sticky lg:top-36">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Execution flow</p>
            <h2 className="text-3xl md:text-5xl font-black leading-tight mb-6">
              Your first trade<br />in under 60s.
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Four steps. One wallet signature. The rest is tradexeasy routing your capital to the best available price across the entire Solana DEX ecosystem.
            </p>
            <div className="flex items-center gap-3 text-sm text-muted-foreground border border-border/50 bg-card rounded-xl px-4 py-3 w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Average execution time: <span className="font-bold text-foreground ml-1">412ms</span>
            </div>
          </div>

          <div className="relative flex flex-col gap-0">
            <div className="absolute left-5 top-8 bottom-8 w-px bg-border/40" />

            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className="relative pl-16 pb-10 last:pb-0"
                >
                  <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-card border-2 border-primary/40 flex items-center justify-center z-10">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>

                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold text-muted-foreground/40 font-mono">{step.num}</span>
                    <h3 className="font-black text-lg">{step.title}</h3>
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{step.detail}</p>

                  <div className="bg-background rounded-xl border border-border/50 p-4 font-mono text-xs text-muted-foreground/80 whitespace-pre-line">
                    {step.terminal}
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
