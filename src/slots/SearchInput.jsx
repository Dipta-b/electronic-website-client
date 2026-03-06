import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SearchInput = ({ searchValue, setSearchValue }) => {
  const [placeholderText, setPlaceholderText] = useState("Search products...");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!searchValue) {
      setResults([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      try {
        const params = new URLSearchParams();
        params.append("name", searchValue);

        const res = await fetch(`http://localhost:5000/search?${params.toString()}`, {
          credentials: "include",
        });
        const data = await res.json();

        setResults(Array.isArray(data.products) ? data.products : []);
      } catch (err) {
        console.error("Search API error:", err);
        setResults([]);
      }
    }, 300); // debounce 300ms

    return () => clearTimeout(delayDebounceFn);
  }, [searchValue]);

  return (
    <div className="relative w-full max-w-md border border-gray-300 dark:border-slate-700 rounded-lg">
      {/* Search button */}
      <Link
        to={`/search-result-page?${new URLSearchParams({ query: searchValue || "" }).toString()}`}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded"
      >
        Search
      </Link>

      {/* Input field */}
      <input
        type="text"
        value={searchValue}
        placeholder={placeholderText}
        onChange={(e) => setSearchValue(e.target.value)}
        className="w-full py-5 pl-5 pr-24 rounded-lg border border-transparent outline-none bg-transparent dark:text-white placeholder-gray-400"
      />

      {/* Dropdown suggestions */}
      {results.length > 0 && (
        <ul className="absolute w-full bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 mt-1 rounded-md max-h-60 overflow-auto z-50">
          {results.map((product) => (
            <li
              key={product._id}
              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              {product.name} ({product.category})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchInput;