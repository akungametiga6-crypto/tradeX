import { motion } from "framer-motion";
import { Activity, Bell, Network, PieChart, ShieldAlert, BrainCircuit } from "lucide-react";

const features = [
  {
    title: "Real-time Market Data",
    description: "Millisecond-level precision data streams directly from top exchanges and on-chain RPCs.",
    icon: Activity,
    color: "text-primary"
  },
  {
    title: "Smart Signal Alerts",
    description: "Customizable push notifications for volume spikes, whale movements, and technical breakouts.",
    icon: Bell,
    color: "text-secondary"
  },
  {
    title: "Multi-chain DEX Aggregation",
    description: "Trade across Solana, Ethereum, Base, and more with optimal routing and minimal slippage.",
    icon: Network,
    color: "text-accent"
  },
  {
    title: "Portfolio Analytics",
    description: "Deep insights into your PnL, win rate, and historical performance with beautiful charts.",
    icon: PieChart,
    color: "text-primary"
  },
  {
    title: "Risk Management Tools",
    description: "Advanced stop-loss, take-profit, and trailing stops to protect your downside automatically.",
    icon: ShieldAlert,
    color: "text-secondary"
  },
  {
    title: "AI-powered Insights",
    description: "Machine learning algorithms that detect pattern formations and sentiment shifts before they happen.",
    icon: BrainCircuit,
    color: "text-accent"
  }
];

export default function Features() {
  return (
    <section className="py-24 relative" id="features">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Precision Trading Tools</h2>
          <p className="text-lg text-muted-foreground">Everything you need to analyze, execute, and manage positions like an institution.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-6 rounded-xl bg-card border border-border/50 hover:border-primary/50 transition-all hover:box-glow-primary/10 cursor-default"
              >
                <div className={`w-12 h-12 rounded-lg bg-background flex items-center justify-center mb-6 border border-border/50 group-hover:scale-110 transition-transform ${feature.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
