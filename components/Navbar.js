import Link from "next/link";
import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import { Menu, X, Search, ShoppingBag } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/50 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X strokeWidth={1.5} /> : <Menu strokeWidth={1.5} />}
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8 text-sm uppercase tracking-widest">
          <Link href="/sklep" className="hover:opacity-60 transition-opacity">
            Sklep
          </Link>
          <Link href="/o-nas" className="hover:opacity-60 transition-opacity">
            O nas
          </Link>
        </nav>

        {/* Logo */}
        <Link href="/" className="text-2xl font-serif font-semibold tracking-wide absolute left-1/2 -translate-x-1/2">
          SANDEY.
        </Link>

        {/* Right Nav */}
        <div className="flex items-center space-x-4 md:space-x-6">
          <ThemeToggle />
          <button aria-label="Search" className="hidden md:block hover:opacity-60 transition-opacity">
            <Search size={20} strokeWidth={1.5} />
          </button>
          <button aria-label="Cart" className="hover:opacity-60 transition-opacity relative">
            <ShoppingBag size={20} strokeWidth={1.5} />
            <span className="absolute -top-1 -right-2 text-[10px] bg-foreground text-background w-4 h-4 rounded-full flex items-center justify-center">
              0
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background border-b border-border py-4 px-6 shadow-xl flex flex-col space-y-4 text-sm uppercase tracking-widest">
          <Link href="/sklep" onClick={() => setMobileMenuOpen(false)}>
            Sklep
          </Link>
          <Link href="/kategorie/Nowości" onClick={() => setMobileMenuOpen(false)}>
            Nowości
          </Link>
          <Link href="/o-nas" onClick={() => setMobileMenuOpen(false)}>
            O nas
          </Link>
          <Link href="/kontakt" onClick={() => setMobileMenuOpen(false)}>
            Kontakt
          </Link>
        </div>
      )}
    </header>
  );
}
