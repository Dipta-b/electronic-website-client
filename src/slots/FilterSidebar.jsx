import { useState } from "react";
import { Link } from "react-router-dom";

function FilterSidebar({
  categories = ["mobile", "laptop", "electronics", "accessories"],
}) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([100, 1500]); // min, max

  // Build query string based on selection
  const queryString = `?name=${selectedCategory}&minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}`;

  return (
    <div className="col-span-1 bg-white dark:bg-slate-800/80 p-6 rounded-3xl premium-shadow border border-slate-100 dark:border-slate-700/60 flex-1">
      <h2 className="text-xl font-black text-slate-800 dark:text-white mb-6 tracking-tight">Categories</h2>
      <ul className="space-y-3 mb-8">
        {categories.map((cat) => (
          <li
            key={cat}
            className={`px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 font-medium tracking-wide ${
              selectedCategory === cat
                ? "bg-linear-to-r from-cyan-500 to-blue-500 text-white shadow-md shadow-cyan-500/25 transform translate-x-1"
                : "bg-[#f8fafc] dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 hover:bg-cyan-50 dark:hover:bg-slate-700 hover:text-cyan-600 dark:hover:text-cyan-400"
            }`}
            onClick={
              () => setSelectedCategory(selectedCategory === cat ? "" : cat) // toggle
            }
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-black text-slate-800 dark:text-white mb-4 tracking-tight">Price Range</h2>
      <div className="mb-8 bg-[#f8fafc] dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50 relative">
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
          className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full appearance-none cursor-pointer accent-[#0ea5e9]"
        />
        <div className="flex justify-between text-sm font-bold text-slate-500 dark:text-slate-400 mt-4">
          <span className="bg-white dark:bg-slate-800 px-2 py-1 rounded-md shadow-sm border border-slate-200 dark:border-slate-700">${priceRange[0]}</span>
          <span className="bg-white dark:bg-slate-800 px-2 py-1 rounded-md shadow-sm border border-slate-200 dark:border-slate-700">${priceRange[1]}</span>
        </div>
      </div>

      {/* Apply Filter Button */}
      <Link
        to={`/search-result-page-sort${queryString}`}
        className="block w-full px-4 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full hover:bg-cyan-600 dark:hover:bg-cyan-400 dark:hover:text-slate-900 text-center font-bold transition-all duration-300 hover:-translate-y-1 premium-shadow"
      >
        Apply Filter
      </Link>
    </div>
  );
}

export default FilterSidebar;
