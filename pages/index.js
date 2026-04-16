import { NextSeo } from "next-seo";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { getProducts } from "../lib/shopify";
import MagneticButton from "../components/MagneticButton";
import ProductCard from "../components/ProductCard";
import { useRef } from "react";

export default function Home({ featuredProducts }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
      <NextSeo 
        title="Home"
        description="Discover quiet luxury and minimalist premium fashion."
      />

      {/* Hero Section */}
      <section ref={containerRef} className="relative h-screen w-full flex overflow-hidden">
        <motion.div 
          style={{ y, opacity }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
            alt="Hero Background"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>
        
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-white text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="uppercase tracking-[0.3em] text-xs font-medium mb-6"
          >
            Kolekcja Wiosna / Lato
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif mb-10 max-w-4xl leading-tight"
          >
            Sztuka minimalizmu.
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link href="/sklep">
              <MagneticButton className="bg-white text-black px-10 py-4 uppercase tracking-widest text-xs hover:bg-white/90">
                Odkryj Kolekcję
              </MagneticButton>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-32 px-6 container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-serif mb-4">Nowości</h2>
            <p className="text-foreground/60 max-w-sm">
              Wyselekcjonowane elementy zaprojektowane z myślą o trwałości, komforcie i bezkompromisowej estetyce.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-6 md:mt-0"
          >
            <Link href="/sklep" className="border-b border-foreground pb-1 uppercase tracking-widest text-xs font-medium hover:opacity-70 transition-opacity">
              Zobacz wszystko
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Brand Philosophy */}
      <section className="py-32 bg-foreground text-background">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-2xl md:text-4xl font-serif leading-relaxed"
          >
            &quot;Wierzymy, że luksus to nie krzykliwe logotypy, lecz jakość materiału, perfekcja cięcia i szacunek do rzemiosła.&quot;
          </motion.h3>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-12"
          >
            <Link href="/o-nas">
              <MagneticButton className="border border-background px-8 py-3 text-xs uppercase tracking-widest hover:bg-background hover:text-foreground">
                Nasza Historia
              </MagneticButton>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const products = await getProducts();
  const featuredProducts = products.slice(0, 4);

  return {
    props: {
      featuredProducts,
    },
  };
}
