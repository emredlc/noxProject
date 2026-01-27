import { useState, useEffect, useContext } from "react";
import CartProduct from "../components/CartProduct";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

function Favourites() {
  const navigate = useNavigate();
  const { state } = useContext(AppContext);

  //  EKSİK OLAN STATE
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        if (!state.isAuth) {
          navigate("/login");
          return;
        }

        const response = await fetch(
          `http://localhost:3001/users/${state.user.id}` //  userId değil
        );
        const user = await response.json();

        setItems(user.favourites || []);
      } catch (error) {
        console.log("Data error:", error);
      }
    };

    fetchItems();
  }, [state.user, state.isAuth, navigate]); //  doğru dependency

  const handleRemove = async (item) => {
    try {
      const res = await fetch(`http://localhost:3001/users/${state.user.id}`);
      const user = await res.json();

      const updatedFavourites = user.favourites.filter(
        (fav) => fav.productId !== item.productId
      );

      await fetch(`http://localhost:3001/users/${state.user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          favourites: updatedFavourites,
        }),
      });

      setItems((prev) => prev.filter((x) => x.productId !== item.productId));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <main className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8 pt-6">Favourites</h1>
        <div className="flex flex-col gap-4">
          <div>
            {items.length === 0 ? (
              <div className="flex flex-col items-start justify-start p-5 bg-gray-800 text-white rounded-lg shadow-md">
                <p>
                  You don't have any favourites,{" "}
                  <span className="font-bold text-red-500">YET!</span> Want to
                  buy some Nox experience?
                </p>
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
              <div>
                {items.map((item) => (
                  <CartProduct
                    key={item.productId} // id değil
                    item={item}
                    onIncrease={null}
                    onDecrease={null}
                    onRemove={handleRemove}
                    isCart={false}
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

export default Favourites;
