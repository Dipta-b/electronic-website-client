import React, { useState } from "react";
import { useCart } from "./shared/CartContext";

const CartPage = () => {
    const { cartItems, addToCart, removeFromCart, clearCart, loading } = useCart();
    console.log("cartItems", cartItems);
    const [coupon, setCoupon] = useState("");
    const [shippingFee, setShippingFee] = useState(0);

    if (loading) return <div className="text-center py-20">Loading cart...</div>;

    const getProductPrice = (item) => item.offerActive && item.offerPrice ? Number(item.offerPrice) : Number(item.price) || 0;
    const safeCartItems = Array.isArray(cartItems) ? cartItems : [];

    const subtotal = safeCartItems.reduce((acc, item) => acc + getProductPrice(item) * (item.quantity || 1), 0);


    return (
        <div className="max-w-7xl mx-auto px-4 py-16">
            <h1 className="text-3xl mb-10">Shopping Cart</h1>
            {safeCartItems.length === 0 ? (
                <div className="p-10 bg-white rounded-3xl text-center">Your cart is empty.</div>
            ) : (
                <div className="grid md:grid-cols-12 gap-10">
                    <div className="md:col-span-8 bg-white rounded-3xl p-6 overflow-x-auto">
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
                                    const qty = Number(item.quantity) || 1;
                                    return (
                                        <tr key={item._id}>
                                            <td>{item.name}</td>
                                            <td>${price.toFixed(2)}</td>
                                            <td>
                                                <button onClick={() => addToCart(item, -1, true)}>-</button>
                                                {qty}
                                                <button onClick={() => addToCart(item, 1, true)}>+</button>
                                            </td>
                                            <td>${(price * qty).toFixed(2)}</td>
                                            <td><button onClick={() => removeFromCart(item._id)}>×</button></td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    <div className="md:col-span-4 bg-white p-6 rounded-3xl">
                        <h2>Order Summary</h2>
                        <div>Subtotal: ${subtotal.toFixed(2)}</div>
                        <div>
                            Shipping:
                            <select onChange={(e) => setShippingFee(Number(e.target.value))}>
                                <option value={0}>Free (+$0)</option>
                                <option value={20}>Express (+$20)</option>
                            </select>
                        </div>
                        <div>Total: ${(subtotal + shippingFee).toFixed(2)}</div>
                        <button>Proceed to Checkout</button>
                        <button onClick={clearCart}>Clear Cart</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;