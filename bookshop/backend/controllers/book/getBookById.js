import Book from '../../models/book.js'

export const getBook = async (req, res) => {
  const book_id = req.params.book_id
  try {
    const book = await Book.findByPk(book_id)
    if (!book) {
      return res.status(404).json({ message: 'Book not found!' })
    }
    res.status(200).json({ book })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
