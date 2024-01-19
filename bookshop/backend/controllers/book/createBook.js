import Book from "../../models/book.js"
import Category from "../../models/category.js"

export const createBook = async (req, res) => {
    const { title, author, description, isbn, published_date, quantity, price, image, category_name } = req.body
    
    try {
       // search the id of the category name
        const category = await Category.findOne({ where: { category_name } })
       if (category === null) {
              res.status(404).json({ message: "Category not found" })
       } else {
           const book = await Book.create({
               title,
               author,
               description,
               isbn,
               published_date,
               quantity,
               price,
               image,
               category_id: category.category_id            
           })
   
           res.status(201).json({ message: "Book added to database", book, category_name })

       }
    } catch (err) {
        res.status(500).json({ error: err.message })
      }
}
