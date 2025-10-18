import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import TextField from "@mui/material/TextField";
import Badge from "@mui/material/Badge";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../context/CartContext"; // ✅ Add this import

const pages = [
  { name: "Products", path: "/" },
];

function Navbar({ setSearchTerm, toggleDarkMode, mode }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const navigate = useNavigate();
  const { cartItems } = useCartContext(); // ✅ Get cart items from context

  // ✅ Calculate total quantity
  const cartItemCount = cartItems.reduce((total, item) => total + item.qty, 0);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCartClick = () => {
    navigate("/cart");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#3396D3" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            BUY-BAI
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={() => {
                    navigate(page.path);
                    handleCloseNavMenu();
                  }}
                >
                  <Typography sx={{ textAlign: "center" }}>{page.name}</Typography>
                </MenuItem>
              ))}
              <MenuItem onClick={handleCartClick}>
          
                <Badge 
                  badgeContent={cartItemCount} 
                  color="error"
                  showZero={false}
                  sx={{ mr: 1 }}
                >
                  <ShoppingCartIcon />
                </Badge>
                Cart
              </MenuItem>
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={() => navigate(page.path)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <TextField
            variant="outlined"
            size="small"
            placeholder="Search products..."
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              backgroundColor: "white",
              input: { color: "black" },
              borderRadius: 1,
              mr: 2,
              width: { xs: "120px", sm: "200px", md: "250px" },
            }}
          />

          <IconButton onClick={toggleDarkMode} color="inherit" sx={{ mr: 1 }}>
            {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>

          <IconButton 
            color="inherit" 
            onClick={handleCartClick}
            sx={{
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 0.1)",
              }
            }}
          >
            <Badge 
              badgeContent={cartItemCount} 
              color="error"
              max={99}
              showZero={false}
              sx={{
                "& .MuiBadge-badge": {
                  fontWeight: 600,
                  fontSize: "0.75rem",
                }
              }}
            >
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;