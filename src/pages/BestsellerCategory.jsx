import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "./shared/CartContext";
import { FaCartPlus } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";

function BestsellerCategory() {
  const categories = ["mobile", "laptop", "electronics", "accessories"];
  const [selected, setSelected] = useState("mobile");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { y: 40, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Fetch from the local/live API correctly using cors
        const res = await fetch(`${import.meta.env.DEV ? "http://localhost:5000" : "https://electronic-website-server.vercel.app"}/products/category/${selected}`);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : data.products || []);
      } catch (err) {
        console.error(err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selected]);

  return (
    <div className="w-full">
      {/* Header & Category Buttons */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
            Bestsellers <span className="text-gradient">in Category</span>
          </h2>
          <p className="text-slate-500 mt-2 text-sm md:text-base">Explore our top rated electronics.</p>
        </div>

        <div className="flex gap-3 flex-wrap bg-white dark:bg-slate-800 p-1.5 rounded-full premium-shadow border border-slate-100 dark:border-slate-700">
          {categories.map((cat) => (
            <button
              type="button"
              key={cat}
              onClick={() => setSelected(cat)}
              className={`px-5 py-2 rounded-full font-semibold text-sm transition-all duration-300 capitalize
                  ${selected === cat
                  ? "bg-linear-to-r from-cyan-500 to-blue-500 text-white shadow-[0_4px_12px_rgba(14,165,233,0.3)]"
                  : "bg-transparent text-slate-600 hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-400 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <motion.div
        className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 min-h-[400px]"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {loading ? (
          Array(6).fill(0).map((_, i) => (
            <div key={i} className="bg-white dark:bg-slate-800 h-[380px] rounded-2xl animate-pulse premium-shadow border border-slate-100 dark:border-slate-700"></div>
          ))
        ) : products.length > 0 ? (
          <AnimatePresence>
            {products.slice(0, 6).map((p) => (
              <motion.div
                key={p._id}
                variants={item}
                layout
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, scale: 0.9 }}
                className="hover-lift bg-white dark:bg-slate-800/90 border border-slate-100 dark:border-slate-700/60 rounded-3xl relative overflow-hidden group flex flex-col premium-shadow"
              >
                <div className="w-full h-[260px] bg-[#f8fafc] dark:bg-slate-900/50 overflow-hidden relative img-zoom-container flex items-center justify-center p-8">
                  <img
                    alt={p.name}
                    src={p.image}
                    className="max-w-full max-h-full object-contain mix-blend-multiply dark:mix-blend-normal"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md dark:bg-slate-800/90 px-3 py-1 rounded-full text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest shadow-sm">
                    {p.category}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between bg-white dark:bg-slate-800/50">
                  <div>
                    <h3 className="text-[17px] font-bold text-slate-800 dark:text-slate-100 line-clamp-2 leading-relaxed group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                      {p.name}
                    </h3>
                  </div>

                  <div className="flex justify-between items-end mt-5 pt-5 border-t border-slate-100 dark:border-slate-700/60">
                    <div>
                      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Price</p>
                      <p className="text-[22px] font-black tracking-tight text-cyan-600 dark:text-cyan-400">
                        ${Number(p.price || 0).toFixed(2)}
                      </p>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => addToCart(p, 1)}
                      className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 h-11 w-11 flex items-center justify-center rounded-full hover:bg-cyan-600 dark:hover:bg-cyan-500 hover:text-white transition-colors premium-shadow"
                    >
                      <FaCartPlus className="text-lg" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          <motion.p variants={item} className="text-center col-span-full mt-10 text-slate-500 text-lg">
            No products found in {selected}.
          </motion.p>
        )}
      </motion.div>

      {/* View All Button */}
      <div className="flex justify-center mt-12">
        <Link
          to={`/category/${selected}`}
          className="inline-block px-6 py-2 rounded-full bg-slate-900 dark:bg-white hover:bg-transparent dark:hover:bg-transparent text-white dark:text-slate-900 border-2 border-slate-900 dark:border-white font-bold transition-all transform hover:-translate-y-1 shadow-lg"
        >
          View All {selected}s
        </Link>
      </div>
    </div>
  );
}

export default BestsellerCategory;
