import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null)
    const [isSeller, setIsSeller] = useState(false)
    const [showUserLogin, setShowUserLogin] = useState(false)

    const [cartItems, setCartItems] = useState({})

    const addToCart = async (itemId) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
    }

    const removeFromCart = async (itemId) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId] > 1) {
            cartData[itemId] -= 1;
        } else {
            delete cartData[itemId];
        }
        setCartItems(cartData);
    }

    const updateQuantity = async (itemId, quantity) => {
        let cartData = structuredClone(cartItems);
        if (quantity === 0) {
            delete cartData[itemId];
        } else {
            cartData[itemId] = quantity;
        }
        setCartItems(cartData);
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            try {
                if (cartItems[items] > 0) {
                    totalCount += cartItems[items];
                }
            } catch (error) { }
        }
        return totalCount;
    }

    const value = {
        user,
        setUser,
        isSeller,
        setIsSeller,
        navigate,
        showUserLogin,
        setShowUserLogin,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        getCartCount
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}
export const useAppContext = () => {
    return useContext(AppContext)
}