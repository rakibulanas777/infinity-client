import { createContext, useContext, useState } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const addToCart = (product) => {
    const exist = cartItems.find((x) => x?._id === product?._id);
    if (exist) {
      setCartItems(
        cartItems.map((x) => (x?._id === product?._id ? { ...exist } : x))
      );
    } else {
      setCartItems([...cartItems, { ...product }]);
    }
  };
  const removeItem = (product) => {
    setCartItems(cartItems.filter((x) => x?._id !== product?._id));
  };

  return (
    <CartContext.Provider value={{ addToCart, removeItem, cartItems }}>
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartProvider, useCartContext };
