import React, { useState, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline, IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";

import LandingScreen from "./screens/LandingScreen";
import HomeScreen from "./screens/HomeScreen";
import CartScreen from "./screens/CartScreen";
import ProductScreen from "./screens/ProductScreen";

function App() {
  const [mode, setMode] = useState("light");

  // memoize the theme to avoid recreation on every render
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode, // 👈 switches between light/dark
          primary: {
            main: "#3396D3",
          },
        },
      }),
    [mode]
  );

  const toggleDarkMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> 
      <Router>
        <div style={{ position: "fixed", top: 16, right: 16, zIndex: 9999 }}>
          <IconButton onClick={toggleDarkMode} color="inherit">
            {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </div>
        <Routes>
          <Route path="/" element={<LandingScreen />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/product/:id" element={<ProductScreen />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
