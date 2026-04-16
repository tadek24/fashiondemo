import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProductCard({ product }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="group relative cursor-pointer"
    >
      <Link href={`/produkt/${product.handle}`} className="block relative aspect-[3/4] overflow-hidden bg-foreground/5 rounded-sm">
        {/* Primary Image */}
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-opacity duration-500 group-hover:opacity-0"
        />
        {/* Hover Image */}
        {product.images[1] && (
          <Image
            src={product.images[1]}
            alt={`${product.title} alternate view`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}

        {/* Quick Add Button */}
        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <button
            onClick={(e) => {
              e.preventDefault();
              // Mock quick add action
            }}
            className="w-full bg-background/90 backdrop-blur-sm text-foreground py-3 text-xs uppercase tracking-widest font-medium hover:bg-foreground hover:text-background transition-colors shadow-lg rounded-sm"
          >
            Quick Add
          </button>
        </div>
      </Link>

      <div className="mt-4 flex flex-col items-center text-center">
        <h3 className="text-sm font-medium">{product.title}</h3>
        <div className="flex items-center space-x-2 mt-1 text-sm text-foreground/70">
          {product.compareAtPrice && (
            <span className="line-through opacity-60 text-xs">
              ${product.compareAtPrice.toFixed(2)}
            </span>
          )}
          <span>${product.price.toFixed(2)}</span>
        </div>
      </div>
    </motion.div>
  );
}
