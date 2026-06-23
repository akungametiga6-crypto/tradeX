import { useState, useEffect } from "react";
import { Link } from "wouter";
import { SiX } from "react-icons/si";
import { Button } from "@/components/ui/button";
import logoPath from "@assets/a87c8240-7053-4b07-97aa-3f1afaec6e84_1782194174325.png";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Markets", href: "#markets" },
    { name: "Features", href: "#features" },
    { name: "About", href: "#about" },
    { name: "Legal", href: "#legal" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent ${
        scrolled ? "bg-background/80 backdrop-blur-md border-border/50 shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <img src={logoPath} alt="TradeX Logo" className="h-10 w-10 object-contain group-hover:scale-105 transition-transform" />
          <span className="font-display font-bold text-xl tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            TRADEX
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a href="https://x.com/TradeXeasy" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="hidden sm:flex border-border/50 bg-background/50 hover:bg-card hover:text-primary gap-2" data-testid="button-follow-x">
              <SiX className="w-4 h-4" />
              <span>Follow Founder</span>
            </Button>
          </a>
          <a href="https://kickstart.easya.io/" target="_blank" rel="noopener noreferrer">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 box-glow-primary" data-testid="button-launch-app">
              Launch App
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
}
