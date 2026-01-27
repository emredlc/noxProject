import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import noxLogo from "../../public/assets/noxLogoTransparent.png";
import { useState } from "react";
import { AppContext } from "../context/AppContext";

function Header() {
  const { state, dispatch } = useContext(AppContext);

  const navigate = useNavigate();

  const [logOut, setLogOut] = useState(false);

  let checkLogOut = async () => {
    try {
      // serverdaki user'i kapat
      if (state.userId) {
        await fetch(`http://localhost:3001/users/${state.userId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isAuth: false }),
        });
      }
    } catch (err) {
      console.log("Logout patch failed:", err);
    } finally {
      // UI state reset
      dispatch({ type: "LOGOUT" });

      // sadece appState temizle (clear değil)
      localStorage.removeItem("appState");

      // yönlendirme
      navigate("/", { replace: true });
    }
  };

  const menuItems = [
    { label: "📱 NoxPhone", to: "/noxPhone" },
    { label: "💻 NoxBook", to: "/noxBook" },
    { label: "⌚️ NoxWatch", to: "/noxWatch" },
    { label: "🎧 NoxBuds", to: "/noxBuds" },
    { label: "🖥️ NoxView", to: "/noxView" },
    { label: "About Us", to: "/about" },
    state.isAuth && { label: "👜 Cart", to: "/cart" },
    state.isAuth && { label: "❤️ Favourites", to: "/favourites" },
    !state.isAuth && { label: "Log In", to: "/login" },
    !state.isAuth && { label: "Sign Up", to: "/signup" },
    state.isAuth && { label: "Log Out", action: "logout" },
  ].filter(Boolean);

  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-black">
      <nav className="mx-auto max-w-7xl px-6">
        <ul className="grid grid-cols-[auto_1fr_auto] h-12 items-center text-sm">
          {/* Top Left Logo */}
          <li className="flex items-center shrink-0">
            <Link to="/">
              <img
                src={noxLogo}
                alt="Nox Logo"
                className="h-8 w-auto object-contain"
              />
            </Link>
          </li>

          {/* Middle Navbar Links */}
          <li className="hidden lg:flex absolute left-1/2 -translate-x-1/2 gap-6 whitespace-nowrap">
            {menuItems.map((item) =>
              item.action === "logout" ? (
                <button
                  key={item.label}
                  onClick={checkLogOut}
                  className="text-white hover:text-gray-500 transition-colors"
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.label}
                  to={item.to}
                  className="text-white hover:text-gray-500 transition-colors"
                >
                  {item.label}
                </Link>
              )
            )}
          </li>

          {/* Hamburger Button For Mobile */}
          <button
            className="lg:hidden col-start-3 justify-self-end text-white text-xl"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            ☰
          </button>
        </ul>
      </nav>
      {mobileOpen && (
        <div className="lg:hidden bg-black border-t border-gray-800">
          <ul className="flex flex-col px-6 py-4 gap-4">
            {menuItems.map((item) =>
              item.action === "logout" ? (
                <button
                  key={item.label}
                  onClick={() => {
                    localStorage.clear();
                    dispatch({ type: "LOGOUT" });
                    setMobileOpen(false);
                    navigate("/", { replace: true });
                  }}
                  className="text-white hover:text-gray-400 transition-colors text-left"
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className="text-white hover:text-gray-400 transition-colors"
                >
                  {item.label}
                </Link>
              )
            )}
          </ul>
        </div>
      )}
    </header>
  );
}

export default Header;
