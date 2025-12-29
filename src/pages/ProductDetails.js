import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as productService from "../services/productService";
import "../styles/product-detail.css";

export default function ProductDetail() {
  // Grab the dynamic ID from the URL (e.g. /products/123)
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch data whenever the ID changes (handles direct link sharing)
    productService
      .fetchProductById(id)
      .then((res) => setProduct(res))
      .catch((err) => console.error(err));
  }, [id]);

  // Early return pattern: Stops component from rendering main content until data exists
  if (!product)
    return (
      <div className="loading-container">
        <div className="loader"></div>
      </div>
    );

  return (
    <main className="product-detail-page">
      <div className="detail-wrapper">
        {/* Navigation: using -1 mimics the browser 'Back' button behavior */}
        <button className="back-link" onClick={() => navigate(-1)}>
          <span className="arrow">←</span> Go Back
        </button>

        <div className="product-container">
          {/* Left Column: Visual focus */}
          <div className="product-left">
            <div className="main-image-holder">
              <img src={product.thumbnail} alt={product.title} />
            </div>
          </div>

          {/* Right Column: Information hierarchy */}
          <div className="product-right">
            <nav className="breadcrumb">
              Products <span className="separator">/</span> {product.category}
            </nav>
            <h1 className="product-title">{product.title}</h1>
            <p className="product-price">${product.price}</p>

            <div className="product-description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

            {/* Grid for structured metadata attributes */}
            <div className="product-meta-grid">
              <div className="meta-item">
                <span className="meta-label">Brand</span>
                <span className="meta-value">{product.brand}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Rating</span>
                <span className="meta-value">⭐ {product.rating}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Availability</span>
                <span className="meta-value stock-status">
                  {product.stock} in stock
                </span>
              </div>
            </div>

            <button className="add-to-cart-btn">Add to Cart</button>
          </div>
        </div>
      </div>
    </main>
  );
}