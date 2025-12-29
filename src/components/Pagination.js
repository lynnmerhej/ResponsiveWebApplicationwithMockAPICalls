import React from "react";
import "../styles/pagination.css";

export default function Pagination({ total, perPage, page, setPage }) {
  const totalPages = Math.ceil(total / perPage);

  // Logic to determine which page numbers (or ellipsis) to show.
  // We want: First Page, Last Page, Current Page +/- 1, and "..." gaps.
  const visiblePages = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      // Always show first, last, and immediate neighbors of current page
      if (i === 1 || i === totalPages || (i >= page - 1 && i <= page + 1)) {
        pages.push(i);
      } 
      // Add ellipsis start if we skipped pages between 1 and current range
      else if (i === 2 && page > 3) {
        pages.push("...");
      } 
      // Add ellipsis end if we skipped pages between current range and last
      else if (i === totalPages - 1 && page < totalPages - 2) {
        pages.push("...");
      }
    }
    // Set removes duplicates (e.g. if page=1, '1' matches multiple conditions)
    return [...new Set(pages)]; 
  };

  const handleClick = (p) => {
    // Ignore clicks on dots
    if (p !== "...") setPage(p);
  };

  return (
    <div className="pagination-container">
      {/* Prev Arrow */}
      <button
        className="page-btn arrow"
        onClick={() => setPage(page > 1 ? page - 1 : 1)}
        disabled={page === 1}
      >
        &#8592;
      </button>

      {/* Render Page Numbers & Dots */}
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

      {/* Next Arrow */}
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