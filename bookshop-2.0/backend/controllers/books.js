import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import { BadrequestError } from "../errors/bad-request.js";
import notFound from "../middleware/not-found.js";
import adminCheckMiddleware from "../middleware/adminCheck.js";
import Book from "../models/Books.js";

// GET ALL BOOKS
const getAllBooks = asyncHandler(async (req, res) => {
  const books = await Book.find({}).sort("createdAt");
  res.status(StatusCodes.OK).json({ books, count: books.length });
  if (!books) throw new Error({ message: error.message });
});

// SINGLE BOOK
const getBook = asyncHandler(async (req, res) => {
  const {
    user: { userId },
    params: { id: bookId },
  } = req;

  const book = await Book.findOne({
    _id: bookId,
  });
  if (!book) throw new notFound(`No Book with this id: ${bookId}`);
  res.status(StatusCodes.OK).json({ book });
});

// CREATE BOOK
const createBook = asyncHandler(async (req, res) => {
  adminCheckMiddleware(req, res, async () => {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(StatusCodes.CREATED).json(newBook);
  });
});

// UPDATE BOOK
const updateBook = asyncHandler(async (req, res) => {
  adminCheckMiddleware(req, res, async () => {
    canEdited = [
      "title",
      "author",
      "publishedYear",
      "isbn",
      "publisher",
      "language",
      "pageCount",
      "coverImage",
      "description",
      "isDeleted",
    ];
    // Check if book exists
    const bookId = req.params.id; // updated book id
    const book = await Book.findById(bookId);
    if (!book) throw new notFound(`No book with id: ${bookId}`);

    const updatedBookData = {};
    canEdited.forEach((field) => {
      if (req.body[field] !== undefined && req.body[field !== ""]) {
        updatedBookData[field] = req.body[field];
      } else throw new BadrequestError("fields cannot be empty");
    });

    // update book in db
    const updatedBook = await Book.findByIdAndUpdate(bookId, updatedBookData, {
      new: true,
    });

    res.status(StatusCodes.OK).json(updatedBook);
  });
});

// DELETE BOOK
const deleteBook = asyncHandler(async (req, res) => {
  adminCheckMiddleware(req, res, async () => {
    const {
      params: { id: bookId },
    } = req;

    const book = await Book.findOne({
      _id: bookId,
    });

    if (!book) throw new notFound(`No book with id: ${bookId}`);

    // patch Book argument isDeleted to  true
    const isDeleted = true;
    const deletingBook = await Book.findByIdAndUpdate(bookId, { isDeleted });
    if (!deletingBook) return res.status(StatusCodes.NO_CONTENT);
    res.status(StatusCodes.OK).json({ message: "Book is deleted" });
  });
});

export { getAllBooks, getBook, createBook, updateBook, deleteBook };
