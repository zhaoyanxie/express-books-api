const express = require("express");
const router = express.Router();

const Author = require("../models/author");
const Book = require("../models/book");

router.get("/", async (req, res, next) => {
  // const author = await Author.find();
  // res.json(author);
  res.json({message: "ok"});
});

// find books by author id
router.get("/:authorId", async (req, res, next) => {
  try {
    const author = await Author.findById(req.params.authorId);
    const book = await Book.find({ author: req.params.authorId });
    res.json({
      ...author.toJSON(),
      book: book
    });
  } catch (error) {
    next(error);
  }
});

/* POST author listings. */
router.post("/", async (req, res, next) => {
  try {
    const newAuthor = new Author({
      name: req.body.name
    });
  
    await newAuthor.save();
  
    res.status(201).json({
      message: "author saved successfully"
    });
  } catch (error) {
    next(error)
  }
});

module.exports = app => {
  app.use('/authors', router) 
}
