import React, { useEffect, useState } from "react";

function LimitedOffers() {
    const [products, setProducts] = useState([]);
    const [timeNow, setTimeNow] = useState(new Date());

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const res = await fetch("http://localhost:5000/products");
                const data = await res.json();

                const activeOffers = data
                    .filter(
                        (p) => p.offerActive && new Date(p.offerEnd) > new Date()
                    )
                    .slice(0, 6);

                setProducts(activeOffers);
            } catch (err) {
                console.error(err);
            }
        };

        fetchOffers();

        const interval = setInterval(() => {
            setTimeNow(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const calculateTimeLeft = (endTime) => {
        const difference = new Date(endTime) - timeNow;
        if (difference <= 0) return "Expired";

        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor(
            (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor(
            (difference % (1000 * 60)) / 1000
        );

        return `${hours}h ${minutes}m ${seconds}s`;
    };

    const calculateDiscount = (price, offerPrice) => {
        return Math.round(((price - offerPrice) / price) * 100);
    };

    if (!products.length) return null;

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            {/* Grid Container */}
            <div className="grid md:grid-cols-2 gap-6">
                {products.map((p) => (
                    <div
                        key={p._id}
                        className="dark:bg-slate-800 bg-white shadow-md rounded-xl flex gap-6 p-4 transform transition duration-300 hover:scale-105 hover:shadow-xl"
                    >
                        {/* Image */}
                        <div className="w-[140px] h-[140px] flex-shrink-0 rounded-lg overflow-hidden">
                            <img
                                src={p.image || "/placeholder.jpg"}
                                alt={p.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Content */}
                        <div className="flex">
                            <div> <div className="flex flex-col flex-1">
                                <h1 className="text-[1.2rem] dark:text-[#abc2d3] font-bold">
                                    {p.name}
                                </h1>

                                <span className="text-[0.75rem] bg-red-500 text-white px-2 py-1 rounded w-fit mt-1">
                                    {calculateDiscount(p.price, p.offerPrice)}% OFF
                                </span>

                                <p className="text-red-500 font-bold mt-2">
                                    ${p.offerPrice}
                                    <span className="line-through text-gray-400 ml-3 text-sm">
                                        ${p.price}
                                    </span>
                                </p>

                                <p className="text-gray-600 mt-2 text-[0.85rem]">
                                    Ends in: {calculateTimeLeft(p.offerEnd)}
                                </p>


                            </div></div>
                            <div className="flex ml-[65px]"><div className="flex flex-wrap  gap-2 mt-auto pt-3">
                                <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm transition hover:bg-blue-600">
                                    Add to Cart
                                </button>

                                <button className="bg-green-500 text-white px-3 py-1 rounded text-sm transition hover:bg-green-600">
                                    Buy Now
                                </button>


                            </div></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LimitedOffers;