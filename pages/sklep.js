import { NextSeo } from "next-seo";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";

// Mock client-side fetching logic to demonstrate the skeleton loaders
export default function Sklep() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // We dynamically import the getProducts so it acts like a fetch
    // when run purely on the client inside useEffect.
    const fetchProducts = async () => {
      try {
        const { getProducts } = await import("../lib/shopify");
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <NextSeo 
        title="Sklep | VELOUR"
        description="Cyfrowe archiwum. Kupuj minimalistyczne elementy."
      />
      
      <div className="container mx-auto px-6 lg:px-12 py-32 mt-12">
        
        <div className="mb-24 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-serif font-light mb-8"
          >
            Archiwum.
          </motion.h1>
          <div className="h-px w-16 bg-foreground opacity-20 mx-auto mb-8" />
          <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-foreground/50">
            Wszystkie produkty
          </p>
        </div>

        {/* Dense Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-12 gap-y-24">
          {isLoading ? (
            // Render 8 Skeletons
            Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          ) : (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </div>
    </>
  );
}
