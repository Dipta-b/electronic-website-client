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

        const res = await fetch(`${import.meta.env.DEV ? "http://localhost:5000" : "https://electronic-website-server.vercel.app"}/search?name=${query}`, {
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
    <div className="max-w-7xl mx-auto px-4 pt-32 pb-16">
      {results.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 p-10 rounded-3xl premium-shadow text-center">
            <p className="text-slate-500 dark:text-slate-400 text-lg">No products found matching your search.</p>
        </div>
      ) : (
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((product) => (
            <li key={product._id} className="hover-lift bg-white dark:bg-slate-800/90 border border-slate-100 dark:border-slate-700/60 rounded-3xl relative overflow-hidden group flex flex-col premium-shadow">
              <div className="p-6 flex flex-col justify-between h-full">
                <div>
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md dark:bg-slate-800/90 px-3 py-1 rounded-full text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest shadow-sm">
                        {product.category}
                    </div>
                    <h3 className="text-[17px] mt-8 font-bold text-slate-800 dark:text-slate-100 line-clamp-2 leading-relaxed group-hover:text-[#0ea5e9] transition-colors">{product.name}</h3>
                </div>
                <div className="mt-5 pt-5 border-t border-slate-100 dark:border-slate-700/60 flex justify-between items-end">
                    <p className="text-[22px] font-black tracking-tight text-cyan-600 dark:text-cyan-400">${product.price}</p>
                    {product.available ? (
                      <span className="text-green-600 font-bold bg-green-50 px-2.5 py-1 rounded-md text-xs">In Stock</span>
                    ) : (
                      <span className="text-red-600 font-bold bg-red-50 px-2.5 py-1 rounded-md text-xs">Out of Stock</span>
                    )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResult;