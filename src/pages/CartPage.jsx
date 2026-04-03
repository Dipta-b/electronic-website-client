import React, { useState } from "react";
import { useCart } from "./shared/CartContext";

const CartPage = () => {
    const { cartItems, addToCart, removeFromCart, clearCart, loading } = useCart();
    const [coupon, setCoupon] = useState("");
    const [shippingFee, setShippingFee] = useState(0);

    if (loading) return <div className="text-center py-20">Loading cart...</div>;

    const getProductPrice = (item) => item.offerActive && item.offerPrice ? Number(item.offerPrice) : Number(item.price) || 0;
    const safeCartItems = Array.isArray(cartItems) ? cartItems : [];

    const subtotal = safeCartItems.reduce((acc, item) => {
        const price = getProductPrice(item);
        const quantity = Number(item.quantity) || 1;
        return acc + price * quantity;
    }, 0);

    const handleApplyCoupon = () => {
        if (coupon === "SAVE10") alert("Coupon applied! 10% discount");
        else alert("Invalid coupon");
    };

    const handleShippingChange = (fee) => setShippingFee(Number(fee));

    return (
        <div className="max-w-7xl mx-auto px-4 py-16">
            <h1 className="text-3xl md:text-4xl font-black mb-10">Shopping Cart</h1>

            {safeCartItems.length === 0 ? (
                <div className="p-10 bg-white dark:bg-slate-800 rounded-3xl text-center">
                    <p>Your cart is empty.</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-12 gap-10">
                    {/* Cart Table */}
                    <div className="md:col-span-8 overflow-x-auto bg-white dark:bg-slate-800 rounded-3xl p-6">
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Qty</th>
                                    <th>Subtotal</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {safeCartItems.map((item) => {
                                    const price = getProductPrice(item);
                                    const quantity = Number(item.quantity) || 1;
                                    return (
                                        <tr key={item._id}>
                                            <td>{item.name}</td>
                                            <td>${price.toFixed(2)}</td>
                                            <td>
                                                <button onClick={() => addToCart(item, -1, true)}>-</button>
                                                {quantity}
                                                <button onClick={() => addToCart(item, 1, true)}>+</button>
                                            </td>
                                            <td>${(price * quantity).toFixed(2)}</td>
                                            <td>
                                                <button onClick={() => removeFromCart(item._id)}>×</button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        <div className="mt-6 flex gap-3">
                            <input
                                type="text"
                                placeholder="Coupon code"
                                value={coupon}
                                onChange={(e) => setCoupon(e.target.value)}
                            />
                            <button onClick={handleApplyCoupon}>Apply</button>
                        </div>
                    </div>

                    {/* Cart Summary */}
                    <div className="md:col-span-4 bg-white dark:bg-slate-800 p-6 rounded-3xl">
                        <h2>Order Summary</h2>
                        <div>
                            <span>Subtotal:</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div>
                            <label>Shipping</label>
                            <select onChange={(e) => handleShippingChange(Number(e.target.value))}>
                                <option value={0}>Free (+$0)</option>
                                <option value={20}>Express (+$20)</option>
                            </select>
                        </div>
                        <div>
                            <span>Total:</span>
                            <span>${(subtotal + shippingFee).toFixed(2)}</span>
                        </div>
                        <button>Proceed to Checkout</button>
                        <button onClick={clearCart}>Clear Cart</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;