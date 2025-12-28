import "../styles/filters.css";

export default function Filters({
  search,
  setSearch,
  minPrice,
  setMinPrice,
  maxPrice,
  priceRange,
  setPriceRange,
  setMaxPrice,
  inStock,
  setInStock,
  sortBy,
  setSortBy,
}) {
  return (
    <div className="filters-bar">
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="price-range">
        <input
          type="number"
          placeholder="Min $"
          value={priceRange.min}
          onChange={(e) =>
            setPriceRange((prev) => ({ ...prev, min: e.target.value }))
          }
        />
        <input
          type="number"
          placeholder="Max $"
          value={priceRange.max}
          onChange={(e) =>
            setPriceRange((prev) => ({ ...prev, max: e.target.value }))
          }
        />
      </div>
      <label className="stock-toggle">
        <input
          type="checkbox"
          checked={inStock}
          onChange={(e) => setInStock(e.target.checked)}
        />
        In Stock Only
      </label>
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="priceDesc">Price: High → Low</option>
        <option value="priceAsc">Price: Low → High</option>
        <option value="nameAsc">Name: A → Z</option>
        <option value="nameDesc">Name: Z → A</option>
      </select>
    </div>
  );
}
