import Link from "next/link";
import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import { User, ShoppingBag } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
        scrolled
          ? "bg-background/70 backdrop-blur-xl py-4 border-b border-border/30 shadow-sm"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
        
        {/* Left: Logo */}
        <Link href="/" className="text-2xl font-serif font-bold tracking-widest text-foreground">
          VELOUR
        </Link>

        {/* Right: Menu & Icons */}
        <div className="flex items-center space-x-10">
          <nav className="hidden md:flex items-center space-x-8 text-[10px] uppercase font-sans font-medium tracking-[0.2em] text-foreground/80">
            <Link href="/kategorie/Kobieta" className="hover:text-foreground hover:opacity-100 transition-opacity">Kobieta</Link>
            <Link href="/kategorie/Mężczyzna" className="hover:text-foreground hover:opacity-100 transition-opacity">Mężczyzna</Link>
            <Link href="/kategorie/Biżuteria" className="hover:text-foreground hover:opacity-100 transition-opacity">Biżuteria</Link>
          </nav>

          <div className="flex items-center space-x-6 text-foreground/80">
            <ThemeToggle />
            <button aria-label="Profile" className="hover:text-foreground transition-colors">
              <User size={18} strokeWidth={1.2} />
            </button>
            <button aria-label="Cart" className="hover:text-foreground transition-colors relative">
              <ShoppingBag size={18} strokeWidth={1.2} />
              <span className="absolute -top-1 -right-2 text-[9px] bg-foreground text-background w-3.5 h-3.5 rounded-full flex items-center justify-center font-medium">
                0
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
