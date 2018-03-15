const app = require("../../app");
const request = require("supertest");

describe("routes/books", () => {
  it("/books should return status of 200 and a book", () => {
    request(app)
      .get("/books")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(response => {
        expect(response.body.message).toEqual("respond with all books");
      });
  });
});
