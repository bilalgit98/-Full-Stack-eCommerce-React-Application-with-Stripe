import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState();
  const [quantity, setQuantity] = useState(1);
  const [Totalquantity, setTotalQuantity] = useState();

  const onAdd = (product, quantity) => {
    //check if product is in cart
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );
    setTotalPrice(
      (previousTotalPrice) => previousTotalPrice + product.price * quantity
    );

    setTotalQuantity(
      (previousTotalQuantity) => previousTotalQuantity + quantity
    );

    if (checkProductInCart) {
      const updateCartitems = cartItems.map((cartItem) => {
        if (cartItem._id === product._id)
          return {
            ...cartItem,
            quantity: cartItem.quantity + quantity,
          };
      });

      setCartItems(updateCartitems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
    console.log(`${quantity}, ${product.name} has been added to cart!`);
    toast.success(`${quantity}, ${product.name} has been added to cart!`);
  };

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
        onAdd,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
