var express = require("express");
var router = express.Router();

/* GET books listing. */
router.get("/", function(req, res, next) {
  res.json("respond with all books");
});

module.exports = router;
