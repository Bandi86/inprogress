import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Category must have a name"],
    unique: true, // Egyedi kategórianév    
  },
  isDeleted: {
    type: Boolean,
    
},
  description: String, // Opcionális leírás
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Category = mongoose.model("Category", CategorySchema);

export default Category;