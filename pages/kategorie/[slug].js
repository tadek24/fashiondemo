import { NextSeo } from "next-seo";
import { getProductsByCategory, getProducts } from "../../lib/shopify";
import ProductCard from "../../components/ProductCard";

export default function Category({ category, products }) {
  return (
    <>
      <NextSeo 
        title={category}
        description={`Ekskluzywna kolekcja ubrań z kategorii ${category}.`}
      />
      
      <div className="container mx-auto px-6 py-16 mt-8">
        <h1 className="text-4xl md:text-5xl font-serif mb-12">{category}.</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {products.length === 0 && (
            <p className="col-span-full text-foreground/50">Brak produktów w tej kategorii.</p>
          )}
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const products = await getProducts();
  const categories = new Set();
  products.forEach(p => p.categories.forEach(c => categories.add(c)));

  const paths = Array.from(categories).map((category) => ({
    params: { slug: category },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const products = await getProductsByCategory(params.slug);

  return {
    props: {
      category: params.slug,
      products,
    },
  };
}
