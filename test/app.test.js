const { expect } = require("chai");
require("iconv-lite").encodingExists("cesu8");
const { app } = require("../app");
const request = require("supertest")(app);

describe("routes", () => {
  it("/user/signin should respond with a 200 status code. and render html", async () => {
    const response = await request.get("/users/signin");
    expect(response.statusCode).to.equal(200);
    expect(response.headers["content-type"]).to.include("text/html");
    expect(response.text).to.include("signin");
  });
});
