import React, { useState, useEffect } from "react";
import { runFireworks } from "../lib/utils";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";
import { useStateContext } from "../context/StateContext";

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantity } = useStateContext();
  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantity(0);
    runFireworks();
  }, []);
  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank You For Your Order!</h2>
        <p className="email-msg">Check your email for order confirmation!</p>
        <p className="description">
          If you have any questions please email
          <a className="email" href="mailto:order@ecomstore.com">
            order@ecomstore.com
          </a>
        </p>
        <Link href="/">
          <button type="button" width="300px" className="btn">
            Continue Shopping!
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
