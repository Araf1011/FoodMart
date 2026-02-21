import React from "react"
import Navbar from "./components/navbar"
import { Routes, Route, useLocation } from "react-router-dom"
import Home from "./pages/Home"
import Cart from "./pages/Cart"
import Product from "./pages/Product"
import Products from "./pages/Products"
import PlaceOrder from "./pages/PlaceOrder"
import MyOrders from "./pages/MyOrders"
import Login from "./pages/Login"
import Contact from "./pages/Contact"

const App = () => {
  const isSellerPath = useLocation().pathname.includes("seller")
  return (
    <div>
      {!isSellerPath && <Navbar />}
      <div className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"} min-h-screen`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:category" element={<Products />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </div>
  )
}

export default App  