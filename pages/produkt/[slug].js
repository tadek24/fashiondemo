import { NextSeo } from "next-seo";
import Image from "next/image";
import { getProducts, getProductByHandle } from "../../lib/shopify";
import MagneticButton from "../../components/MagneticButton";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Product({ product }) {
  const [selectedSize, setSelectedSize] = useState("");
  const [accordionOpen, setAccordionOpen] = useState(false);

  if (!product) return <div>Product Not Found</div>;

  return (
    <>
      <NextSeo 
        title={product.title}
        description={product.description}
      />

      <div className="container mx-auto px-6 py-12 lg:py-24">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* Image Gallery */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            {product.images.map((img, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative aspect-[3/4] w-full bg-foreground/5 rounded-sm overflow-hidden"
              >
                <Image
                  src={img}
                  alt={`${product.title} view ${i + 1}`}
                  fill
                  priority={i === 0}
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
            ))}
          </div>

          {/* Product Info (Sticky) */}
          <div className="w-full lg:w-1/2">
            <div className="sticky top-32">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-3xl md:text-4xl font-serif mb-4">{product.title}</h1>
                <div className="flex items-center space-x-3 mb-8 text-lg">
                  {product.compareAtPrice && (
                    <span className="line-through text-foreground/50">${product.compareAtPrice.toFixed(2)}</span>
                  )}
                  <span>${product.price.toFixed(2)}</span>
                </div>
                
                <p className="text-foreground/70 leading-relaxed max-w-md mb-10">
                  {product.description}
                </p>

                {/* Variants (Size) */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm uppercase tracking-widest font-medium">Wybierz rozmiar</span>
                    <button className="text-xs text-foreground/50 underline hover:text-foreground">Tabela rozmiarów</button>
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    {product.variants.map((variant, i) => {
                      // deduplicate sizes for simplicity
                      const size = variant.size;
                      return (
                        <button
                          key={i}
                          onClick={() => setSelectedSize(size)}
                          className={`border py-3 text-xs uppercase tracking-widest transition-colors ${
                            selectedSize === size
                              ? "border-foreground bg-foreground text-background"
                              : "border-border hover:border-foreground"
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Add to Cart */}
                <MagneticButton className="w-full bg-foreground text-background py-5 mb-12 uppercase tracking-widest text-sm hover:opacity-90">
                  Dodaj do koszyka
                </MagneticButton>

                {/* Accordion - Composition & Care */}
                <div className="border-t border-border">
                  <button 
                    onClick={() => setAccordionOpen(!accordionOpen)}
                    className="w-full py-6 flex justify-between items-center text-sm uppercase tracking-widest font-medium"
                  >
                    Skład i Pielęgnacja
                    {accordionOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  <AnimatePresence>
                    {accordionOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pb-6 text-foreground/70 text-sm leading-relaxed">
                          <p className="mb-2"><strong>Materiał:</strong> {product.metadata?.material || "Premium Quality"}</p>
                          <p><strong>Pielęgnacja:</strong> {product.metadata?.care || "Sprawdź na metce"}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="border-t border-border" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const products = await getProducts();
  const paths = products.map((product) => ({
    params: { slug: product.handle },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const product = await getProductByHandle(params.slug);

  return {
    props: {
      product,
    },
  };
}
