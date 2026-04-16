import { NextSeo } from "next-seo";
import { motion } from "framer-motion";
import MagneticButton from "../components/MagneticButton";

export default function Contact() {
  return (
    <>
      <NextSeo 
        title="Kontakt"
        description="Skontaktuj się z obsługą butiku premium."
      />
      <div className="container mx-auto px-6 py-16 mt-8 max-w-2xl">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-serif mb-12 text-center"
        >
          Kontakt.
        </motion.h1>

        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-xs uppercase tracking-widest font-medium mb-3">Imię i nazwisko</label>
              <input type="text" className="w-full border-b border-border bg-transparent py-2 focus:outline-none focus:border-foreground transition-colors" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest font-medium mb-3">Adres e-mail</label>
              <input type="email" className="w-full border-b border-border bg-transparent py-2 focus:outline-none focus:border-foreground transition-colors" />
            </div>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest font-medium mb-3">Wiadomość</label>
            <textarea rows="5" className="w-full border-b border-border bg-transparent py-2 focus:outline-none focus:border-foreground transition-colors resize-none"></textarea>
          </div>
          
          <div className="pt-4 flex justify-center">
            <MagneticButton className="bg-foreground text-background px-12 py-4 uppercase tracking-widest text-xs">
              Wyślij wiadomość
            </MagneticButton>
          </div>
        </motion.form>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-24 pt-12 border-t border-border grid grid-cols-1 md:grid-cols-2 gap-8 text-center md:text-left text-sm"
        >
          <div>
            <h3 className="uppercase tracking-widest font-medium mb-4">Obsługa klienta</h3>
            <p className="text-foreground/70">kontakt@sandey.com</p>
            <p className="text-foreground/70">+48 123 456 789</p>
          </div>
          <div>
            <h3 className="uppercase tracking-widest font-medium mb-4">Godziny pracy</h3>
            <p className="text-foreground/70">Poniedziałek - Piątek: 09:00 - 18:00</p>
            <p className="text-foreground/70">Sobota - Niedziella: Zamknięte</p>
          </div>
        </motion.div>
      </div>
    </>
  );
}
