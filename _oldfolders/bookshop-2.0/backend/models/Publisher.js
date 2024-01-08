import mongoose from "mongoose";

const PublisherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // A kiadó neve
  },
  location: String, // A kiadó székhelye (város, ország stb.)
  establishedYear: Number, // A kiadó alapításának éve
  website: String, // A kiadó weboldala (opcionális)
  contactEmail: String, // Kapcsolatfelvétel e-mail címe (opcionális)
  booksPublished: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
  ], // A kiadóhoz tartozó könyvek referenciái
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
PublisherSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const Publisher = mongoose.model("Publisher", PublisherSchema);
export default Publisher;
