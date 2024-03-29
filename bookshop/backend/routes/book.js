import express from 'express'
import { getBooks } from '../controllers/book/getBooks.js'
import { getBook } from '../controllers/book/getBookById.js'
import { createBook } from '../controllers/book/createBook.js'
import { updateBook } from '../controllers/book/updateBook.js'
import { deleteBook } from '../controllers/book/deleteBook.js'
import { searchBookByParams } from '../controllers/book/searchBookByParams.js'
import authenticate from '../middleware/auth.js'

const router = express.Router()

// CRUD Routes /books

router.get('/', getBooks) // /books
router.get('/:book_id', getBook) // /books/:bookId
router.get('/search', searchBookByParams) // /books/search
router.post('/', authenticate, createBook ) // /books
router.put('/:book_id', authenticate, updateBook) // /books/:bookId
router.delete('/:book_id', authenticate, deleteBook) // /books/:bookId


export default router