import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, ChevronRight, Zap, TrendingUp, Shield, HelpCircle } from "lucide-react";

interface Message {
  id: string;
  role: "agent" | "user";
  text: string;
  time: string;
}

const QUICK_ACTIONS = [
  { icon: Zap, label: "How to start trading?" },
  { icon: TrendingUp, label: "What coins are trending?" },
  { icon: Shield, label: "Is my wallet safe?" },
  { icon: HelpCircle, label: "How does the game work?" },
];

const AGENT_RESPONSES: Record<string, string> = {
  "How to start trading?":
    "Getting started on tradexeasy is simple! Click **Play Now — Free** on the homepage to jump into our trading simulation. No sign-up needed. Practice with virtual funds, learn the ropes, and when you're ready — connect your wallet for live trades across 8 chains.",
  "What coins are trending?":
    "Right now our platform is tracking top movers on Solana, Ethereum, BNB Chain, and more. Check the **Market Rankings** section on the homepage for live price feeds updated every second. We pull data directly from Jupiter, Birdeye, and on-chain sources with sub-100ms latency.",
  "Is my wallet safe?":
    "Absolutely. tradexeasy is **non-custodial** — we never hold your funds. You connect your own wallet (Phantom, MetaMask, etc.) and sign every transaction yourself. Our platform only reads on-chain data. Your keys, your coins — always.",
  "How does the game work?":
    "The trading game gives you **virtual funds** to practice real strategies in live market conditions. Buy and sell real tokens, track your P&L, and compete for top returns — all risk-free. It's the best way to sharpen your skills before going live.",
};

function getTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function generateResponse(text: string): string {
  const lower = text.toLowerCase();
  if (lower.includes("start") || lower.includes("begin") || lower.includes("how to trade"))
    return AGENT_RESPONSES["How to start trading?"];
  if (lower.includes("trend") || lower.includes("coin") || lower.includes("price") || lower.includes("market"))
    return AGENT_RESPONSES["What coins are trending?"];
  if (lower.includes("safe") || lower.includes("wallet") || lower.includes("secure") || lower.includes("fund"))
    return AGENT_RESPONSES["Is my wallet safe?"];
  if (lower.includes("game") || lower.includes("play") || lower.includes("simulation"))
    return AGENT_RESPONSES["How does the game work?"];
  if (lower.includes("fee") || lower.includes("cost") || lower.includes("free"))
    return "tradexeasy is **free to use**. The trading simulation has zero fees. For live trades, you only pay standard on-chain gas fees — we don't charge any platform fee on top.";
  if (lower.includes("chain") || lower.includes("network") || lower.includes("blockchain"))
    return "We support **8 chains** including Solana, Ethereum, BNB Chain, Arbitrum, Optimism, Base, Polygon, and Avalanche. You can trade native tokens and popular DeFi assets across all of them from one interface.";
  if (lower.includes("contact") || lower.includes("support") || lower.includes("help"))
    return "Our team is here for you! Reach us on **Telegram** or **Twitter/X** — links are in the footer. For urgent issues, join our community Discord where moderators are active 24/7.";
  return "Great question! tradexeasy is built to make crypto trading accessible for everyone — from first-timers to pro traders. Is there something specific I can help you with? Try asking about getting started, market data, wallet safety, or the trading game.";
}

export default function LiveAgent() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "agent",
      text: "Hi! I'm your tradexeasy Live Agent. I'm here to help you trade smarter and easier. What can I help you with today?",
      time: getTime(),
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
    }
  }, [messages, open]);

  function sendMessage(text: string) {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", text: text.trim(), time: getTime() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const reply = generateResponse(text);
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "agent", text: reply, time: getTime() },
      ]);
      setTyping(false);
    }, 900 + Math.random() * 400);
  }

  function handleQuick(label: string) {
    sendMessage(label);
    const response = AGENT_RESPONSES[label];
    if (!response) return;
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 340, damping: 30 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[min(360px,calc(100vw-2rem))] flex flex-col rounded-2xl border border-border/60 bg-card shadow-2xl overflow-hidden"
            style={{ maxHeight: "min(520px, 80vh)" }}
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border/50 bg-background/80 backdrop-blur-md shrink-0">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-primary border-2 border-background" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold leading-none">tradexeasy Agent</p>
                <p className="text-xs text-primary mt-0.5 flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-primary animate-pulse inline-block" />
                  Live · Always on
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-0">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  {msg.role === "agent" && (
                    <div className="w-7 h-7 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                  )}
                  <div className={`max-w-[82%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                    <div
                      className={`px-3 py-2 rounded-xl text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground rounded-tr-sm"
                          : "bg-muted text-foreground rounded-tl-sm"
                      }`}
                      dangerouslySetInnerHTML={{
                        __html: msg.text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                      }}
                    />
                    <span className="text-[10px] text-muted-foreground/60 px-1">{msg.time}</span>
                  </div>
                </div>
              ))}

              {typing && (
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="px-3 py-2.5 rounded-xl rounded-tl-sm bg-muted flex items-center gap-1">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {messages.length === 1 && !typing && (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  {QUICK_ACTIONS.map(({ icon: Icon, label }) => (
                    <button
                      key={label}
                      onClick={() => handleQuick(label)}
                      className="flex items-start gap-2 p-2.5 rounded-xl border border-border/50 bg-background/60 hover:border-primary/40 hover:bg-primary/5 transition-all text-left group"
                    >
                      <Icon className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                      <span className="text-[11px] text-muted-foreground group-hover:text-foreground leading-tight transition-colors">{label}</span>
                    </button>
                  ))}
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            <div className="px-3 pb-3 shrink-0 border-t border-border/30 pt-3">
              <div className="flex items-center gap-2 bg-background rounded-xl border border-border/50 px-3 py-2 focus-within:border-primary/50 transition-colors">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/50 min-w-0"
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || typing}
                  className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-primary-foreground disabled:opacity-40 hover:bg-primary/90 transition-colors shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-center text-[10px] text-muted-foreground/40 mt-2">Powered by tradexeasy · Always free</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-4 sm:right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-xl box-glow-primary flex items-center justify-center"
        aria-label="Open live agent"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X className="w-6 h-6" />
            </motion.span>
          ) : (
            <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle className="w-6 h-6" />
            </motion.span>
          )}
        </AnimatePresence>
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-400 border-2 border-background animate-pulse" />
        )}
      </motion.button>
    </>
  );
}
