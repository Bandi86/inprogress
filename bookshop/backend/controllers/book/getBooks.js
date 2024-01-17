import Book from "../../models/book.js"

export const getBooks = async (req, res) => {
    try {
        const books = await Book.findAll()
        res.status(200).json({ books, length: books.length })
    } catch (err) {
        res.status(500).json({ error: err.message })
      }
}
