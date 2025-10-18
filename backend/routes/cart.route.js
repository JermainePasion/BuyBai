// routes/cart.route.js
const express = require("express");
const Product = require("../models/product.model");
const router = express.Router();

let cart = []; // 🧠 In-memory cart for simplicity

// 🛍 Get all items in cart
router.get("/", (req, res) => {
  res.json(cart);
});

// ➕ Add product to cart
router.put("/add", async (req, res) => {
  try {
    const product = req.body.payload;

    // Check if product exists in DB
    const dbProduct = await Product.findById(product._id);
    if (!dbProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if already in cart
    const existing = cart.find((item) => item._id === product._id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Error adding to cart", error: err.message });
  }
});

// 💳 Checkout (reduce product stock + clear cart)
router.post("/checkout", async (req, res) => {
  try {
    for (const item of cart) {
      const product = await Product.findById(item._id);
      if (product) {
        product.quantity = Math.max(product.quantity - item.qty, 0);
        await product.save();
      }
    }

    cart = []; // clear cart
    res.json({ message: "✅ Transaction completed successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Checkout failed", error: err.message });
  }
});

module.exports = router;
