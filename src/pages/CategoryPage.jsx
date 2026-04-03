import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "./shared/CartContext";
import { FaCartPlus } from "react-icons/fa6";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { y: 80, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

function CategoryPage() {
  const { categoryName } = useParams();
  const categories = ["mobile", "laptop", "electronics", "accessories"];

  const [selected, setSelected] = useState(categoryName || "mobile");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://electronic-website-server.vercel.app/products/category/${selected}`,
        );
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
    <div className="max-w-7xl mx-auto px-4 py-24">
      {/* Header & Category Buttons */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8 text-center md:text-left">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white capitalize">
            {selected} <span className="text-gradient">Collections</span>
          </h1>
          <p className="text-slate-500 mt-2">Explore all products in this specific category.</p>
        </div>

        <div className="flex gap-2 flex-wrap justify-center bg-white dark:bg-slate-800 p-1.5 rounded-full premium-shadow border border-slate-100 dark:border-slate-700">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelected(cat)}
              className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-300 capitalize ${
                selected === cat
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
        key={selected}
        className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 min-h-[400px]"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {loading ? (
          Array(8)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-800 h-[380px] rounded-3xl animate-pulse premium-shadow border border-slate-100 dark:border-slate-700"
              ></div>
            ))
        ) : products.length > 0 ? (
          products.map((p) => (
              <motion.div
                key={p._id}
                variants={item}
                layout
                className="hover-lift bg-white dark:bg-slate-800/90 border border-slate-100 dark:border-slate-700/60 rounded-3xl relative overflow-hidden group flex flex-col premium-shadow"
              >
                <div className="w-full h-[260px] bg-[#f8fafc] dark:bg-slate-900/50 overflow-hidden relative flex items-center justify-center p-8">
                  <img
                    alt={p.name}
                    src={p.image}
                    className="max-w-full max-h-full object-contain mix-blend-multiply dark:mix-blend-normal transform transition-transform duration-500 group-hover:scale-110"
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

                    <div className="flex gap-2">
                       <Link
                          to={`/product-details/${p._id}`}
                          className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 h-11 px-4 flex items-center justify-center rounded-xl font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                        >
                          Details
                       </Link>
                       <motion.button
                         whileHover={{ scale: 1.08 }}
                         whileTap={{ scale: 0.95 }}
                         onClick={() => addToCart(p, 1)}
                         className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 h-11 w-11 flex items-center justify-center rounded-xl hover:bg-cyan-600 dark:hover:bg-cyan-500 hover:text-white transition-colors shadow-md"
                       >
                         <FaCartPlus className="text-lg" />
                       </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
          ))
        ) : (
          <p className="text-center col-span-full mt-10 text-slate-500 text-lg">
            No products in {selected}
          </p>
        )}
      </motion.div>
    </div>
  );
}

export default CategoryPage;
