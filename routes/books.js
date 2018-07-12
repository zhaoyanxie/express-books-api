const express = require("express");
const router = express.Router();

const Books = require("../models/book");

/* GET books listing. */
router.get("/", async (req, res, next) => {
  try {
    const books = await Books.find().populate("author");
    res.json(books);
  } catch (error) {
    next(error);
  }
});

// find book by book id
router.get("/:id", (req, res, next) => {
  Books.findById(req.params.id, (error, book) => {
    if (!error) res.json(book);
    else res.json({ message: "Book not found" });
  });
});

router.post("/", async (req, res, next) => {
  // try {
    const newBook = new Books({
      title: req.body.title,
      author: req.body.authorId
    });

    await newBook.save();

    res.json({ message: "new book created successfully" });
  // } catch (error) {
    // res.json(error.message);
    // next(error);
  // }
});

router.put("/:id", (req, res, next) => {
  Books.findById(req.params.id, (error, book) => {
    if (!error) {
      book = { ...book, ...req.body };
      book.save();
      res.json(book);
    } else {
      res.json({ message: `book with id ${req.params.id} not found` });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  Books.findByIdAndRemove(req.params.id, (error, book) => {
    if (!error) res.json({ message: `delete book with id ${req.params.id}` });
    else res.json(error);
  });
});

module.exports = router;
