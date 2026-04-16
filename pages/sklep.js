import { NextSeo } from "next-seo";
import { getProducts } from "../lib/shopify";
import ProductCard from "../components/ProductCard";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Shop({ initialProducts }) {
  const [products] = useState(initialProducts);

  return (
    <>
      <NextSeo 
        title="Sklep"
        description="Przeglądaj pełną kolekcję zrównoważonej i luksusowej odzieży."
      />
      
      <div className="container mx-auto px-6 py-16 mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-serif mb-6">Sklep.</h1>
          
          {/* Filtering Placeholder */}
          <div className="flex flex-wrap gap-4 mb-16 text-xs uppercase tracking-widest border-b border-border pb-6">
            <button className="font-medium">Wszystko</button>
            <button className="text-foreground/50 hover:text-foreground transition-colors">Nowości</button>
            <button className="text-foreground/50 hover:text-foreground transition-colors">Sukienki</button>
            <button className="text-foreground/50 hover:text-foreground transition-colors">Akcesoria</button>
            <button className="text-foreground/50 hover:text-foreground transition-colors border-l border-border pl-4 ml-auto">Filtruj</button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const initialProducts = await getProducts();
  return {
    props: {
        initialProducts,
    },
  };
}
