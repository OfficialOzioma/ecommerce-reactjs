import { createContext, useState, useContext } from "react";
import { getProductById } from "../data/products";

const CartContext = createContext(null);
export default function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    function addToCart(productId) {
        const existingProduct = cartItems.find((item) => item.id === productId);
        if (existingProduct) {
            const currentQuantity = existingProduct.quantity;
            const updatedCartItems = cartItems.map((item) => item.id === productId ? { id: productId, quantity: currentQuantity + 1 } : item);
            setCartItems(updatedCartItems);
        } else {
            setCartItems([...cartItems, { id: productId, quantity: 1 }]);
        }
    }

    function getCartItemsWithProducts() {
        return cartItems
            .map((item) => ({
                ...item,
                product: getProductById(item.id),
            }))
            .filter((item) => item.product);
    }

    function removeFromCart(productId) {
        setCartItems(cartItems.filter((item) => item.id !== productId));
    }

    function updateQuantity(productId, quantity) {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setCartItems(
            cartItems.map((item) =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    }

    function getCartTotal() {
        const total = cartItems.reduce((total, item) => {
            const product = getProductById(item.id);
            return total + (product ? product.price * item.quantity : 0);
        }, 0);
        return total;
    }

    function clearCart() {
        setCartItems([]);
    }

    return (<CartContext.Provider value={{ cartItems, addToCart, getCartTotal, clearCart, getCartItemsWithProducts, updateQuantity, removeFromCart }}>{children}</CartContext.Provider>)
}

export function useCart() {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }

    return context;
}