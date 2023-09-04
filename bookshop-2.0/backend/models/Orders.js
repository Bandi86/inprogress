import mongoose, { mongo } from "mongoose";

const OrdersSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true, // A rendelést leadó felhasználó referencia
      },
      products: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book",
            required: true, // A rendelt termék referencia
          },
          quantity: {
            type: Number,
            required: true, // A termék mennyisége a rendelésben
          },
          price: {
            type: Number,
            required: true, // A termék ára
          },
        },
      ],
      shippingAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ShippingAddress",
        required: true, // A szállítási cím referencia
      },
      status: {
        type: String,
        enum: ["Under process", "under delivery", "Delivered"],
        default: "Under process", // A rendelés állapota
      },
      totalAmount: {
        type: Number,
        required: true, // A rendelés teljes összege
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
    OrdersSchema.pre("save", function (next) {
      this.updatedAt = new Date();
      next();
    });

const Order = mongoose.model("Order", OrdersSchema)

export default Order