import React, { useEffect, useState } from "react";
import "../styles/styles.css";

export default function Carousel({ products }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [products]);

  return (
    <div className="carousel">
      {products.map((product, index) => (
        <div
          key={product.id}
          className={`carousel-item ${index === currentIndex ? "active" : ""}`}
        >
          <img src={product.image} alt={product.name} />
          <div className="carousel-info">
            <h3>{product.name}</h3>
            <p>{product.price} USD</p>
          </div>
        </div>
      ))}
    </div>
  );
}
