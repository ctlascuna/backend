const { createApolloServer } = require("./const.js");
const {
  createUser,
  getUserByUsernameAndPassword,
  generateAccessToken,
} = require("../controller/userController.js");

describe("generateAccessToken", () => {
  let server;

  beforeAll(async () => {
    ({ server } = await createApolloServer({ port: 4000 }));
  });

  afterAll(async () => {
    await server?.stop();
  });

  test("should generate a token", async () => {
    const token = generateAccessToken({ userId: "asd" });
    expect(token).not.toBeNull();
  });
});
