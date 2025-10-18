import { useEffect } from "react";
import { useCart } from "../context/CartContext";
import { getCart } from "../api/cart";

import { Container, Typography, Button, Box, Divider } from "@mui/material";

function CartScreen() {
  const { cartItems, removeFromCart, clearCart } = useCart();

  useEffect(() => {
    const fetchCart = async () => {
      const cart = await getCart();
      setCartItems(cart);
    };
    fetchCart();
  }, []);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        <>
          {cartItems.map((item) => (
            <Box
              key={item._id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
                p: 2,
                border: "1px solid #ccc",
                borderRadius: 2,
              }}
            >
              <Typography>{item.name}</Typography>
              <Typography>₱{item.price}</Typography>
              <Typography>Qty: {item.qty}</Typography>
              <Button
                variant="outlined"
                color="error"
                onClick={() => removeFromCart(item._id)}
              >
                Remove
              </Button>
            </Box>
          ))}

          <Divider sx={{ my: 2 }} />
          <Typography variant="h6">Total: ₱{total.toLocaleString()}</Typography>

          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ mr: 2 }}
              href="/checkout"
            >
              Proceed to Checkout
            </Button>
            <Button variant="outlined" color="error" onClick={clearCart}>
              Clear Cart
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
}

export default CartScreen;
