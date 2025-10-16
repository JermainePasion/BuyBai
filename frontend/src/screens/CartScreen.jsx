import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Button,
  Divider,
  Stack,
  Container,
  useTheme,
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function CartScreen() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Corsair Vengeance RGB 32GB",
      price: 599,
      qty: 1,
      image:
        "https://cdn.thewirecutter.com/wp-content/media/2023/02/desktopram-2048px-corsairvengeancergb-2x1-1.jpg",
    },
    {
      id: 2,
      name: "Razer BlackWidow V4 Pro",
      price: 2499,
      qty: 1,
      image:
        "https://assets.razerzone.com/eeimages/products/32284/razer-blackwidow-v4-pro-hero.jpg",
    },
  ]);

  const increaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const handleCheckout = () => {
    navigate("/checkout", { state: { cartItems, totalPrice } });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: theme.palette.mode === "dark" ? "#121212" : "#f9fafb",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {cartItems.length === 0 ? (
          <Typography
            variant="h6"
            textAlign="center"
            color="text.secondary"
          >
            Your cart is empty.
          </Typography>
        ) : (
          <Grid
            container
            spacing={4}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={12} md={8}>
              <Stack spacing={3}>
                {cartItems.map((item) => (
                  <Card
                    key={item.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      p: 2,
                      borderRadius: 3,
                      boxShadow: 3,
                      bgcolor: theme.palette.background.paper,
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <CardMedia
                        component="img"
                        image={item.image}
                        alt={item.name}
                        sx={{
                          width: 100,
                          height: 100,
                          borderRadius: 2,
                          objectFit: "cover",
                        }}
                      />
                      <CardContent sx={{ p: 0 }}>
                        <Typography variant="subtitle1" fontWeight={600}>
                          {item.name}
                        </Typography>
                        <Typography color="text.secondary">
                          ₱{item.price.toLocaleString()}
                        </Typography>
                      </CardContent>
                    </Stack>

                    <Stack direction="row" alignItems="center" spacing={1}>
                      <IconButton
                        onClick={() => decreaseQty(item.id)}
                        size="small"
                        sx={{ bgcolor: "action.hover" }}
                      >
                        <Remove fontSize="small" />
                      </IconButton>
                      <Typography>{item.qty}</Typography>
                      <IconButton
                        onClick={() => increaseQty(item.id)}
                        size="small"
                        sx={{ bgcolor: "action.hover" }}
                      >
                        <Add fontSize="small" />
                      </IconButton>
                    </Stack>

                    <Stack alignItems="flex-end">
                      <Typography fontWeight={600}>
                        ₱{(item.price * item.qty).toLocaleString()}
                      </Typography>
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => removeItem(item.id)}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Stack>
                  </Card>
                ))}
              </Stack>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  p: 3,
                  borderRadius: 3,
                  boxShadow: 3,
                  bgcolor: theme.palette.background.paper,
                }}
              >
                <Typography variant="h6" fontWeight="600" gutterBottom>
                  Order Summary
                </Typography>

                <Stack spacing={1} sx={{ mb: 2 }}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography color="text.secondary">Items:</Typography>
                    <Typography>{cartItems.length}</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography color="text.secondary">Subtotal:</Typography>
                    <Typography>₱{totalPrice.toLocaleString()}</Typography>
                  </Stack>
                </Stack>

                <Divider sx={{ my: 2 }} />

                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="h6" fontWeight="600">
                    Total:
                  </Typography>
                  <Typography variant="h6" fontWeight="600">
                    ₱{totalPrice.toLocaleString()}
                  </Typography>
                </Stack>

                <Button
                  fullWidth
                  variant="contained"
                  color="success"
                  sx={{
                    mt: 3,
                    py: 1.4,
                    fontWeight: "bold",
                    "&:hover": { bgcolor: "success.dark" },
                  }}
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </Button>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
}

export default CartScreen;
