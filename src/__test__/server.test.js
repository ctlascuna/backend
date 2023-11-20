jest.mock("../config/database.js");
jest.mock("../controller/userController.js");

const db = require("../config/database.js");
const { createApolloServer } = require("./const.js");

const userController = require("../controller/userController.js");
const authentication = require("../../src/authentication.js");

describe("generateAccessToken", () => {
  let server;

  beforeAll(async () => {
    ({ server } = await createApolloServer({ port: 0 }));
  });

  afterAll(async () => {
    await server?.stop();
  });

  test("should generate a token", async () => {
    const token = userController.createUser({ userId: "1" });
    expect(token).not.toBeNull();
  });

  test("should have user ID in the token", async () => {
    const token = authentication.generateAccessToken({ userId: "1" });

    const decodedToken = await authentication.getUserByToken(token);
    expect(decodedToken.userId).toBe("1");
  });
});
