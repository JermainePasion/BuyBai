import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  totalPrice: { type: Number, default: 0 },
});

const Cart = mongoose.model("Cart", CartSchema);
export default Cart;
