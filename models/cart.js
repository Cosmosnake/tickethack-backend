const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
  destination: String,
  time: String,
  price: String,
  isPaid: Boolean,
});

const Cart = mongoose.model("carts", CartSchema);

module.exports = Cart;
