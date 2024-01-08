import mongoose from "mongoose";

const FavoritesSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  books: [
    {
      book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// A 'updatedAt' mező frissítése minden módosításnál
FavoritesSchema.pre("save", function (next) {
    this.updatedAt = new Date();
    next();
  });

const Favorites = mongoose.model("Favorites", FavoritesSchema);

export default Favorites;
