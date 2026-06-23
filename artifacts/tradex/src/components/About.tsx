import { motion } from "framer-motion";
import profilePath from "@assets/IMG-20260623-WA0001_1782194174373.jpg";

export default function About() {
  return (
    <section className="py-24 bg-card border-y border-border/30" id="about">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Built by Traders,<br />For Traders.</h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              TradeX was born from frustration. Retail tools were too slow, and institutional platforms were gatekept. We built the bridge.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Our mission is to democratize elite trading intelligence. We process millions of data points per second to give you the exact insights you need, exactly when you need them.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="text-4xl font-black text-primary mb-2">250K+</h4>
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Active Traders</p>
              </div>
              <div>
                <h4 className="text-4xl font-black text-secondary mb-2">$12B+</h4>
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Volume Tracked</p>
              </div>
              <div>
                <h4 className="text-4xl font-black text-accent mb-2">99.99%</h4>
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Uptime</p>
              </div>
              <div>
                <h4 className="text-4xl font-black text-primary mb-2">8</h4>
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Chains Supported</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-[60px] pointer-events-none" />
            <div className="relative rounded-2xl overflow-hidden border border-border/50 bg-background">
              <img 
                src={profilePath} 
                alt="TradeX Persona" 
                className="w-full h-auto object-cover opacity-80 mix-blend-luminosity grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background to-transparent">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/50 text-primary text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                  Lead Engineer / Founder
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
