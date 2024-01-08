import mongoose from "mongoose";

const ShippingStatusSchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true, // A szállítás állapotának hozzárendelése egy rendeléshez
  },
  status: {
    type: String,
    enum: ["Under process", "Under delivery", "Delivered"],
    required: true, // A szállítás aktuális állapota
  },
  description: String, // Részletes leírás az adott státuszhoz (opcionális)
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const ShippingStatus = mongoose.model("ShippingStatus", ShippingStatusSchema);
export default ShippingStatus;
