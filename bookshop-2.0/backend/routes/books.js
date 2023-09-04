import express from "express";
import {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/books.js";

const router = express.Router();

router.route("/").post(createBook).get(getAllBooks);
router.route("/id:id").get(getBook).patch(deleteBook).patch(updateBook);

export default router;
