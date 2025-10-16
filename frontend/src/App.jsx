import React, { useState, useMemo, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

import HomeScreen from "./screens/HomeScreen";
import CartScreen from "./screens/CartScreen";
import ProductScreen from "./screens/ProductScreen";
import CheckoutScreen from "./screens/CheckoutScreen";
import ResponsiveAppBar from "./layouts/Navbar";

function App() {
  const [mode, setMode] = useState("light");
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: "#3396D3" },
        },
      }),
    [mode]
  );

  const toggleDarkMode = () =>
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));

  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const [appliedDiscount, setAppliedDiscount] = useState(0);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <ResponsiveAppBar
          setSearchTerm={setSearchTerm}
          toggleDarkMode={toggleDarkMode}
          mode={mode}
        />
        <Routes>
          <Route path="/" element={<HomeScreen searchTerm={searchTerm} />} />
          <Route
            path="/cart"
            element={
              <CartScreen
                cartItems={cartItems}
                setCartItems={setCartItems}
                appliedDiscount={appliedDiscount}
                setAppliedDiscount={setAppliedDiscount}
              />
            }
          />
          <Route
            path="/checkout"
            element={
              <CheckoutScreen
                cartItems={cartItems}
                appliedDiscount={appliedDiscount}
              />
            }
          />
          <Route path="/product/:id" element={<ProductScreen />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
