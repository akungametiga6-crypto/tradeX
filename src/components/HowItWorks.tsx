import { motion } from "framer-motion";
import { Wallet, LineChart, Zap } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Connect Wallet",
      desc: "Securely link your preferred Web3 wallet. TradeX supports all major providers non-custodially.",
      icon: Wallet
    },
    {
      num: "02",
      title: "Analyze Markets",
      desc: "Use our real-time charting, order book depth, and AI insights to find your edge.",
      icon: LineChart
    },
    {
      num: "03",
      title: "Execute Trades",
      desc: "Deploy capital across multiple chains instantly with optimal routing.",
      icon: Zap
    }
  ];

  return (
    <section className="py-24 bg-card/30 border-y border-border/30 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/5 blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground">From setup to your first trade in under 60 seconds.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line for desktop */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-px bg-border border-dashed" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative flex flex-col items-center text-center"
              >
                <div className="w-24 h-24 rounded-full bg-background border-2 border-primary/30 flex items-center justify-center mb-6 relative z-10 shadow-[0_0_30px_rgba(var(--primary),0.2)]">
                  <Icon className="w-10 h-10 text-primary" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center text-sm">
                    {step.num}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
