import { useSearchParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function SearchResultPage() {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name") || ""; // matches backend 'name'
  const minPrice = Number(searchParams.get("minPrice") || 0);
  const maxPrice = Number(searchParams.get("maxPrice") || 1000000);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://electronic-website-server.vercel.app/search?name=${name}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
        );
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error(err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [name, minPrice, maxPrice]);

  return (
    <div className="max-w-7xl mx-auto px-4 pt-32 pb-16">
      <h1 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white mb-10 tracking-tight">Search Results</h1>

      {loading ? (
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[1,2,3,4].map(i => <div key={i} className="h-[380px] bg-white dark:bg-slate-800 rounded-3xl animate-pulse premium-shadow"></div>)}
        </div>
      ) : products.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <Link
              to={`/product-details/${p._id}`}
              key={p._id}
              className="hover-lift bg-white dark:bg-slate-800/90 border border-slate-100 dark:border-slate-700/60 rounded-3xl relative overflow-hidden group flex flex-col premium-shadow block"
            >
              <div className="w-full h-[240px] bg-[#f8fafc] dark:bg-slate-900/50 overflow-hidden relative img-zoom-container flex items-center justify-center p-8">
                <img
                  src={p.image}
                  alt={p.name}
                  className="max-w-full max-h-full object-contain mix-blend-multiply dark:mix-blend-normal"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md dark:bg-slate-800/90 px-3 py-1 rounded-full text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest shadow-sm">
                  {p.category}
                </div>
              </div>
              
              <div className="p-6 flex flex-col justify-between flex-1">
                <h3 className="text-[17px] font-bold text-slate-800 dark:text-slate-100 line-clamp-2 leading-relaxed group-hover:text-[#0ea5e9] transition-colors">{p.name}</h3>
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700/60">
                   <p className="text-[22px] font-black tracking-tight text-cyan-600 dark:text-cyan-400">${p.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-800 p-10 rounded-3xl premium-shadow text-center">
            <p className="text-slate-500 dark:text-slate-400 text-lg">No products found matching your search.</p>
        </div>
      )}
    </div>
  );
}

export default SearchResultPage;
