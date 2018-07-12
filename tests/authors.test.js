const request = require("supertest");
const express = require("express");
const authorsRouter = require("../routes/authors");

const app = express();
authorsRouter(app);

test("should return true with true", async () => {
  const response = await request(app).get("/authors");
  expect(response.status).toBe(200);
  expect(response.body).toEqual({
    message: "ok"
  });
});
