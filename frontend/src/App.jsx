import React, { useState, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

import HomeScreen from "./screens/HomeScreen";
import CartScreen from "./screens/CartScreen";
import ProductScreen from "./screens/ProductScreen";
import CheckoutScreen from "./screens/CheckoutScreen";
import ResponsiveAppBar from "./layouts/Navbar";

// ✅ Import your CartProvider (which uses useCart internally)
import { CartProvider } from "./context/CartContext";

function App() {
  const [mode, setMode] = useState("light");
  const [searchTerm, setSearchTerm] = useState("");

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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* ✅ Wrap the entire app with CartProvider */}
      <CartProvider>
        <Router>
          <ResponsiveAppBar
            setSearchTerm={setSearchTerm}
            toggleDarkMode={toggleDarkMode}
            mode={mode}
          />

          <Routes>
            <Route path="/" element={<HomeScreen searchTerm={searchTerm} />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/checkout" element={<CheckoutScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
          </Routes>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;