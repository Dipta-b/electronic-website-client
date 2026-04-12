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

        const res = await fetch(
          `${import.meta.env.DEV ? "http://localhost:5000" : "https://electronic-website-server.vercel.app"}/search?${params.toString()}`,
          {
            credentials: "include",
          },
        );
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
      <div className="relative">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full border rounded px-3 py-2 pr-10"
          placeholder="Search..."
        />

        {/* Search Icon */}
        <span className="absolute right-16 top-1/2 -translate-y-1/2 text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m1.85-5.65a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
            />
          </svg>
        </span>

        <Link
          to={`/search-result-page?${new URLSearchParams({ query: searchValue || "" }).toString()}`}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded"
        >
          Search
        </Link>
      </div>

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
