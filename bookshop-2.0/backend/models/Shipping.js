import mongoose from "mongoose";

const ShippingSchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order", // A szállítási információhoz tartozó rendelés referencia
    required: true,
  },
  trackingNumber: {
    type: String,
    required: true, // A csomag nyomkövetési száma
  },
  carrier: {
    type: String,
    required: true, // A szállítási szolgáltató neve
  },
  estimatedDeliveryDate: Date, // Becsült szállítási időpont
  status: {
    type: String,
    enum: ["Under process", "Under delivery", "delivered"],
    default: "Under process", // A szállítás állapota
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Az 'updatedAt' mező frissítése minden módosításnál
ShippingSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const Shipping = mongoose.model("Shipping", ShippingSchema);

export default Shipping;
