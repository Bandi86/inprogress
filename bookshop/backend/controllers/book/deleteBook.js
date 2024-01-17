import Book from '../../models/book.js'

export const deleteBook = async (req, res) => {
  const bookId = req.params.bookId

  try {
    const book = await Book.findByPk(bookId)
    if (!book) {
      return res.status(404).json({ message: 'Book not found!' })
    }
    await book.destroy()
    res.status(200).json({ message: 'Book deleted successfully!' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
