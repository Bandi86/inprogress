const ProductGroupSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true, // A csoport neve (pl. "Harry Potter könyvsorozat")
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
      },
    ], // Az áruk csoportjához tartozó termékek referenciái
    description: String, // Részletes leírás a csoportról
    price: Number, // Az ár, amely a csoportra vonatkozik
    // Egyéb mezők vagy validációk a konkrét igényektől függően
  });

  const ProductGroup = mongoose.model("ProductGroup", ProductGroupSchema)

  export default ProductGroup