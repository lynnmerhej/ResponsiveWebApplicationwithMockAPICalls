import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as productService from "../services/productService";
import "../styles/home.css";

export default function Home() {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    productService
      .fetchProducts()
      .then((res) => {
        if (res && res.length > 0) {
          setFeaturedProducts(res.slice(0, 5));
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <main className="home-page">
      {/* 1. Banner Section */}
      <div className="banner">
        <h1>Our Shop Exclusives</h1>
        <p>Discover our exclusive products and special offers</p>
      </div>

      <div className="home-content">
        {/* 2. Grid Section */}
        <div className="featured-grid">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="home-product-card"
              onClick={() => navigate(`/products/${product.id}`)}
            >
              <div className="thumbnail-container">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="product-thumb"
                />
              </div>
              <h3>{product.title}</h3>
              <p className="price">${product.price}</p>
            </div>
          ))}
        </div>

        {/* 3. Action Section */}
        <div className="home-actions">
          <button
            className="view-more-btn"
            onClick={() => navigate("/products")}
          >
            View More
          </button>
        </div>
      </div>
    </main>
  );
}
