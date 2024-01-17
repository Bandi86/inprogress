import express from 'express'
import { getBooks } from '../controllers/book/getBooks.js'
import { getBook } from '../controllers/book/getBookById.js'
import { createBook } from '../controllers/book/createBook.js'
import { updateBook } from '../controllers/book/updateBook.js'
import { deleteBook } from '../controllers/book/deleteBook.js'
import { searchBookByParams } from '../controllers/book/searchBookByParams.js'

const router = express.Router()

// CRUD Routes /books

router.get('/', getBooks) // /books
router.get('/:bookId', getBook) // /books/:bookId
router.get('/search', searchBookByParams) // /books/search
router.post('/', createBook) // /books
router.put('/:bookId', updateBook) // /books/:bookId
router.delete('/:bookId', deleteBook) // /books/:bookId


export default router