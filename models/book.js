const mongoose = require("mongoose");
const Author = require("./author");

// create schema
const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Author',
    validate: {
      validator: (authorId) => {
        console.log("validator~~~~~~~~~~~~~~~");
          return Author.findById(authorId)
      },
      message: "Author not found"
    }
  },
  
});

// create model for schema and export model
module.exports = mongoose.model('Book', bookSchema);
