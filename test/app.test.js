const { expect } = require("chai");
require("iconv-lite").encodingExists("cesu8");
const { app } = require("../app");
const request = require("supertest")(app);

describe("/user/signin", () => {
  it("should respond with a 200 status code", async () => {
    const response = await request.get("/users/signin");
    expect(response.statusCode).equal(200);
  });
});
