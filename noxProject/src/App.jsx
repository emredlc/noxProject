import "./App.css";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import About from "./pages/About.jsx";
import Cart from "./pages/Cart.jsx";
import Favourites from "./pages/Favourites.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import NotFound404 from "./pages/NotFound404.jsx";
import NoxBook from "./pages/NoxBook.jsx";
import NoxBuds from "./pages/NoxBuds.jsx";
import NoxPhone from "./pages/NoxPhone.jsx";
import NoxView from "./pages/NoxView.jsx";
import NoxWatch from "./pages/NoxWatch.jsx";
import Signup from "./pages/Signup.jsx";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import { AppProvider } from "./context/AppContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx"

function App() {
  return (
    <>



    <AppProvider>
      <Header />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>}></Route>
            <Route path="/favourites" element={<ProtectedRoute><Favourites /></ProtectedRoute>}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="*" element={<NotFound404 />}></Route>
            <Route path="/noxBook" element={<NoxBook />}></Route>
            <Route path="/noxBuds" element={<NoxBuds />}></Route>
            <Route path="/noxPhone" element={<NoxPhone />}></Route>
            <Route path="/noxView" element={<NoxView />}></Route>
            <Route path="/noxWatch" element={<NoxWatch />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/product-detail/:id" element={<ProductDetail />}></Route>
          </Routes>
        <Footer />
      </AppProvider>
      
    </>
  );
}

export default App;
