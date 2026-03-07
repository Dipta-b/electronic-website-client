import { useState } from "react";
import { Link } from "react-router-dom";

function FilterSidebar({
  categories = ["mobile", "laptop", "electronics", "accessories"],
}) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([100, 1500]); // min, max

  return (
    <div className="col-span-1 bg-gray-100 p-4 rounded-lg h-[500px] overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">Categories</h2>
      <ul className="space-y-2 mb-6">
        {categories.map((cat) => (
          <li
            key={cat}
            className={`p-2 rounded shadow cursor-pointer hover:bg-gray-200 ${
              selectedCategory === cat
                ? "bg-blue-100 font-semibold"
                : "bg-white"
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </li>
        ))}
      </ul>

      <div className="relative mb-6">
        <label htmlFor="price-range" className="sr-only">
          Price range
        </label>
        <input
          id="price-range"
          type="range"
          min="100"
          max="1500"
          value={priceRange[1]}
          onChange={(e) =>
            setPriceRange([priceRange[0], Number(e.target.value)])
          }
          className="w-full h-2 bg-gray-300 rounded-full appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>Min (${priceRange[0]})</span>
          <span>Max (${priceRange[1]})</span>
        </div>
      </div>

      {/* Apply Filter Button */}
      <Link
        to={`/search-result-page-sort?category=${selectedCategory}&minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}`}
        className="block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-center font-semibold"
      >
        Apply Filter
      </Link>
    </div>
  );
}

export default FilterSidebar;
