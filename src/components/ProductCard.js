import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/product-card.css";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <div
      className="product-card"
      onClick={() => navigate(`/products/${product.id}`)}
    >
      <div className="image-container">
        {/* Using the first image from the array for high quality */}
        <img src={product.thumbnail} alt={product.title} />
      </div>

      <div className="product-info">
        <h3 className="product-titles">{product.title}</h3>
        <p className="price">${product.price}</p>
        <p className={`stock ${product.stock > 0 ? "in" : "out"}`}>
          {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </p>
      </div>
    </div>
  );
}
