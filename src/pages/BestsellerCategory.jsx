import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "./shared/CartContext";
import { FaCartPlus } from "react-icons/fa6";

function BestsellerCategory() {
  const categories = ["mobile", "laptop", "electronics", "accessories"];
  const [selected, setSelected] = useState("mobile");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  console.log(products);
  // Fetch products by category
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:5000/products/category/${selected}`,
        );
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
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
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header & Category Buttons */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
        <h1 className="text-4xl font-bold">
          {" "}
          <span className="text-2xl font-bold bg-gradient-to-r from-[#A66BB8] via-[#824694] to-[#5E2F6D] bg-clip-text text-transparent text-4xl">
            Bestsellers
          </span>{" "}
          in Category
        </h1>
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              type="button"
              key={cat}
              onClick={() => setSelected(cat)}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300
                                   ${
                                     selected === cat
                                       ? "bg-[#4732d1] text-white"
                                       : "bg-gray-200 text-black hover:bg-[#4732d1] hover:text-white"
                                   }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      {/* Product Grid */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 min-h-[400px]">
        {loading ? (
          Array(4)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="bg-gray-200 h-64 rounded animate-pulse"
              ></div>
            ))
        ) : products.length > 0 ? (
          products.slice(0, 6).map(
            (
              p, // show only 6 here
            ) => (
              <div
                key={p._id}
                className="w-full md:w-[55%] border border-gray-300 rounded-lg relative overflow-hidden"
              >
                <img alt="product/image" src={p.image} className="w-full" />
                <div className="mt-2 p-4">
                  <span className="text-gray-400 dark:text-slate-400 text-[0.9rem]">
                    {p.category.toUpperCase()}
                  </span>
                  <h3 className=" dark:text-[#abc2d3] font-semibold mt-2">
                    {p.name}
                  </h3>
                  <div className="flex justify-between items-center mt-2 border-t border-gray-200 pt-2">
                    <p className="text-[1.1rem] font-semibold mt-1 text-[#0FABCA]">
                      ${Number(p.price || 0).toFixed(2)}
                    </p>
                    <button
                      onClick={() => addToCart(p, 1)}
                      className=" text-black px-4 py-2 rounded "
                    >
                      <FaCartPlus />
                    </button>
                  </div>
                </div>
              </div>
            ),
          )
        ) : (
          <p className="text-center col-span-full mt-6">
            No products in {selected}
          </p>
        )}
      </div>

      {/* View All Button */}
      <div className="flex justify-center mt-6">
        <Link
          to={`/category/${selected}`}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          View All
        </Link>
      </div>
    </div>
  );
}

export default BestsellerCategory;
