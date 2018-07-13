const request = require("supertest");
const express = require("express");
const authorsRouter = require("../routes/authors");
const Author = require("../models/author");

const { MongoMemoryServer } = require("mongodb-memory-server");
const mongod = new MongoMemoryServer();
const mongoose = require("mongoose");

const app = express();
authorsRouter(app);

let savedAuthor1;
let savedAuthor2;

// seed data for testing
async function addFakeAuthors() {
  const author1 = new Author({
    name: "paulo",
    age: 49
  });

  savedAuthor1 = await author1.save();

  const author2 = new Author({
    name: "john",
    age: 89
  });

  savedAuthor2 = await author2.save();
}

// before all test blocks
beforeAll(async () => {
  jest.setTimeout(120000);

  const uri = await mongod.getConnectionString();
  await mongoose.connect(uri);
  await addFakeAuthors();
});

afterAll(() => {
  mongoose.disconnect();
  mongod.stop();
});

test("GET /authors", async () => {
  const response = await request(app).get("/authors");
  expect(response.status).toBe(200);
  expect(response.body.length).toBe(2);
  expect(response.body[0].name).toBe("paulo");
  expect(response.body[1].age).toBe(89);
});

test("GET by /:authorId should return the first author when the first id is passed to it", async () => {
  // find all authors
  const response = await request(app).get("/authors");

  expect(response.body[0].name).toBe(savedAuthor1.name);
  expect(response.body[1].name).toBe(savedAuthor2.name);
});

test("POST /authors", async () => {
  const newAuthor = {
    name: "newAuthor",
    age: 49
  };
  const response = await request(app)
    .post("/authors")
    .send(newAuthor);

  const authors = await Author.find();
  expect(response.status).toBe(201);
  expect(authors.length).toBe(3);
});
