import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import { useStateContext } from "../context/StateContext";
import { Cart } from "./";
const Navbar = () => {
  const { Totalquantity, setShowCart, showCart } = useStateContext();
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">Stripe Headphones Store </Link>
      </p>
      <button
        type="button"
        className="cart-icon"
        onClick={() => setShowCart(true)}
      >
        <AiOutlineShopping />
        <span className="cart-item-qty">{Totalquantity} </span>
      </button>
      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
