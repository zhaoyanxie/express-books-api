const express = require("express");
const router = express.Router();

/* GET books listing. */
router.get("/", (req, res, next) => {
  res.json({ message: "respond with all books" });
});

router.get("/:id", (req, res, next) => {
  res.json({ message: `get book with id ${req.params.id}` });
});

router.post("/", (req, res, next) => {
  res.json({ message: `create new book using data from ${req.body}` });
});

router.put("/:id", (req, res, next) => {
  res.json({ message: `update book with id ${req.params.id}` });
});

router.delete("/:id", (req, res, next) => {
  res.json({ message: `delete book with id ${req.params.id}` });
});

module.exports = router;
