import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/product-card.css";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    // Making the entire card clickable improves mobile UX compared to a small 'View' button
    <div
      className="product-card"
      onClick={() => navigate(`/products/${product.id}`)}
    >
      <div className="image-container">
        {/* Using thumbnail property for grid performance; full res images load on details page */}
        <img src={product.thumbnail} alt={product.title} />
      </div>

      <div className="product-info">
        <h3 className="product-titles">{product.title}</h3>
        <p className="price">${product.price}</p>
        
        {/* Conditional styling for immediate visual stock feedback */}
        <p className={`stock ${product.stock > 0 ? "in" : "out"}`}>
          {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </p>
      </div>
    </div>
  );
}