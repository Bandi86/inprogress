import mongoose from "mongoose";

const ProductGroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
  description: String,
  price: Number,
  // További mezők az árú csoporttal kapcsolatban
});

const ProductGroup = mongoose.model("ProductGroup", ProductGroupSchema);

export default ProductGroup;
