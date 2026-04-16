import { NextSeo } from "next-seo";
import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  return (
    <>
      <NextSeo 
        title="O Nas"
        description="Historia i filozofia marki SANDEY."
      />
      <div className="container mx-auto px-6 py-16 mt-8 max-w-4xl text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-serif mb-12"
        >
          O nas.
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="relative w-full aspect-video mb-16"
        >
          <Image 
            src="https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=2070&auto=format&fit=crop" 
            alt="Atelier" 
            fill 
            className="object-cover rounded-sm grayscale opacity-80"
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-foreground/80 leading-relaxed mx-auto max-w-2xl space-y-6"
        >
          <p>
            SANDEY narodziło się z potrzeby redukcji szumu. W świecie szybkiej mody poszukiwaliśmy ciszy, precyzji i ponadczasowej elegancji.
          </p>
          <p>
            Nasze kolekcje to powrót do rzemiosła. Odrzucamy to, co tymczasowe, skupiając się na minimalistycznych formach i najwyższej jakości materiałach, sprowadzanych z jedwabnych tkalni w Como i szetlandzkich przędzalni.
          </p>
          <p className="font-serif text-2xl pt-8">
            &quot;Mniej, ale lepiej.&quot;
          </p>
        </motion.div>
      </div>
    </>
  );
}
