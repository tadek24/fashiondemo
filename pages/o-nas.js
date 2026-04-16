import { NextSeo } from "next-seo";
import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  return (
    <>
      <NextSeo 
        title="O Nas | VELOUR"
        description="Filozofia i wizja stojąca za magazynem mody VELOUR."
      />
      <div className="container mx-auto px-6 lg:px-12 py-32 mt-12 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl font-serif font-light mb-12 leading-tight">
              Odrzucenie<br />
              Szumu.
            </h1>
            <div className="text-sm font-sans text-foreground/70 leading-loose space-y-8 max-w-sm">
              <p>
                VELOUR to powrót do absolutnego umiaru. W zgiełku tymczasowych trendów wybieramy rzemiosło, ciszę i precyzję.
              </p>
              <p>
                Nasze edytoriale stanowią próbę uchwycenia piękna w najczystszej postaci. Odrzucamy nadmiar, celebrujemy formę.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="relative w-full aspect-[3/4]"
          >
            <Image 
              src="https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=1500&auto=format&fit=crop" 
              alt="Atelier" 
              fill 
              className="object-cover grayscale"
            />
          </motion.div>
        </div>
      </div>
    </>
  );
}
