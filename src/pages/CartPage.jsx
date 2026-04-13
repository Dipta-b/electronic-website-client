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
            <div className="flex items-center space-x-4 mb-10">
                <h1 className="text-4xl font-black text-gray-800 tracking-tight">Shopping Cart</h1>
                <span className="bg-indigo-100 text-indigo-600 px-4 py-1.5 rounded-full text-sm font-bold shadow-sm">{safeCartItems.length} items</span>
            </div>
            {safeCartItems.length === 0 ? (
                <div className="p-16 bg-white rounded-[2rem] shadow-sm border border-gray-100 text-center">
                    <div className="text-6xl mb-4">🛒</div>
                    <div className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</div>
                    <p className="text-gray-500">Looks like you haven't added anything to your cart yet.</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-12 gap-8 lg:gap-12">
                    <div className="md:col-span-8 bg-white rounded-[2rem] p-6 lg:p-8 shadow-sm border border-gray-100">
                        <div className="hidden sm:grid grid-cols-5 gap-4 pb-4 border-b border-gray-100 text-gray-400 text-xs font-bold uppercase tracking-wider mb-4">
                            <div className="col-span-2">Product Details</div>
                            <div className="text-center">Price</div>
                            <div className="text-center">Quantity</div>
                            <div className="text-right">Total</div>
                        </div>
                        
                        <div className="space-y-2">
                            {safeCartItems.map((item) => {
                                const price = getProductPrice(item);
                                const qty = Number(item.quantity) || 1;
                                return (
                                    <div key={item._id} className="grid grid-cols-1 sm:grid-cols-5 items-center gap-6 sm:gap-4 py-6 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors rounded-2xl sm:px-2">
                                        <div className="col-span-2 flex items-center space-x-4">
                                            <div className="h-20 w-20 sm:h-24 sm:w-24 bg-gray-50 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden border border-gray-100">
                                                {item.image || item.images?.[0] ? (
                                                    <img src={item.image || item.images?.[0]} alt={item.name} className="h-full w-full object-cover" />
                                                ) : (
                                                    <span className="text-3xl sm:text-4xl">🛍️</span>
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-800 line-clamp-2 leading-tight text-lg">{item.name}</h3>
                                                <button onClick={() => removeFromCart(item._id)} className="text-red-500 font-medium text-sm hover:text-red-700 mt-2 flex items-center transition-colors">
                                                    Remove item
                                                </button>
                                            </div>
                                        </div>
                                        
                                        <div className="flex justify-between items-center sm:hidden w-full text-gray-500 font-medium">
                                            <span>Price</span>
                                            <span>${price.toFixed(2)}</span>
                                        </div>
                                        <div className="text-center text-gray-500 sm:block hidden font-medium">
                                            ${price.toFixed(2)}
                                        </div>
                                        
                                        <div className="flex justify-between sm:justify-center items-center w-full">
                                            <span className="sm:hidden text-gray-500 font-medium">Quantity</span>
                                            <div className="flex items-center border-2 border-gray-100 rounded-full bg-white">
                                                <button onClick={() => addToCart(item, -1, true)} className="text-gray-400 hover:text-indigo-600 font-bold w-8 h-8 flex justify-center items-center transition-colors rounded-l-full hover:bg-gray-50">-</button>
                                                <span className="w-8 text-center font-bold text-gray-800">{qty}</span>
                                                <button onClick={() => addToCart(item, 1, true)} className="text-gray-400 hover:text-indigo-600 font-bold w-8 h-8 flex justify-center items-center transition-colors rounded-r-full hover:bg-gray-50">+</button>
                                            </div>
                                        </div>
                                        
                                        <div className="flex justify-between items-center sm:hidden w-full text-lg font-black text-gray-800 pt-2 border-t border-gray-50">
                                            <span>Total</span>
                                            <span>${(price * qty).toFixed(2)}</span>
                                        </div>
                                        <div className="text-right font-black text-gray-800 text-lg hidden sm:block">
                                            ${(price * qty).toFixed(2)}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="md:col-span-4">
                        <div className="bg-white p-6 lg:p-8 rounded-[2rem] shadow-sm border border-gray-100 sticky top-24">
                            <h2 className="text-2xl font-black mb-6 text-gray-800">Order Summary</h2>
                            
                            <div className="space-y-4 text-gray-600 mb-8">
                                <div className="flex justify-between items-center text-lg">
                                    <span className="font-medium">Subtotal</span>
                                    <span className="font-bold text-gray-800">${subtotal.toFixed(2)}</span>
                                </div>
                                
                                <div className="flex flex-col space-y-3 pb-6 border-b border-gray-100">
                                    <span className="font-medium text-gray-800">Shipping Estimate</span>
                                    <div className="relative">
                                        <select 
                                            className="w-full p-4 rounded-2xl border-2 border-gray-100 bg-white text-gray-700 font-medium focus:outline-none focus:border-indigo-500 focus:ring-0 transition-colors appearance-none cursor-pointer"
                                            onChange={(e) => setShippingFee(Number(e.target.value))}
                                        >
                                            <option value={0}>Standard Delivery (Free)</option>
                                            <option value={20}>Express Delivery (+$20.00)</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex justify-between items-end pt-2">
                                    <div>
                                        <span className="text-lg font-medium text-gray-800 block">Total</span>
                                        <span className="text-sm text-gray-400">Including taxes</span>
                                    </div>
                                    <span className="text-3xl font-black text-indigo-600">${(subtotal + shippingFee).toFixed(2)}</span>
                                </div>
                            </div>
                            
                            <div className="space-y-4 mt-4">
                                <button className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-lg shadow-[0_8px_30px_rgb(79,70,229,0.3)] hover:shadow-[0_8px_30px_rgb(79,70,229,0.5)] transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden group">
                                    <span className="relative z-10 flex items-center justify-center">
                                        Proceed to Checkout
                                        <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                    </span>
                                </button>
                                <button 
                                    onClick={clearCart} 
                                    className="w-full py-4 bg-gray-50 hover:bg-red-50 hover:text-red-600 text-gray-600 rounded-2xl font-bold transition-colors duration-300 border border-gray-100 hover:border-red-100"
                                >
                                    Clear Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;