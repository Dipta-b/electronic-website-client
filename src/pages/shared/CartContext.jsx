import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../auth/AuthContext";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const { user, loading: userLoading } = useContext(AuthContext);

    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const hasLoaded = useRef(false); // prevent overwriting before initial load

    // ✅ Load cart after user is authenticated
    useEffect(() => {
        if (userLoading) return; // wait until auth check is complete
        if (!user) {
            setCartItems([]);
            setLoading(false);
            return;
        }

        const fetchCart = async () => {
            try {
                setLoading(true);

                const res = await fetch(
                    "https://electronic-website-server.vercel.app/cart",
                    { credentials: "include" }
                );

                const data = await res.json();
                const parsed = Array.isArray(data) ? data : data.items || [];
                setCartItems(parsed);
                hasLoaded.current = true; // mark initial load complete
            } catch (err) {
                console.error("Cart load error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, [user, userLoading]);

    // ✅ Sync cart to backend safely
    useEffect(() => {
        if (!user || !hasLoaded.current) return;

        const syncCart = async () => {
            try {
                await fetch(
                    "https://electronic-website-server.vercel.app/cart",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        credentials: "include",
                        body: JSON.stringify({ items: cartItems }),
                    }
                );
            } catch (err) {
                console.error("Cart sync error:", err);
            }
        };

        syncCart();
    }, [cartItems, user]);

    // ✅ Add to cart
    const addToCart = (product, qty = 1, isUpdate = false) => {
        setCartItems((prev) => {
            const safeItems = Array.isArray(prev) ? prev : [];
            let updated = [...safeItems];
            const index = updated.findIndex((i) => i._id === product._id);

            if (index > -1) {
                if (isUpdate) {
                    updated[index].quantity += qty;
                    if (updated[index].quantity <= 0) updated.splice(index, 1);
                } else {
                    window.alert("Already added! Check your cart.");
                    return prev;
                }
            } else {
                updated.push({ ...product, quantity: qty });
                if (!isUpdate) window.alert("Item successfully added!");
            }
            return updated;
        });
    };

    // ✅ Remove from cart
    const removeFromCart = (id) => {
        setCartItems((prev) => prev.filter((i) => i._id !== id));
    };

    // ✅ Clear cart
    const clearCart = async () => {
        setCartItems([]);
        if (!user) return;

        try {
            await fetch("https://electronic-website-server.vercel.app/cart", {
                method: "DELETE",
                credentials: "include",
            });
        } catch (err) {
            console.error("Cart clear error:", err);
        }
    };

    return (
        <CartContext.Provider
            value={{ cartItems, addToCart, removeFromCart, clearCart, loading }}
        >
            {children}
        </CartContext.Provider>
    );
};