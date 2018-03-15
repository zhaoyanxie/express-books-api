const app = require("../../app");
const request = require("supertest");

describe("routes/books", function() {
  it("/books should return status of 200 and a book", function() {
    request(app)
      .get("/books")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(function(response) {
        expect(response.body.message).toEqual("respond with all books");
      });
  });
});
