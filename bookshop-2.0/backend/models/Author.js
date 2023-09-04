import mongoose from "mongoose";

const AuthorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Az író neve
  },
  dateOfBirth: Date, // Az író születési dátuma
  dateOfDeath: Date, // Az író halálozási dátuma (opcionális)
  biography: String, // Az író életrajza vagy rövid leírása
  nationality: String, // Az író nemzetisége
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
  ], // Az íróhoz tartozó könyvek referenciái
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
AuthorSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const Author = mongoose.model("Author", AuthorSchema);

export default Author;
