import { useState, useEffect } from "react";
import { Link } from "wouter";
import { SiX } from "react-icons/si";
import { Menu, X, Wallet, Rocket } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import logoPath from "@/assets/tradexeasy-logo.png";

const navLinks = [
  { name: "Home", href: "#" },
  { name: "Markets", href: "#markets" },
  { name: "Features", href: "#features" },
  { name: "Game", href: "/game" },
  { name: "About", href: "#about" },
  { name: "Legal", href: "#legal" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      if (menuOpen) setMenuOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          scrolled || menuOpen
            ? "bg-background/95 backdrop-blur-md border-border/50 shadow-sm"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group" onClick={closeMenu}>
            <img
              src={logoPath}
              alt="tradexeasy Logo"
              className="h-10 w-auto object-contain group-hover:scale-105 transition-transform"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
              link.href.startsWith("/") ? (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              )
            )}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-2">
            <a href="https://x.com/TradeXeasy" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="border-border/50 bg-background/50 hover:bg-card hover:text-primary gap-2" data-testid="button-follow-x">
                <SiX className="w-4 h-4" />
                <span>@TradeXeasy</span>
              </Button>
            </a>
            <a href="https://jup.ag/" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="border-border/50 bg-background/50 hover:bg-card hover:text-primary gap-2" data-testid="button-wallet">
                <Wallet className="w-4 h-4" />
                <span>Jupiter</span>
              </Button>
            </a>
            <a href="https://kickstart.easya.io/" target="_blank" rel="noopener noreferrer">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 box-glow-primary gap-2" data-testid="button-launch-app">
                <Rocket className="w-4 h-4" />
                Launch App
              </Button>
            </a>
          </div>

          {/* Mobile: Launch App + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <a href="https://kickstart.easya.io/" target="_blank" rel="noopener noreferrer">
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 box-glow-primary text-xs px-3" data-testid="button-launch-app-mobile">
                Launch App
              </Button>
            </a>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              data-testid="button-hamburger"
              className="w-10 h-10 flex items-center justify-center rounded-lg border border-border/50 bg-background/50 text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm md:hidden"
              onClick={closeMenu}
            />

            <motion.div
              key="drawer"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="fixed top-20 left-0 right-0 z-40 md:hidden bg-background/97 backdrop-blur-md border-b border-border/50 shadow-xl"
            >
              <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.18 }}
                  >
                    {link.href.startsWith("/") ? (
                      <Link
                        href={link.href}
                        onClick={closeMenu}
                        className="flex items-center h-12 px-3 rounded-lg text-base font-medium text-muted-foreground hover:text-primary hover:bg-card transition-colors"
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        onClick={closeMenu}
                        className="flex items-center h-12 px-3 rounded-lg text-base font-medium text-muted-foreground hover:text-primary hover:bg-card transition-colors"
                      >
                        {link.name}
                      </a>
                    )}
                  </motion.div>
                ))}
              </nav>

              <div className="border-t border-border/40 mx-4" />

              <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
                <a href="https://x.com/TradeXeasy" target="_blank" rel="noopener noreferrer" onClick={closeMenu}>
                  <Button variant="outline" className="w-full border-border/50 bg-background/50 hover:bg-card hover:text-primary gap-2 justify-center" data-testid="button-follow-x-mobile">
                    <SiX className="w-4 h-4" />
                    @TradeXeasy di X
                  </Button>
                </a>
                <a href="https://jup.ag/" target="_blank" rel="noopener noreferrer" onClick={closeMenu}>
                  <Button variant="outline" className="w-full border-border/50 bg-background/50 hover:bg-card hover:text-primary gap-2 justify-center" data-testid="button-wallet-mobile">
                    <Wallet className="w-4 h-4" />
                    Buka Jupiter Wallet
                  </Button>
                </a>
                <a href="https://kickstart.easya.io/" target="_blank" rel="noopener noreferrer" onClick={closeMenu}>
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2 justify-center" data-testid="button-launch-app-drawer">
                    <Rocket className="w-4 h-4" />
                    Launch App
                  </Button>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
