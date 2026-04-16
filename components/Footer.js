import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border pt-16 pb-8 text-sm">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
        <div className="col-span-1 md:col-span-1">
          <Link href="/" className="text-xl font-serif font-semibold tracking-wide block mb-4">
            SANDEY.
          </Link>
          <p className="text-foreground/60 max-w-xs leading-relaxed">
            Quiet luxury for the modern minimalist. Sustainably sourced, ethically crafted.
          </p>
        </div>
        
        <div>
          <h4 className="uppercase tracking-widest font-medium mb-6">Sklep</h4>
          <ul className="space-y-3 text-foreground/70">
            <li><Link href="/kategorie/Nowości" className="hover:text-foreground transition-colors">Nowości</Link></li>
            <li><Link href="/kategorie/Sukienki" className="hover:text-foreground transition-colors">Sukienki</Link></li>
            <li><Link href="/kategorie/Akcesoria" className="hover:text-foreground transition-colors">Akcesoria</Link></li>
            <li><Link href="/kategorie/Kolekcja Premium" className="hover:text-foreground transition-colors">Kolekcja Premium</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="uppercase tracking-widest font-medium mb-6">Marka</h4>
          <ul className="space-y-3 text-foreground/70">
            <li><Link href="/o-nas" className="hover:text-foreground transition-colors">O nas</Link></li>
            <li><Link href="/filozofia" className="hover:text-foreground transition-colors">Nasza Filozofia</Link></li>
            <li><Link href="/zrownowazony-rozwoj" className="hover:text-foreground transition-colors">Zrównoważony rozwój</Link></li>
            <li><Link href="/kontakt" className="hover:text-foreground transition-colors">Kontakt</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="uppercase tracking-widest font-medium mb-6">Newsletter</h4>
          <p className="text-foreground/70 mb-4 leading-relaxed">
            Zapisz się, aby otrzymywać informacje o nowych kolekcjach i wydarzeniach przedsprzedażowych.
          </p>
          <form className="flex border-b border-border pb-2 focus-within:border-foreground transition-colors">
            <input 
              type="email" 
              placeholder="Twój adres e-mail" 
              className="bg-transparent w-full outline-none placeholder:text-foreground/40"
            />
            <button type="submit" className="uppercase tracking-widest font-medium text-xs ml-4">
              Zapisz
            </button>
          </form>
        </div>
      </div>

      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-xs text-foreground/40 border-t border-border pt-8">
        <p>&copy; {new Date().getFullYear()} SANDEY. Wszelkie prawa zastrzeżone.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <Link href="/polityka-prywatnosci" className="hover:text-foreground transition-colors">Polityka prywatności</Link>
          <Link href="/regulamin" className="hover:text-foreground transition-colors">Regulamin</Link>
        </div>
      </div>
    </footer>
  );
}
