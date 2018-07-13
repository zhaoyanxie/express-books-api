const express = require("express");
const router = express.Router();

const Book = require("../models/book");

/* GET books listing. */
router.get("/", async (req, res, next) => {
  try {
    const books = await Book.find().populate("author");
    res.json(books);
  } catch (error) {
    next(error);
  }
});

// find book by book id
router.get("/:id", (req, res, next) => {
  Book.findById(req.params.id, (error, book) => {
    if (!error) res.json(book);
    else res.json({ message: "Book not found" });
  });
});

router.post("/", async (req, res, next) => {
  // try {
  const newBook = new Book({
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
  Book.findById(req.params.id, (error, book) => {
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
  Book.findByIdAndRemove(req.params.id, (error, book) => {
    if (!error) res.json({ message: `delete book with id ${req.params.id}` });
    else res.json(error);
  });
});

module.exports = module.exports = app => {
  app.use(express.json());
  app.use("/books", router);
};
