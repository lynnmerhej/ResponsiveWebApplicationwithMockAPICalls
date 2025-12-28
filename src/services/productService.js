const BASE_URL = "https://dummyjson.com/products";

/**
 * Fetch 100+ products
 */
export async function fetchProducts() {
  const res = await fetch(`${BASE_URL}?limit=100`);
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = await res.json();
  return data.products;
}

/**
 * Fetch a single product by ID
 */
export async function fetchProductById(id) {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch product details");
  }
  return await res.json();
}
