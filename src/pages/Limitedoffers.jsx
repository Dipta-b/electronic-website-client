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
        const res = await fetch("http://localhost:5000/products/activeOffers");
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
        className="space-y-6"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {products.slice(0, 4).map((p) => (
          <motion.div
            key={p._id}
            variants={item}
            whileHover={{ y: -6, scale: 1.01 }}
            className="flex items-center rounded-xl bg-gray-100 dark:bg-slate-800 overflow-hidden hover:shadow-xl transition"
          >
            {/* Image */}
            <div className="relative flex-shrink-0 overflow-hidden">
              <img
                src={p.image || "/placeholder.jpg"}
                alt={p.name}
                className="w-40 h-40 object-cover transition-transform duration-300 hover:scale-110"
              />

              <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                {calculateDiscount(p.price, p.offerPrice)}% OFF
              </span>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-1 justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-[#d2e5f5]">
                  {p.name}
                </h3>

                <p className="text-sm text-gray-600 dark:text-[#abc2d3]/80 mt-1">
                  Ends in: {calculateTimeLeft(p.offerEnd)}
                </p>

                <p className="text-green-500 text-sm mt-1">
                  You save: ${calculateSavings(p.price, p.offerPrice)}
                </p>

                <p className="text-red-500 font-bold text-xl mt-2">
                  ${p.offerPrice}
                  <span className="line-through text-gray-400 text-sm ml-2">
                    ${p.price}
                  </span>
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full transition">
                  <FaShoppingCart />
                </button>

                <Link to={`/product-details/${p._id}`}>
                  <button className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full transition">
                    <FaBolt />
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {products.length > 4 && (
        <div className="text-center mt-8">
          <Link
            to="/offers"
            className="inline-block px-6 py-2 rounded-full bg-purple-500 hover:bg-purple-600 text-white font-medium transition"
          >
            View All Offers
          </Link>
        </div>
      )}
    </div>
  );
}

export default LimitedOffers;
