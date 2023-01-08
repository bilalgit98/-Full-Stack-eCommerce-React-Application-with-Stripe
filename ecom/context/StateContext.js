import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const stateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const [quantity, setQuantity] = useState(1);
  const [Totalquantity, setToQuantity] = useState();

  const incQuantity = () => {
    setQuantity((previousQuantity) => previousQuantity + 1);
  };

  const decQuantity = () => {
    setQuantity((previousQuantity) => {
      if (previousQuantity - 1 < 1) return 1;
      return previousQuantity - 1;
    });
  };
  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        Totalquantity,
        quantity,
        incQuantity,
        decQuantity,
      }}
    >
      {children}
    </Context.Provider>
  );
};
