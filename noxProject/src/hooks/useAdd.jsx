import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export function useAdd() {
  const { state } = useContext(AppContext);
  const navigate = useNavigate();

  const [addedCart, setAddedCart] = useState(false);
  const [addedCartRed, setAddedCartRed] = useState(false);

  const addToCart = async (product) => {

    
    if (!state.isAuth) {
      navigate("/login");
      return;
    }

    try {
      // user'ı çek
      const res = await fetch(
        `http://localhost:3001/users/${state.user.id}`
      );
      const user = await res.json();

      const exists = user.cart.some(
        (item) => Number(item.productId) === Number(product.productId)
      );

      if (exists) {
        setAddedCartRed(true);
        setTimeout(() => setAddedCartRed(false), 1000);
        setTimeout(() => navigate("/cart"), 1000);
        return;
      }

      const updatedCart = [
        ...user.cart,
        {
          productId: product.productId,
          productName: product.productName,
          productPrice: product.productPrice,
          productImg: product.productImg,
          quantity: 1,
        },
      ];

      // user'ı PATCH et
      await fetch(`http://localhost:3001/users/${state.user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart: updatedCart,
        }),
      });

      setAddedCart(true);
      setTimeout(() => setAddedCart(false), 1000);

    } catch (error) {
      console.error("Add to cart error:", error);
    }
  };

  return {
    addToCart,
    addedCartRed,
    addedCart,
  };
}

export default useAdd;
