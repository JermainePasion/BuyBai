import { useEffect } from "react";
import { useCartContext } from "../context/CartContext";
import { getCart } from "../api/cart";
import {
  Container,
  Typography,
  Button,
  Box,
  Divider,
  Card,
  CardContent,
  IconButton,
  Paper,
  Grid,
  Chip,
  Stack,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import RemoveShoppingCartOutlinedIcon from "@mui/icons-material/RemoveShoppingCartOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

function CartScreen() {
  const { cartItems, removeFromCart, clearCart, setCartItems } = useCartContext();

  useEffect(() => {
    const fetchCart = async () => {
      const cart = await getCart();
      setCartItems(cart);
    };
    fetchCart();
  }, []);

  const updateQuantity = (itemId, newQty) => {
    if (newQty < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item._id === itemId ? { ...item, qty: newQty } : item
      )
    );
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      <Box sx={{ mb: 4 }}>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
          <ShoppingCartOutlinedIcon sx={{ fontSize: 32, color: "primary.main" }} />
          <Typography variant="h4" fontWeight="600">
            Shopping Cart
          </Typography>
          {cartItems.length > 0 && (
            <Chip
              label={`${cartItems.length} item${cartItems.length !== 1 ? "s" : ""}`}
              color="primary"
              size="small"
            />
          )}
        </Stack>
        <Typography variant="body2" color="text.secondary">
          Review your items before checkout
        </Typography>
      </Box>

      {cartItems.length === 0 ? (
        <Paper
          elevation={0}
          sx={{
            p: 6,
            textAlign: "center",
            bgcolor: "grey.50",
            borderRadius: 3,
          }}
        >
          <RemoveShoppingCartOutlinedIcon
            sx={{ fontSize: 80, color: "grey.300", mb: 2 }}
          />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Your cart is empty
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Add some items to get started!
          </Typography>
          <Button variant="contained" href="/" size="large">
            Continue Shopping
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Stack spacing={2}>
              {cartItems.map((item) => (
                <Card
                  key={item._id}
                  elevation={0}
                  sx={{
                    border: "1px solid",
                    borderColor: "grey.200",
                    borderRadius: 2,
                    transition: "all 0.2s",
                    "&:hover": {
                      borderColor: "primary.main",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    },
                  }}
                >
                  <CardContent>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} sm={4}>
                        <Typography variant="h6" fontWeight="500">
                          {item.name}
                        </Typography>
                      </Grid>
                      <Grid item xs={4} sm={2}>
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            Price
                          </Typography>
                          <Typography variant="body1" fontWeight="600">
                            ₱{item.price.toLocaleString()}
                          </Typography>
                        </Box>
                      </Grid>

                      <Grid item xs={8} sm={3}>
                        <Box>
                          <Typography 
                            variant="caption" 
                            color="text.secondary" 
                            sx={{ mb: 0.5, display: "block" }}
                          >
                            Quantity
                          </Typography>
                          <Box
                            sx={{
                              display: "inline-flex",
                              alignItems: "center",
                              border: "1px solid",
                              borderColor: "grey.300",
                              borderRadius: 1,
                              overflow: "hidden",
                            }}
                          >
                            <IconButton
                              size="small"
                              onClick={() => updateQuantity(item._id, item.qty - 1)}
                              disabled={item.qty <= 1}
                              sx={{
                                borderRadius: 0,
                                borderRight: "1px solid",
                                borderColor: "grey.300",
                                px: 1,
                                "&:hover": {
                                  bgcolor: "grey.100",
                                },
                                "&.Mui-disabled": {
                                  bgcolor: "grey.50",
                                },
                              }}
                            >
                              <RemoveIcon fontSize="small" />
                            </IconButton>
                            <Typography
                              sx={{
                                px: 2.5,
                                py: 0.5,
                                fontWeight: 600,
                                minWidth: "45px",
                                textAlign: "center",
                                userSelect: "none",
                              }}
                            >
                              {item.qty}
                            </Typography>
                            <IconButton
                              size="small"
                              onClick={() => updateQuantity(item._id, item.qty + 1)}
                              sx={{
                                borderRadius: 0,
                                borderLeft: "1px solid",
                                borderColor: "grey.300",
                                px: 1,
                                "&:hover": {
                                  bgcolor: "grey.100",
                                },
                              }}
                            >
                              <AddIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </Box>
                      </Grid>

                      <Grid item xs={6} sm={2}>
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            Subtotal
                          </Typography>
                          <Typography
                            variant="body1"
                            fontWeight="600"
                            color="primary.main"
                          >
                            ₱{(item.price * item.qty).toLocaleString()}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6} sm={1} sx={{ textAlign: "right" }}>
                        <IconButton
                          color="error"
                          onClick={() => removeFromCart(item._id)}
                          sx={{
                            "&:hover": {
                              bgcolor: "error.light",
                              color: "white",
                            },
                          }}
                        >
                          <DeleteOutlineIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              ))}
            </Stack>

            <Box sx={{ mt: 2 }}>
              <Button
                variant="text"
                color="error"
                startIcon={<DeleteOutlineIcon />}
                onClick={clearCart}
                sx={{ textTransform: "none" }}
              >
                Clear entire cart
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              elevation={0}
              sx={{
                position: "sticky",
                top: 20,
                border: "1px solid",
                borderColor: "grey.200",
                borderRadius: 2,
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="600" gutterBottom>
                  Order Summary
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography color="text.secondary">
                    Subtotal ({cartItems.reduce((sum, item) => sum + item.qty, 0)}{" "}
                    items)
                  </Typography>
                  <Typography fontWeight="500">
                    ₱{total.toLocaleString()}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography color="text.secondary">Shipping</Typography>
                  <Typography fontWeight="500" color="success.main">
                    Calculated at checkout
                  </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 3,
                  }}
                >
                  <Typography variant="h6" fontWeight="600">
                    Total
                  </Typography>
                  <Typography variant="h6" fontWeight="600" color="primary.main">
                    ₱{total.toLocaleString()}
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  href="/checkout"
                  sx={{
                    py: 1.5,
                    textTransform: "none",
                    fontSize: "1rem",
                    fontWeight: 600,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    "&:hover": {
                      boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
                    },
                  }}
                >
                  Proceed to Checkout
                </Button>

                <Button
                  variant="outlined"
                  fullWidth
                  href="/"
                  sx={{
                    mt: 2,
                    py: 1,
                    textTransform: "none",
                    borderColor: "grey.300",
                    color: "text.primary",
                  }}
                >
                  Continue Shopping
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default CartScreen;