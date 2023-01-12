import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [Totalquantity, setTotalQuantity] = useState(0);

  let foundProduct;
  let index;

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

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice(
      (previousTotalPrice) =>
        previousTotalPrice - foundProduct.price * foundProduct.quantity
    );
    setTotalQuantity(
      (previousQuantity) => previousQuantity - foundProduct.quantity
    );

    setCartItems(newCartItems);
  };

  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id);
    if (value === "inc") {
      foundProduct.quantity += 1;
      setCartItems([
        ...newCartItems,
        { ...foundProduct, quantity: foundProduct.quantity + 1 },
      ]);
      setTotalPrice(
        (previousTotalPrice) => previousTotalPrice + foundProduct.price
      );
      setTotalQuantity((previousTotalQuantity) => previousTotalQuantity + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        setCartItems([
          ...newCartItems,
          { ...foundProduct, quantity: foundProduct.quantity - 1 },
        ]);
        setTotalPrice(
          (previousTotalPrice) => previousTotalPrice - foundProduct.price
        );
        setTotalQuantity((previousTotalQuantity) => previousTotalQuantity - 1);
      }
    }
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
        setShowCart,
        cartItems,
        totalPrice,
        Totalquantity,
        quantity,
        incQuantity,
        decQuantity,
        onAdd,
        toggleCartItemQuantity,
        onRemove,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
