import React, { useState, useEffect , useContext } from "react";
import CartProduct from "../components/CartProduct";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";


function Cart() {
  const { state } = useContext(AppContext);

  const navigate = useNavigate();

  const [items, setItems] = useState([]);

  useEffect(() => {
  const fetchItems = async () => {
    try {
      if (!state.user) return;

      const response = await fetch(
        `http://localhost:3001/users/${state.user.id}`
      );
      const data = await response.json();

      setItems(data.cart || []);
    } catch (error) {
      console.log("Data error:", error);
    }
  };

  fetchItems();
}, [state.user]);


  const handleIncrease = async (item) => {
  try {
    // user'ı çek
    const res = await fetch(
      `http://localhost:3001/users/${state.user.id}`
    );
    const user = await res.json();

    // cart içinden quantity artır (❗ productId ile)
    const updatedCart = user.cart.map((cartItem) =>
      cartItem.productId === item.productId
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );

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

    // UI güncelle
    setItems(updatedCart);

  } catch (error) {
    console.error("Increase error:", error);
  }
};


const handleDecrease = async (item) => {
  if (item.quantity === 1) return;

  try {
    // user'ı çek
    const res = await fetch(
      `http://localhost:3001/users/${state.user.id}`
    );
    const user = await res.json();

    // cart içinden quantity azalt (❗ productId ile)
    const updatedCart = user.cart.map((cartItem) =>
      cartItem.productId === item.productId
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );

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

    // UI güncelle
    setItems(updatedCart);

  } catch (error) {
    console.error("Decrease error:", error);
  }
};



  const handleRemove = async (item) => {
  try {
    // user'ı çek
    const res = await fetch(
      `http://localhost:3001/users/${state.user.id}`
    );
    const user = await res.json();

    // cart içinden sil (❗ productId ile)
    const updatedCart = user.cart.filter(
      (cartItem) => cartItem.productId !== item.productId
    );

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

    // UI güncelle
    setItems(updatedCart);

  } catch (error) {
    console.error("Delete error:", error);
  }
};


  return (
    <main className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8 pt-6">Cart</h1>
        <div>
          <div>
            {items.length === 0 ? (
              <div className="flex flex-col items-start justify-start p-5 bg-gray-800 text-white rounded-lg shadow-md">
                <p>Your Cart is Empty. Want to buy some Nox experience?</p>
                <div className="mt-3 flex items-left justify-left">
                  <p className="left pr-2">Go to:</p>
                  <button
                    className="text-sm hover:underline"
                    onClick={() => navigate("/")}
                  >
                    Home →
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {items.map((item) => (
                  <CartProduct
                     key={item.productId}
                    item={item}
                    onIncrease={handleIncrease}
                    onDecrease={handleDecrease}
                    onRemove={handleRemove}
                    isCart={true}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Cart;
