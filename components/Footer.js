import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-background pt-24 pb-12 text-sm border-t border-border/50">
      <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
        
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="text-3xl font-serif font-bold tracking-widest block mb-6 text-foreground">
            VELOUR
          </Link>
          <p className="text-foreground/50 max-w-sm tracking-wide font-sans text-xs leading-relaxed">
            Ekskluzywny magazyn digitalowy i butik. Nowoczesne rzemiosło w służbie absolutnego minimalizmu.
          </p>
        </div>
        
        <div>
          <h4 className="text-[10px] uppercase font-sans font-medium tracking-[0.2em] mb-6 text-foreground/60">Kolekcje</h4>
          <ul className="space-y-4 text-xs font-sans tracking-wide text-foreground/80">
            <li><Link href="/kategorie/Kobieta" className="hover:text-foreground transition-colors">Kobieta</Link></li>
            <li><Link href="/kategorie/Mężczyzna" className="hover:text-foreground transition-colors">Mężczyzna</Link></li>
            <li><Link href="/kategorie/Biżuteria" className="hover:text-foreground transition-colors">Biżuteria</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] uppercase font-sans font-medium tracking-[0.2em] mb-6 text-foreground/60">Eksploruj</h4>
          <ul className="space-y-4 text-xs font-sans tracking-wide text-foreground/80">
            <li><Link href="/o-nas" className="hover:text-foreground transition-colors">O nas</Link></li>
            <li><Link href="/kontakt" className="hover:text-foreground transition-colors">Kontakt</Link></li>
          </ul>
        </div>

      </div>

      <div className="container mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between text-[10px] font-sans tracking-[0.1em] text-foreground/40 uppercase border-t border-border/30 pt-8">
        <p>&copy; {new Date().getFullYear()} VELOUR. Wszelkie prawa zastrzeżone.</p>
        <div className="flex space-x-8 mt-4 md:mt-0">
          <Link href="/polityka" className="hover:text-foreground transition-colors">Polityka</Link>
          <Link href="/regulamin" className="hover:text-foreground transition-colors">Regulamin</Link>
        </div>
      </div>
    </footer>
  );
}
