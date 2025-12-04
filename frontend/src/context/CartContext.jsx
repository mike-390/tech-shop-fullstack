import { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext'; 

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // Load cart from LocalStorage (if exists) so it persists on refresh
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // get authentication status
    const { isAuthenticated } = useContext(AuthContext);

    // if user logs out, clear the cart immediately
    useEffect(() => {
        if (!isAuthenticated) {
            setCartItems([]); // clear state
            localStorage.removeItem('cart'); // clear browser storage
        }
    }, [isAuthenticated]); // runs every time login/logout status changes

    // save to LocalStorage whenever cart changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // add product to cart
    const addToCart = (product) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                // if exists, increase quantity
                return prev.map(item => 
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            // if new, add with quantity 1
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    // remove product from cart
    const removeFromCart = (productId) => {
        setCartItems(prev => prev.filter(item => item.id !== productId));
    };
    
    // clear cart 
    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cart');
    };

    // calculate Total
    const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, cartTotal }}>
            {children}
        </CartContext.Provider>
    );
};