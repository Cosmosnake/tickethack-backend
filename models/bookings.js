const mongoose = require("mongoose");

const BookingSchema = mongoose.Schema({
  destination: String,
  time: Date,
  isPaid: Boolean,
});

const Booking = mongoose.model("bookings", BookingSchema);

module.exports = Booking;
