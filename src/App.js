import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import PageNotFound from "./pages/PageNotFound";
import "./App.css";
import ProductDetail from "./pages/ProductDetail";
import AppLayout from "./Components/AppLayout";
import Login from "./pages/Login";
import Other from "./pages/Other";
import AddProduct from "./pages/AddProduct";
import RequestProduct from "./pages/RequestProduct";

import { CartProvider } from "./context/CartContext";
import Checkout from "./pages/Checkout";
import { useState } from "react";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import UserOrder from "./pages/UserOrder";
import AdminOrder from "./pages/AdminOrder";

function App() {
  const [visitedCart, setVisitedCart] = useState(false);

  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Products />} />
            <Route path="/:id" element={<ProductDetail />} />
            <Route path="cart" element={<Cart />} />
            <Route path="other" element={<Other />} />
            <Route path="request" element={<RequestProduct />} />
            <Route path="addProduct" element={<AddProduct />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="success" element={<Success />} />
            <Route path="cancel" element={<Cancel />} />
            <Route path="userOrder" element={<UserOrder />} />
            <Route path="adminOrders" element={<AdminOrder />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
