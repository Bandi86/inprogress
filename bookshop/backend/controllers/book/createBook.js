import Book from '../../models/book.js'


export const createBook = async (req, res) => {
  const {
    title,
    author,
    description,
    isbn,
    published_date,
    quantity,
    price,
    image,
    category,
  } = req.body

  


  try {
    const book = await Book.create({
      title,
      author,
      description,
      isbn,
      published_date,
      quantity,
      price,
      image,
      category_id: category
    })

    res.status(201).json({ message: 'Book added to database', book })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
