import React from "react";
import "../styles/pagination.css";

export default function Pagination({ total, perPage, page, setPage }) {
  const totalPages = Math.ceil(total / perPage);

  // Generate visible pages (show first, last, current ±1, ellipsis if needed)
  const visiblePages = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= page - 1 && i <= page + 1)) {
        pages.push(i);
      } else if (i === 2 && page > 3) {
        pages.push("...");
      } else if (i === totalPages - 1 && page < totalPages - 2) {
        pages.push("...");
      }
    }
    return [...new Set(pages)]; // remove duplicates
  };

  const handleClick = (p) => {
    if (p !== "...") setPage(p);
  };

  return (
    <div className="pagination-container">
      <button
        className="page-btn arrow"
        onClick={() => setPage(page > 1 ? page - 1 : 1)}
        disabled={page === 1}
      >
        &#8592;
      </button>

      {visiblePages().map((p, idx) =>
        p === "..." ? (
          <span key={idx} className="page-dots">
            ...
          </span>
        ) : (
          <button
            key={idx}
            className={`page-btn ${p === page ? "active" : ""}`}
            onClick={() => handleClick(p)}
          >
            {p}
          </button>
        )
      )}

      <button
        className="page-btn arrow"
        onClick={() => setPage(page < totalPages ? page + 1 : totalPages)}
        disabled={page === totalPages}
      >
        &#8594;
      </button>
    </div>
  );
}
