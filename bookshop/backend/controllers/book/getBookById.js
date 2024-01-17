import Book from '../../models/book.js'

export const getBook = async (req, res) => {
  const bookId = req.params.bookId
  try {
    const book = await Book.findByPk(bookId)
    if (!book) {
      return res.status(404).json({ message: 'Book not found!' })
    }
    res.status(200).json({ book })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
