import mongoose from "mongoose";

const BooksSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "book must be have title"],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: [true, "A book must have an author"],
  },
  publishedYear: {
    type: Number,
    required: [true, "book most be have published year"],
  },
  isbn: {
    type: String,
    required: [true, "book most be have isbn code"],
  },
  publisher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Publisher",
    required: [true, "A book must have a publisher"],
  },
  language: {
    type: String,
    required: [true, "book must be have a language "],
  },
  pageCount: {
    type: Number,
    required: [true, "book must be have page count"],
  },
  coverImage: String,
  description: {
    type: String,
    required: [true, "book must be have description"],
  },
  price: {
    type: Number,
    required: [true, "book most have a price"],
  },
  inventoryQuantity: {
    type: Number,
    default: 0, // Alapértelmezett érték: 0
  },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  reviews: [
    {
      user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
      username: String,
      rating: Number,
      comment: String,
      date: { type: Date, default: Date.now },
    },
  ],
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Book = mongoose.model("Book", BooksSchema);

export default Book;
