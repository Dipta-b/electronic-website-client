import React, { useState } from "react";
import { useCart } from "./shared/CartContext";

const CartPage = () => {
    const { cartItems, addToCart, removeFromCart, clearCart } = useCart();
    const [coupon, setCoupon] = useState("");
    const [shippingFee, setShippingFee] = useState(0);

    // 🔥 Correct price logic
    const getProductPrice = (item) => {
        if (item.offerActive && item.offerPrice) {
            return Number(item.offerPrice);
        }
        return Number(item.price) || 0;
    };

    // Calculate subtotal correctly
    const subtotal = cartItems.reduce((acc, item) => {
        const price = getProductPrice(item);
        const quantity = Number(item.quantity) || 1;
        return acc + price * quantity;
    }, 0);

    const handleApplyCoupon = () => {
        if (coupon === "SAVE10") {
            alert("Coupon applied! 10% discount");
        } else {
            alert("Invalid coupon");
        }
    };

    const handleShippingChange = (fee) => setShippingFee(Number(fee));

    return (
        <div className="max-w-7xl mx-auto px-4 py-16">
            <h1 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white mb-10 tracking-tight">Shopping Cart</h1>

            {cartItems.length === 0 ? (
                <div className="bg-white dark:bg-slate-800 p-10 rounded-3xl premium-shadow text-center">
                    <p className="text-slate-500 dark:text-slate-400 text-lg">Your cart is currently empty.</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-12 gap-10">
                    {/* Cart Table */}
                    <div className="md:col-span-8 overflow-x-auto bg-white dark:bg-slate-800 rounded-3xl premium-shadow p-2 sm:p-6 mb-6">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-100 dark:border-slate-700/60 pb-4 text-sm uppercase tracking-wider text-slate-400 font-semibold">
                                    <th className="px-4 py-4">Product</th>
                                    <th className="px-4 py-4">Price</th>
                                    <th className="px-4 py-4">Quantity</th>
                                    <th className="px-4 py-4">Subtotal</th>
                                    <th className="px-4 py-4 text-center">Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item) => {
                                    const price = getProductPrice(item);
                                    const quantity = Number(item.quantity) || 1;
                                    const subtotalItem = price * quantity;

                                    return (
                                        <tr key={item._id} className="border-b border-slate-50/50 dark:border-slate-700/30 hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors group">
                                            <td className="px-4 py-6 flex items-center gap-5">
                                                <div className="w-24 h-24 bg-[#f8fafc] dark:bg-slate-900/50 rounded-2xl flex items-center justify-center p-3 overflow-hidden">
                                                    <img
                                                        src={item.image || item.imageInput || "/placeholder.jpg"}
                                                        alt={item.name}
                                                        className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                </div>
                                                <span className="font-bold text-[16px] text-slate-800 dark:text-slate-200">{item.name}</span>
                                            </td>

                                            {/* 🔥 Price Column */}
                                            <td className="px-4 py-4">
                                                {item.offerActive && item.offerPrice ? (
                                                    <div>
                                                        <span className="text-[#ef4444] font-bold text-lg">
                                                            ${Number(item.offerPrice).toFixed(2)}
                                                        </span>
                                                        <br />
                                                        <span className="line-through text-slate-400 text-sm font-medium">
                                                            ${Number(item.price).toFixed(2)}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span className="font-bold text-slate-700 dark:text-slate-300 text-lg">${price.toFixed(2)}</span>
                                                )}
                                            </td>

                                            {/* Quantity */}
                                            <td className="px-4 py-4">
                                                <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-800/80 w-fit p-1.5 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm">
                                                    <button
                                                        onClick={() => addToCart(item, -1)}
                                                        className="w-8 h-8 rounded-full bg-white dark:bg-slate-700 font-bold hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="w-6 text-center font-bold text-slate-800 dark:text-white">{quantity}</span>
                                                    <button
                                                        onClick={() => addToCart(item, 1)}
                                                        className="w-8 h-8 rounded-full bg-white dark:bg-slate-700 font-bold hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </td>

                                            {/* Subtotal */}
                                            <td className="px-4 py-4 font-black text-cyan-600 dark:text-cyan-400 text-lg">
                                                ${subtotalItem.toFixed(2)}
                                            </td>

                                            {/* Remove */}
                                            <td className="px-4 py-4 text-center">
                                                <button
                                                    onClick={() => removeFromCart(item._id)}
                                                    className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-900/20 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center mx-auto transition-all text-xl font-bold"
                                                >
                                                    ×
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        {/* Coupon */}
                        <div className="mt-8 flex gap-3 p-4 bg-slate-50 dark:bg-slate-700/30 rounded-2xl">
                            <input
                                type="text"
                                placeholder="Have a coupon code?"
                                value={coupon}
                                onChange={(e) => setCoupon(e.target.value)}
                                className="flex-1 px-5 py-3 rounded-full border border-slate-200 focus:border-[#38bdf8] focus:ring-[3px] focus:ring-[#38bdf8]/15 outline-none dark:bg-slate-800 dark:border-slate-700 dark:text-white transition-all premium-inner-shadow"
                            />
                            <button
                                onClick={handleApplyCoupon}
                                className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold px-8 rounded-full hover:shadow-lg hover:-translate-y-0.5 transition-all"
                            >
                                Apply
                            </button>
                        </div>
                    </div>

                    {/* Cart Totals */}
                    <div className="md:col-span-4 bg-white dark:bg-slate-800 p-8 rounded-3xl premium-shadow border border-slate-100 dark:border-slate-700/60 h-fit sticky top-28">
                        <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-6 border-b border-slate-100 dark:border-slate-700 pb-4">Order Summary</h2>

                        <div className="flex justify-between mb-4 text-slate-600 dark:text-slate-300 font-medium">
                            <span>Subtotal</span>
                            <span className="font-bold text-slate-800 dark:text-slate-100">${subtotal.toFixed(2)}</span>
                        </div>

                        <div className="mb-6 pb-6 border-b border-slate-100 dark:border-slate-700">
                            <label className="block mb-3 font-semibold text-sm text-slate-500 uppercase tracking-wider">Shipping Method</label>
                            <select
                                className="w-full border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 rounded-xl px-4 py-3 font-medium outline-none focus:border-[#38bdf8] focus:ring-[2px] focus:ring-[#38bdf8]/15 transition-all text-slate-700 dark:text-slate-200"
                                onChange={(e) => handleShippingChange(Number(e.target.value))}
                            >
                                <option value={0}>Free Delivery (+$0.00)</option>
                                <option value={20}>Express Shipping (+$20.00)</option>
                            </select>
                        </div>

                        <div className="flex justify-between items-end mb-8">
                            <span className="text-lg font-bold text-slate-500">Total</span>
                            <span className="text-3xl font-black text-cyan-600 dark:text-cyan-400">
                                ${(subtotal + shippingFee).toFixed(2)}
                            </span>
                        </div>

                        <button className="w-full bg-linear-to-r from-[#0ea5e9] to-[#2563eb] text-white py-4 rounded-full font-bold text-lg hover:shadow-[0_6px_20px_rgba(14,165,233,0.35)] hover:-translate-y-1 transition-all duration-300">
                            Proceed to Checkout
                        </button>

                        <button
                            onClick={clearCart}
                            className="w-full py-4 mt-3 rounded-full font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                        >
                            Clear Cart
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;