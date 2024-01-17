import Book from '../../models/book.js'

export const updateBook = async (req, res) => {
  const bookId = req.params.bookId
  const { title, author, description, quantity } = req.body

  try {
    const book = await Book.findByPk(bookId)
    if (!book) {
      return res.status(404).json({ message: 'Book not found!' })
    }
    book.title = title
    book.author = author
    book.description = description
    book.quantity = quantity
    await book.save()
    res.status(200).json({ message: "Book updated", book })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
