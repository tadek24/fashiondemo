import { NextSeo } from "next-seo";
import Image from "next/image";
import { getProducts, getProductByHandle } from "../../lib/shopify";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Product({ product }) {
  const [selectedSize, setSelectedSize] = useState("");
  const [mainImage, setMainImage] = useState(product?.images[0]);

  if (!product) return <div>Product Not Found</div>;

  return (
    <>
      <NextSeo 
        title={`${product.title} | VELOUR`}
        description={product.description}
      />

      <div className="container mx-auto px-6 lg:px-12 py-32">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* New Thumbnail/Main Gallery Layout */}
          <div className="w-full lg:w-[60%] flex flex-col-reverse md:flex-row gap-6 h-[70vh] lg:h-[85vh]">
            
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto no-scrollbar w-full md:w-24 shrink-0">
              {product.images.map((img, i) => (
                <button 
                  key={i}
                  onMouseEnter={() => setMainImage(img)}
                  onClick={() => setMainImage(img)}
                  className={`relative w-20 md:w-full aspect-[3/4] shrink-0 border transition-opacity ${mainImage === img ? 'border-foreground opacity-100' : 'border-transparent opacity-50 hover:opacity-100'}`}
                >
                  <Image src={img} alt={`Thumbnail ${i}`} fill className="object-cover" sizes="100px" />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="relative w-full h-full bg-background flex-grow">
              <motion.div 
                key={mainImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={mainImage}
                  alt={product.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </motion.div>
            </div>
          </div>

          {/* Product Info */}
          <div className="w-full lg:w-[40%] flex flex-col pt-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-serif font-light mb-6">{product.title}</h1>
              <div className="flex items-center space-x-4 mb-10 text-xl font-sans text-foreground/80">
                {product.compareAtPrice && (
                  <span className="line-through text-foreground/40">${product.compareAtPrice.toFixed(2)}</span>
                )}
                <span>${product.price.toFixed(2)}</span>
              </div>

              {/* Variants */}
              <div className="mb-12">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[10px] uppercase font-sans tracking-[0.2em] text-foreground/50">Wybierz rozmiar</span>
                  <button className="text-[10px] uppercase tracking-widest text-foreground/50 hover:text-foreground transition-colors border-b border-foreground/30 pb-0.5">Tabela rozmiarów</button>
                </div>
                <div className="flex flex-wrap gap-4">
                  {product.variants.map((variant, i) => {
                    const size = variant.size;
                    return (
                      <button
                        key={i}
                        onClick={() => setSelectedSize(size)}
                        className={`w-14 h-14 border flex items-center justify-center text-[10px] font-sans transition-all duration-300 ${
                          selectedSize === size
                            ? "border-foreground bg-foreground text-background"
                            : "border-border hover:border-foreground/50 bg-transparent text-foreground"
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Add to Cart */}
              <button className="w-full bg-foreground text-background py-5 mb-16 uppercase tracking-[0.2em] text-[10px] hover:bg-foreground/90 transition-colors">
                Dodaj do koszyka
              </button>

              {/* Expanded Description Breakdown */}
              <div className="border-t border-border/30 pt-10">
                <h3 className="text-[10px] uppercase font-sans tracking-[0.2em] text-foreground/50 mb-6">O produkcie</h3>
                
                <p className="text-sm font-sans leading-relaxed text-foreground/80 mb-8">
                  {product.description} Nasze kolekcje są starannie opracowywane z wykorzystaniem tradycyjnego krawiectwa. Krój został zoptymalizowany, aby dostarczyć klasyczną, elegancką i absolutnie uniwersalną formę dla minimalistycznej sylwetki.
                </p>

                <ul className="text-xs font-sans text-foreground/70 space-y-4 tracking-wide">
                  <li className="flex justify-between border-b border-border/30 pb-2">
                    <span>Skład</span>
                    <span>{product.metadata?.material || "100% Bawełna"}</span>
                  </li>
                  <li className="flex justify-between border-b border-border/30 pb-2">
                    <span>Kraj produkcji</span>
                    <span>{product.metadata?.origin || "Polska"}</span>
                  </li>
                  <li className="flex justify-between border-b border-border/30 pb-2">
                    <span>Pielęgnacja</span>
                    <span>{product.metadata?.care || "Patrz na metce"}</span>
                  </li>
                </ul>
              </div>
            </motion.div>
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
