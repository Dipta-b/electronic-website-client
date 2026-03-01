import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function BestsellerCategory() {
    const categories = ["mobile", "laptop", "electronics", "accessories"];
    const [selected, setSelected] = useState("mobile");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch products by category
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const res = await fetch(
                    `http://localhost:5000/products/category/${selected}`
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
                <h1 className="text-2xl font-bold">Bestseller in Category</h1>
                <div className="flex gap-2 flex-wrap">
                    {categories.map((cat) => (
                        <button
                            type="button" // ✅ prevent scroll jump
                            key={cat}
                            onClick={() => setSelected(cat)}
                            className={`px-4 py-2 rounded transition-colors duration-300 ${selected === cat
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                                }`}
                        >
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Product Grid */}
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 min-h-[400px]">
                {loading
                    ? // Show loading skeletons
                    Array(4)
                        .fill(0)
                        .map((_, i) => (
                            <div
                                key={i}
                                className="bg-gray-200 h-64 rounded animate-pulse"
                            ></div>
                        ))
                    : products.length > 0
                        ? products.map((p) => (
                            <div
                                key={p._id}
                                className="bg-white block p-4 border border-gray-200 rounded-lg shadow hover:shadow-md flex flex-col"
                            >
                                <div className="mb-4">
                                    <img
                                        className="w-full h-48 object-cover rounded-lg"
                                        src={p.image || "/placeholder.jpg"}
                                        alt={p.name}
                                    />
                                </div>
                                <div className="flex-1">
                                    <h5 className="text-lg font-semibold mb-2">{p.name}</h5>
                                    {p.price && (
                                        <p className="text-gray-700 mb-2 font-medium">
                                            Price: ${p.price}
                                        </p>
                                    )}
                                    {p.specifications && (
                                        <p className="text-gray-500 text-sm line-clamp-3">
                                            {p.specifications}
                                        </p>
                                    )}
                                </div>
                                <div className="flex gap-2 mt-4">
                                    <button className="flex-1 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors duration-300">
                                        Add to Cart
                                    </button>
                                    <Link
                                        to={`/products/${p._id}`}
                                        className="flex-1 border border-gray-300 px-3 py-1 rounded hover:bg-gray-100 transition-colors duration-300 text-center"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))
                        : // No products
                        <p className="text-center col-span-full mt-6">
                            No products in {selected}
                        </p>}
            </div>
        </div>
    );
}

export default BestsellerCategory;