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
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

            {cartItems.length === 0 ? (
                <p className="text-gray-600">Your cart is empty.</p>
            ) : (
                <div className="grid md:grid-cols-12 gap-8">
                    {/* Cart Table */}
                    <div className="md:col-span-8 overflow-x-auto">
                        <table className="w-full table-auto border-collapse border border-gray-300">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 border-b">Product</th>
                                    <th className="px-4 py-2 border-b">Price</th>
                                    <th className="px-4 py-2 border-b">Quantity</th>
                                    <th className="px-4 py-2 border-b">Subtotal</th>
                                    <th className="px-4 py-2 border-b">Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item) => {
                                    const price = getProductPrice(item);
                                    const quantity = Number(item.quantity) || 1;
                                    const subtotalItem = price * quantity;

                                    return (
                                        <tr key={item._id} className="hover:bg-gray-50 transition">
                                            <td className="px-4 py-2 flex items-center gap-4">
                                                <img
                                                    src={item.image || item.imageInput || "/placeholder.jpg"}
                                                    alt={item.name}
                                                    className="w-20 h-20 object-cover rounded"
                                                />
                                                <span className="font-semibold">{item.name}</span>
                                            </td>

                                            {/* 🔥 Price Column */}
                                            <td className="px-4 py-2">
                                                {item.offerActive && item.offerPrice ? (
                                                    <div>
                                                        <span className="text-red-500 font-bold">
                                                            ${Number(item.offerPrice).toFixed(2)}
                                                        </span>
                                                        <br />
                                                        <span className="line-through text-gray-400 text-sm">
                                                            ${Number(item.price).toFixed(2)}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span>${price.toFixed(2)}</span>
                                                )}
                                            </td>

                                            {/* Quantity */}
                                            <td className="px-4 py-2 flex items-center gap-2">
                                                <button
                                                    onClick={() => addToCart(item, -1)}
                                                    className="px-2 py-1 bg-gray-200 rounded"
                                                >
                                                    -
                                                </button>
                                                <span>{quantity}</span>
                                                <button
                                                    onClick={() => addToCart(item, 1)}
                                                    className="px-2 py-1 bg-gray-200 rounded"
                                                >
                                                    +
                                                </button>
                                            </td>

                                            {/* Subtotal */}
                                            <td className="px-4 py-2">
                                                ${subtotalItem.toFixed(2)}
                                            </td>

                                            {/* Remove */}
                                            <td className="px-4 py-2">
                                                <button
                                                    onClick={() => removeFromCart(item._id)}
                                                    className="text-red-500"
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
                        <div className="mt-6 flex gap-2">
                            <input
                                type="text"
                                placeholder="Coupon code"
                                value={coupon}
                                onChange={(e) => setCoupon(e.target.value)}
                                className="px-3 py-2 border rounded"
                            />
                            <button
                                onClick={handleApplyCoupon}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Apply Coupon
                            </button>
                        </div>
                    </div>

                    {/* Cart Totals */}
                    <div className="md:col-span-4 bg-white p-6 rounded-lg shadow-md h-fit">
                        <h2 className="text-2xl font-bold mb-6">Cart Totals</h2>

                        <div className="flex justify-between mb-2">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2 font-semibold">Shipment</label>
                            <select
                                className="w-full border rounded px-3 py-2"
                                onChange={(e) => handleShippingChange(Number(e.target.value))}
                            >
                                <option value={0}>Free shipping</option>
                                <option value={20}>Flat rate: $20.00</option>
                            </select>
                        </div>

                        <div className="flex justify-between font-bold text-xl mb-6">
                            <span>Total</span>
                            <span>${(subtotal + shippingFee).toFixed(2)}</span>
                        </div>

                        <button className="w-full bg-blue-500 text-white py-3 rounded-lg">
                            Proceed to Checkout
                        </button>

                        <button
                            onClick={clearCart}
                            className="w-full border py-3 rounded-lg mt-3"
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