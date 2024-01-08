import mongoose from "mongoose";

const ReviewSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Az értékelést hagyó felhasználó referencia
    required: true,
  },
  books: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book", // Az értékelt könyv referencia
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1, // Minimum érték (pl. 1)
    max: 5, // Maximum érték (pl. 5, amennyiben ötcsillagos értékelés van)
  },
  comment: {
    type: String,
    required: true, // Az értékelés szöveges kommentje
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Review = mongoose.model("Review", ReviewSchema);

export default Review;
