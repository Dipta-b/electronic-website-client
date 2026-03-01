import React, { useState, useEffect } from "react";

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

    if (loading) return <p className="text-center mt-6">Loading...</p>;
    if (!products.length)
        return <p className="text-center mt-6">No products in {selected}</p>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Header & Category Buttons */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
                <h1 className="text-2xl font-bold">Bestseller in Category</h1>
                <div className="flex gap-2 flex-wrap">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={(e) => {
                                e.preventDefault();
                                setSelected(cat);
                            }}
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
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products.map((p) => (
                    <div
                        key={p._id}
                        className="bg-neutral-primary-soft block p-6 border border-default rounded-base shadow-xs"
                    >
                        <a href="#">
                            <img
                                className="rounded-base w-full h-48 object-cover"
                                src={p.image || "/placeholder.jpg"}
                                alt={p.name}
                            />
                        </a>
                        <a href="#">
                            <h5 className="mt-4 mb-2 text-xl font-semibold tracking-tight text-heading">
                                {p.name}
                            </h5>
                        </a>
                        {p.price && (
                            <p className="mb-2 text-body font-medium">Price: ${p.price}</p>
                        )}
                        {p.specifications && (
                            <p className="mb-4 text-body text-sm line-clamp-3">
                                {p.specifications}
                            </p>
                        )}
                        <div className="flex gap-2 mt-auto">
                            <button className="flex-1 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors duration-300">
                                Add to Cart
                            </button>
                            <button className="flex-1 border border-gray-300 px-3 py-1 rounded hover:bg-gray-100 transition-colors duration-300">
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BestsellerCategory;