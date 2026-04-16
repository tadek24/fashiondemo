import { NextSeo } from "next-seo";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { getProducts } from "../lib/shopify";
import ProductCard from "../components/ProductCard";
import { useRef } from "react";

const TITLE = "VELOUR";

export default function Home({ featuredProducts }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Framer config for splitting letters
  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 }
    }
  };

  const letterVars = {
    hidden: { y: 150, opacity: 0, rotateZ: -10 },
    show: { y: 0, opacity: 1, rotateZ: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <>
      <NextSeo 
        title="VELOUR | Cinematic Showcase"
        description="Demo premium e-commerce udowadniające wyższość technologii Next.js"
      />

      {/* Cinematic Hero Section */}
      <section ref={containerRef} className="relative w-full h-[110vh] bg-background flex flex-col items-center justify-center overflow-hidden">
        
        {/* Massive Overlapping Title - Animated Letter by Letter */}
        <motion.div 
          className="absolute z-20 w-full flex justify-center items-center pointer-events-none top-1/2 -translate-y-1/2"
          initial="hidden"
          animate="show"
          variants={containerVars}
        >
          <h1 className="text-[14vw] font-serif font-light tracking-tighter mix-blend-difference text-white flex overflow-hidden leading-none">
            {TITLE.split("").map((char, index) => (
              <motion.span key={index} variants={letterVars} className="inline-block relative origin-bottom">
                {char}
              </motion.span>
            ))}
          </h1>
        </motion.div>

        {/* Center Vertical Editorial Image */}
        <motion.div 
          style={{ y: parallaxY, opacity: opacityFade }} 
          className="relative w-[85vw] md:w-[35vw] h-[75vh] md:h-[85vh] z-10"
        >
          <Image
            src="https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=1500&auto=format&fit=crop"
            alt="Cinematic Portrait"
            fill
            className="object-cover rounded-sm contrast-125"
            priority
            sizes="(max-width: 768px) 85vw, 35vw"
          />
        </motion.div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[9px] uppercase font-sans tracking-[0.3em] opacity-40 animate-bounce">
          Scroll
        </div>

      </section>

      {/* Extreme Asymmetrical Product Showcase */}
      <section className="py-40 bg-background text-foreground relative z-30">
        <div className="container mx-auto px-6 lg:px-12">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-32 text-center md:text-left md:ml-[8%]"
          >
            <h2 className="text-4xl md:text-6xl font-serif mb-6">Editorial Range</h2>
            <p className="text-[10px] font-sans tracking-[0.3em] uppercase text-foreground/50">Rozdzielone obiekty. Wolna przestrzeń.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-0 lg:gap-x-16 gap-y-32 layout-boundary">
            
            {/* Left Huge Card (Span 7 cols) */}
            <div className="lg:col-span-7 relative flex justify-end pr-0 lg:pr-12">
              {featuredProducts[0] && (
                <div className="w-full md:w-[90%]">
                  <ProductCard product={featuredProducts[0]} />
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 1 }}
                    className="mt-8"
                  >
                    <p className="text-[9px] font-sans tracking-[0.2em] uppercase text-foreground/40 mb-2">Editor&apos;s Pick</p>
                    <p className="text-sm font-serif italic text-foreground/80 max-w-sm leading-relaxed">
                      Luksus widać w dbałości o każdy piksel. Odrzucamy zbędne obramowania, skupiając uwagę na esencji materiału.
                    </p>
                  </motion.div>
                </div>
              )}
            </div>

            {/* Right Stacked Cards (Span 5 cols) - With vertical intense offset */}
            <div className="lg:col-span-5 flex flex-col gap-32 lg:mt-72 pl-0 lg:pl-8">
              {featuredProducts[1] && (
                <div className="w-full md:w-[85%] self-end">
                  <ProductCard product={featuredProducts[1]} />
                </div>
              )}
              {featuredProducts[2] && (
                <div className="w-full md:w-[75%] mt-12">
                  <ProductCard product={featuredProducts[2]} />
                </div>
              )}
            </div>

          </div>
        </div>
      </section>
      
      {/* Spacer to prove the scroll smooth feeling */}
      <div className="h-[25vh] bg-background"></div>
    </>
  );
}

export async function getStaticProps() {
  const products = await getProducts();
  return {
    props: {
      featuredProducts: products.slice(0, 3) // We only need exactly 3 elements for this asymmetry
    }
  };
}
