import Book from '../../models/book.js'
import Comments from '../../models/comments.js'

const createComment = async (req, res) => {
  const { comment } = req.body
  const { username } = req.user
  const { book_id } = req.params

  try {
    // check if book exists
    const book = await Book.findOne({ where: { book_id } })
    if (!book) {
      return res.status(404).json({ message: 'Book not found!' })
    }
    const newComment = await Comments.create({
      user_id: username,
      book_id,
      comment,
    })
    res.status(201).json({ message: 'Comment added to book', newComment })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export default createComment
