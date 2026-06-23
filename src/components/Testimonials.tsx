import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "The multi-chain aggregation is flawless. I've completely abandoned CEXs for my active trading. TradeX's execution speed is unmatched.",
    name: "0xMarcus",
    role: "Prop Trader",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus" // Note: Rule says use initials-based fallbacks or real API, DiceBear is banned. Let's use standard Avatar fallback. Wait, I will use Avatar components from shadcn instead of DiceBear.
  },
  {
    quote: "Finally a terminal that doesn't look like it was built in 2010. The AI sentiment analysis caught the SOL breakout 2 hours before CT.",
    name: "Elena.eth",
    role: "DeFi Analyst",
  },
  {
    quote: "I use the risk management tools daily. Being able to set global trailing stops across 4 different chains from one dashboard is game changing.",
    name: "Kaito",
    role: "Full-time Degem",
  }
];

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Testimonials() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Trusted by the Best</h2>
          <p className="text-muted-foreground text-lg">Don't just take our word for it.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border/50 p-8 rounded-xl relative group hover:border-secondary/50 transition-colors"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-border group-hover:text-secondary/20 transition-colors" />
              <p className="text-lg mb-8 relative z-10">"{t.quote}"</p>
              
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12 border border-border">
                  <AvatarFallback className="bg-primary/10 text-primary font-bold">
                    {t.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-bold">{t.name}</h4>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
