import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "../../auth/AuthContext";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const { user } = useContext(AuthContext); // ✅ SAFE HERE

    const [cartItems, setCartItems] = useState([]);

    // Load cart when user logs in
    useEffect(() => {
        if (!user) return;

        const fetchCart = async () => {
            try {
                const res = await fetch("https://electronic-website-server.vercel.app/cart", {
                    credentials: "include",
                });
                const data = await res.json();
                
                let parsed = [];
                if (Array.isArray(data)) parsed = data;
                else if (data.items) parsed = data.items;
                else if (data.cart) parsed = data.cart;
                else if (data.products) parsed = data.products;
                else if (data.cartItems) parsed = data.cartItems;
                else {
                    const arrVal = Object.values(data).find(Array.isArray);
                    if (arrVal) parsed = arrVal;
                }
                setCartItems(parsed);
            } catch (err) {
                console.error(err);
            }
        };

        fetchCart();
    }, [user]);

    const syncCart = async (updatedItems) => {
        setCartItems(updatedItems);

        if (!user) return;

        await fetch("https://electronic-website-server.vercel.app/cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ items: updatedItems }),
        });
    };

    const addToCart = (product, qty = 1, isUpdate = false) => {
        const safeItems = Array.isArray(cartItems) ? cartItems : [];
        let updated = [...safeItems];
        const index = updated.findIndex(i => i._id === product._id);

        if (index > -1) {
            if (isUpdate) {
                updated[index].quantity += qty;
                if (updated[index].quantity <= 0) {
                    updated.splice(index, 1);
                }
            } else {
                window.alert("Already added! Please check your cart.");
                return; // Prevent duplicate addition
            }
        } else {
            updated.push({ ...product, quantity: qty });
            if (!isUpdate) window.alert("Item successfully added to cart!");
        }

        syncCart(updated);
    };

    const removeFromCart = (id) => {
        const safeItems = Array.isArray(cartItems) ? cartItems : [];
        const updated = safeItems.filter(i => i._id !== id);
        syncCart(updated);
    };

    const clearCart = () => syncCart([]);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};