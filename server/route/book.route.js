import express from "express";
import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from "../controller/bookcontroller.js";

const router = express.Router();

// Get all books
router.get("/", getBooks);

// Get single book by ID
router.get("/:id", getBookById);

// Create new book
router.post("/", createBook);

// Update book
router.put("/:id", updateBook);

// Delete book
router.delete("/:id", deleteBook);

export default router;