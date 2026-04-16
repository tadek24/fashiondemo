import data from './data.json';

const DELAY = 500;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getProducts() {
  await delay(DELAY);
  return data.products;
}

export async function getProductByHandle(handle) {
  await delay(DELAY);
  const product = data.products.find((p) => p.handle === handle);
  return product || null;
}

export async function getProductsByCategory(category) {
  await delay(DELAY);
  return data.products.filter((p) => p.categories.includes(category));
}
