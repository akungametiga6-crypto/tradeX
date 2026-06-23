import { motion } from "framer-motion";

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
              tradexeasy was born from frustration. Retail tools were too slow, and institutional platforms were gatekept. We built the bridge.
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
            <div className="relative rounded-2xl overflow-hidden border border-border/50 bg-card p-10 flex flex-col items-center justify-center min-h-[320px] gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-4xl font-black text-primary-foreground">
                T
              </div>
              <div className="text-center">
                <p className="text-xl font-black mb-1">tradexeasy</p>
                <p className="text-muted-foreground text-sm">Intelligent crypto trading platform</p>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/50 text-primary text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                Lead Engineer / Founder
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
