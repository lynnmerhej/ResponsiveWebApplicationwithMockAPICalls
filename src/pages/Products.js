import React, { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";
import Pagination from "../components/Pagination";
import { fetchProducts } from "../services/productService";
import "../styles/products.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [inStock, setInStock] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [sortBy, setSortBy] = useState("priceDesc");
  const [page, setPage] = useState(1);

  const ITEMS_PER_PAGE = 12;

  useEffect(() => {
    setLoading(true);
    fetchProducts()
      .then((data) => {
        // Sort by price descending initially
        const sorted = data.sort((a, b) => b.price - a.price);
        setProducts(sorted);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      )
      .filter((product) => (inStock ? product.stock > 0 : true))
      .filter((product) =>
        priceRange.min ? product.price >= parseFloat(priceRange.min) : true
      )
      .filter((product) =>
        priceRange.max ? product.price <= parseFloat(priceRange.max) : true
      )
      .sort((a, b) => {
        switch (sortBy) {
          case "priceAsc":
            return a.price - b.price;
          case "priceDesc":
            return b.price - a.price;
          case "nameAsc":
            return a.title.localeCompare(b.title);
          case "nameDesc":
            return b.title.localeCompare(a.title);
          default:
            return 0;
        }
      });
  }, [products, search, inStock, priceRange, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  if (loading) return <p className="status">Loading products...</p>;
  if (error) return <p className="status error">{error}</p>;

  return (
    <div className="products-page">
      <Filters
        search={search}
        setSearch={setSearch}
        inStock={inStock}
        setInStock={setInStock}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <div className="products-container">
        <div className="grid fade-in">
          {paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <Pagination
          total={filteredProducts.length}
          perPage={ITEMS_PER_PAGE}
          page={page}
          setPage={setPage}
        />
      </div>
    </div>
  );
}
