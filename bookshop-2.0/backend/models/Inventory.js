import mongoose from "mongoose";

const InventorySchema = new mongoose.Schema({
    books: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book", // Az áru vagy termék referencia
        required: true,
      },
      quantity: {
        type: Number,
        required: true, // A raktáron lévő termékek mennyisége
      },
      location: String, // Az áruk tárolási helye (opcionális)
      lastUpdated: {
        type: Date,
        default: Date.now,
      },
})

const Inventory = mongoose.model("Inventory", InventorySchema)
export default Inventory