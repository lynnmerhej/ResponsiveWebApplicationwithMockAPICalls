import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as productService from "../services/productService";
import "../styles/product-detail.css";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    productService
      .fetchProductById(id)
      .then((res) => setProduct(res))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product)
    return (
      <div className="loading-container">
        <div className="loader"></div>
      </div>
    );

  return (
    <main className="product-detail-page">
      <div className="detail-wrapper">
        <button className="back-link" onClick={() => navigate(-1)}>
          <span className="arrow">←</span> Go Back
        </button>

        <div className="product-container">
          {/* LEFT COLUMN: IMAGE */}
          <div className="product-left">
            <div className="main-image-holder">
              <img src={product.thumbnail} alt={product.title} />
            </div>
          </div>

          {/* RIGHT COLUMN: DESCRIPTION & INFO */}
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
