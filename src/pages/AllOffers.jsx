import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaBolt } from "react-icons/fa";

function AllOffers() {
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
      <h1 className="text-4xl font-bold mb-8">All Limited Offers</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {products.map((p, i) => (
          <motion.div
            key={p._id}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="flex flex-col rounded-xl bg-gray-100 dark:bg-slate-800 shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1"
          >
            <div className="relative">
              <img
                src={p.image || "/placeholder.jpg"}
                alt={p.name}
                className="w-full h-52 object-cover"
              />
              <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                {calculateDiscount(p.price, p.offerPrice)}% OFF
              </span>
            </div>

            <div className="p-4 flex flex-col flex-1 justify-between">
              <div>
                <h3 className="text-gray-800 dark:text-[#d2e5f5] font-bold text-lg">
                  {p.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-[#abc2d3]/80 mt-1">
                  Ends in: {calculateTimeLeft(p.offerEnd)}
                </p>
                <p className="text-green-500 font-medium text-sm mt-1">
                  You save: ${calculateSavings(p.price, p.offerPrice)}
                </p>
                <p className="text-red-500 font-bold text-lg mt-2">
                  ${p.offerPrice}{" "}
                  <span className="line-through text-gray-400 text-sm ml-2">
                    ${p.price}
                  </span>
                </p>
                <Link to={`/product-details/${p._id}`}>
                  <button className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full transition">
                    <FaBolt />
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default AllOffers;
