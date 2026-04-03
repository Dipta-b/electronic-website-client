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
                setCartItems(Array.isArray(data) ? data : data.items || []);
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

    const addToCart = (product, qty = 1) => {
        let updated = [...cartItems];
        const index = updated.findIndex(i => i._id === product._id);

        if (index > -1) {
            updated[index].quantity += qty;
            if (updated[index].quantity <= 0) {
                updated.splice(index, 1);
            }
        } else {
            updated.push({ ...product, quantity: qty });
        }

        syncCart(updated);
    };

    const removeFromCart = (id) => {
        const updated = cartItems.filter(i => i._id !== id);
        syncCart(updated);
    };

    const clearCart = () => syncCart([]);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};