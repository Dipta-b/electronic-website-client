import React, { useEffect, useState } from "react";

function LimitedOffers() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const res = await fetch("http://localhost:5000/products");
                const data = await res.json();
                // Only active offers and not expired
                const activeOffers = data.filter(
                    p => p.offerActive && new Date(p.offerEnd) > new Date()
                );
                setProducts(activeOffers);
            } catch (err) {
                console.error(err);
            }
        };
        fetchOffers();
    }, []);

    const calculateTimeLeft = (endTime) => {
        const difference = new Date(endTime) - new Date();
        if (difference <= 0) return "Expired";
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        return `${hours}h ${minutes}m ${seconds}s`;
    };

    if (!products.length) return null;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">Limited Time Offers</h2>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products.map(p => (
                    <div key={p._id} className="border rounded p-4 flex flex-col shadow">
                        <img src={p.image || "/placeholder.jpg"} alt={p.name} className="h-48 w-full object-cover rounded" />
                        <h5 className="mt-2 font-semibold">{p.name}</h5>
                        <p className="text-red-500 font-bold">
                            ${p.offerPrice} <span className="line-through text-gray-500">${p.price}</span>
                        </p>
                        <p className="text-sm text-gray-600">Ends in: {calculateTimeLeft(p.offerEnd)}</p>
                        <div className="mt-auto flex gap-2">
                            <button className="flex-1 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Add to Cart</button>
                            <button className="flex-1 border border-gray-300 px-3 py-1 rounded hover:bg-gray-100">View Details</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LimitedOffers;