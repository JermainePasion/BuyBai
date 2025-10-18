import React, { useState } from "react";
import { useCart } from "../context/CartContext";

function CheckoutScreen() {
  const { cartItems, completeTransaction} = useCart();
  const [deliveryMethod, setDeliveryMethod] = useState("delivery");
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    country: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const applyDiscount = () => {
    if (discountCode.toUpperCase() === "SAVE10") {
      setAppliedDiscount(0.1);
      setDiscountError("");
    } else if (discountCode) {
      setDiscountError("Invalid discount code");
      setAppliedDiscount(0);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discount = subtotal * appliedDiscount;
  const shipping = subtotal > 0 ? 100 : 0;
  const total = subtotal - discount + shipping;

  const handlePayNow = async () => {
  if (window.confirm("Are you sure you want to complete this transaction?")) {
    await completeTransaction();
    alert("✅ Transaction Completed!");
  }

  if (window.confirm("Are you sure you want to complete this transaction?")) {
    completeTransaction();
    alert("✅ Transaction Completed!");
  }
};

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* LEFT SIDE — Shipping Info */}
        <div className="bg-white p-8 lg:p-12">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Checkout</h1>

            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Shipping information
              </h2>

              {/* Delivery Method */}
              <div className="flex gap-4 mb-6">
                <button
                  onClick={() => setDeliveryMethod("delivery")}
                  className={`flex-1 px-6 py-3 border-2 rounded-md text-left transition-all ${
                    deliveryMethod === "delivery"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                        deliveryMethod === "delivery"
                          ? "border-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {deliveryMethod === "delivery" && (
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      )}
                    </div>
                    <span className="font-medium">Delivery</span>
                  </div>
                </button>

                <button
                  onClick={() => setDeliveryMethod("pickup")}
                  className={`flex-1 px-6 py-3 border-2 rounded-md text-left transition-all ${
                    deliveryMethod === "pickup"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                        deliveryMethod === "pickup"
                          ? "border-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {deliveryMethod === "pickup" && (
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      )}
                    </div>
                    <span className="font-medium">Pick up</span>
                  </div>
                </button>
              </div>

              {/* FORM FIELDS */}
              <div className="space-y-4">
                {[
                  { name: "fullName", label: "Full Name", type: "text" },
                  { name: "email", label: "Email address", type: "email" },
                  { name: "phoneNumber", label: "Phone number", type: "tel" },
                ].map(({ name, label, type }) => (
                  <div key={name}>
                    <label className="block text-sm font-medium text-gray-900 mb-1">
                      {label} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type={type}
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      placeholder={`Enter ${label.toLowerCase()}`}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="">Choose country</option>
                    <option value="PH">Philippines</option>
                    <option value="US">United States</option>
                    <option value="UK">United Kingdom</option>
                  </select>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {["city", "state", "zipCode"].map((field) => (
                    <input
                      key={field}
                      type="text"
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                      className="col-span-1 px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE — Order Summary */}
        <div className="bg-gray-50 p-8 lg:p-12">
          <div className="max-w-xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Order Summary
            </h2>

            {cartItems.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <svg
                  className="w-20 h-20 mx-auto text-gray-300 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Your cart is empty
                </h2>
                <p className="text-gray-500 mb-4">
                  Add items before checking out
                </p>
              </div>
            ) : (
              <>
                <div className="bg-white rounded-lg p-4 mb-6">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Discount code"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      className={`flex-1 px-3 py-2 border ${
                        discountError ? "border-red-300" : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-blue-500`}
                    />
                    <button
                      onClick={applyDiscount}
                      className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      Apply
                    </button>
                  </div>
                  {discountError && (
                    <p className="text-sm text-red-600 mt-2">{discountError}</p>
                  )}
                </div>

                {/* Cart Items */}
                <div className="bg-white rounded-lg p-4 mb-4">
                  {cartItems.map((item) => (
                    <div
                      key={item._id}
                      className="flex justify-between items-center border-b border-gray-100 py-2"
                    >
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                      </div>
                      <p className="font-semibold">
                        ₱{(item.price * item.qty).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="bg-white rounded-lg p-6 space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold text-gray-900">
                      ₱{subtotal.toLocaleString()}
                    </span>
                  </div>
                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-green-600 text-sm">
                      <span>Discount ({(appliedDiscount * 100).toFixed(0)}%)</span>
                      <span>-₱{discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold text-gray-900">
                      ₱{shipping.toLocaleString()}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 flex justify-between">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="font-bold text-gray-900">
                      ₱{total.toLocaleString()}
                    </span>
                  </div>
                </div>

                <button onClick={handlePayNow}>
                  Pay Now
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutScreen;
