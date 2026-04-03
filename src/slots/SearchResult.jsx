import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const SearchResult = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const query = params.get("query") || "";

  useEffect(() => {
    const fetchResults = async () => {
      try {
        if (!query.trim()) {
          setResults([]);
          return;
        }

        const res = await fetch(`https://electronic-website-server.vercel.app/search?name=${query}`, {
          credentials: "include",
        });
        const data = await res.json();
        setResults(Array.isArray(data.products) ? data.products : []);
      } catch (err) {
        console.error("Search API error:", err);
        setResults([]);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="p-4">
      {results.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {results.map((product) => (
            <li key={product._id} className="border p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.category}</p>
              <p className="text-lg font-bold">${product.price}</p>
              {product.available ? (
                <span className="text-green-600">In Stock</span>
              ) : (
                <span className="text-red-600">Out of Stock</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResult;