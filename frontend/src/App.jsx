import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingScreen from "./screens/LandingScreen";
import HomeScreen from "./screens/HomeScreen";
import CartScreen from "./screens/CartScreen";
import ProductScreen from "./screens/ProductScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingScreen />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/cart" element={<CartScreen />} />
        <Route path="/product/:id" element={<ProductScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
