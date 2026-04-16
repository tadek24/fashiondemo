import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProductCard({ product }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="group relative flex flex-col gap-4 text-foreground cursor-pointer"
    >
      <Link href={`/produkt/${product.handle}`} className="block relative aspect-[4/5] w-full overflow-hidden bg-transparent">
        {/* Main Image */}
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
        />

        {/* Hover View Image (if exists) */}
        {product.images[1] && (
          <Image
            src={product.images[1]}
            alt={`${product.title} lifestyle view`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover absolute inset-0 opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100 mix-blend-normal"
          />
        )}
        
        {/* Dark subtle overlay to keep text readable if needed, or pure transparent */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
      </Link>

      <div className="flex flex-col items-center justify-center text-center mt-2 relative">
        <h3 className="text-sm font-serif">{product.title}</h3>
        
        <div className="flex items-center space-x-3 mt-2 text-xs font-sans tracking-widest text-foreground/70">
          {product.compareAtPrice && (
            <span className="line-through opacity-50">
              ${product.compareAtPrice.toFixed(2)}
            </span>
          )}
          <span>${product.price.toFixed(2)}</span>
        </div>

        {/* Action Reveal */}
        <div className="absolute top-10 left-0 w-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
          <Link href={`/produkt/${product.handle}`} className="text-[10px] uppercase font-sans font-medium tracking-[0.2em] border-b border-foreground/30 pb-1">
            Szybki podgląd
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
