import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaShoppingCart, FaBolt } from "react-icons/fa";
import { Link } from "react-router-dom";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
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

function LimitedOffers() {
  const [products, setProducts] = useState([]);
  const [timeNow, setTimeNow] = useState(new Date());

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await fetch("https://electronic-website-server.vercel.app/products/activeOffers");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOffers();

    const interval = setInterval(() => setTimeNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const calculateTimeLeft = (endTime) => {
    const diff = new Date(endTime) - timeNow;
    if (diff <= 0) return "Expired";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  const calculateDiscount = (price, offerPrice) =>
    Math.round(((price - offerPrice) / price) * 100);

  const calculateSavings = (price, offerPrice) =>
    (price - offerPrice).toFixed(2);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">
        <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
          Limited
        </span>{" "}
        Offers
      </h1>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {products.slice(0, 6).map((p) => (
          <motion.div
            key={p._id}
            variants={item}
            whileHover={{ y: -6, scale: 1.01 }}
            className="flex items-center rounded-2xl bg-white dark:bg-slate-800 overflow-hidden premium-shadow border border-slate-100 dark:border-slate-700/60"
          >
            {/* Image */}
            <div className="relative flex-shrink-0 w-32 h-full min-h-[140px] bg-slate-50 dark:bg-slate-900/50 flex items-center justify-center p-3">
              <img
                src={p.image || "/placeholder.jpg"}
                alt={p.name}
                className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal hover:scale-110 transition-transform duration-500"
              />

              <span className="absolute top-2 left-2 bg-[#ef4444] text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">
                {calculateDiscount(p.price, p.offerPrice)}% OFF
              </span>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-1 justify-between">
              <div>
                <h3 className="text-[15px] font-bold text-slate-800 dark:text-slate-100 line-clamp-1">
                  {p.name}
                </h3>
                <p className="text-[11px] font-semibold text-slate-500 mt-1 uppercase tracking-wider">
                  Ends: <span className="text-[#0ea5e9]">{calculateTimeLeft(p.offerEnd)}</span>
                </p>
                <div className="mt-2 text-slate-800 dark:text-white">
                  <span className="font-black text-lg text-cyan-600 dark:text-cyan-400">
                    ${p.offerPrice && Number(p.offerPrice).toFixed(2)}
                  </span>
                  <span className="line-through text-slate-400 text-xs ml-2 font-medium">
                    ${p.price && Number(p.price).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-2 mt-3">
                <Link to={`/product-details/${p._id}`} className="flex-1 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-center py-2 rounded-xl text-slate-700 dark:text-slate-200 font-bold text-sm transition-colors">
                  Details
                </Link>
                <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 rounded-xl hover:-translate-y-0.5 hover:shadow-lg transition-all flex items-center justify-center">
                  <FaShoppingCart />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="text-center mt-8">
        <Link
          to="/offers"
          className="inline-block px-6 py-2 rounded-full bg-slate-900 dark:bg-white hover:bg-transparent dark:hover:bg-transparent text-white dark:text-slate-900 border-2 border-slate-900 dark:border-white font-bold transition-all transform hover:-translate-y-1 shadow-lg"
        >
          View All Offers
        </Link>
      </div>
    </div>
  );
}

export default LimitedOffers;
