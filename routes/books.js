var express = require("express");
var router = express.Router();

/* GET books listing. */
router.get("/", function(req, res) {
  res.json({ message: "respond with all books" });
});

router.get("/:id", function(req, res) {
  res.json({ message: `get book with id ${req.params.id}` });
});

router.post("/", function(req, res) {
  res.json({ message: `create new book using data from ${req.body}` });
});

router.put("/:id", function(req, res) {
  res.json({ message: `update book with id ${req.params.id}` });
});

router.delete("/:id", function(req, res) {
  res.json({ message: `delete book with id ${req.params.id}` });
});

module.exports = router;
