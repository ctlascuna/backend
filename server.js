const express = require("express");

const { ApolloServer } = require("apollo-server-express");

const userTypeDefs = require("./src/type/userTypeDefs.js");
const userResolver = require("./src/resolver/userResolver.js");
const { getUserByToken } = require("./src/authentication.js");

const server = new ApolloServer({
  typeDefs: [userTypeDefs],
  resolvers: [userResolver],
  context: async ({ req, res }) => {
    const token = req.headers.authorization || "";
    const user = await getUserByToken(token);

    return { user, res };
  },
});

async function startServer() {
  await server.start();

  const app = express();

  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(
      `Server listening on http://localhost:${PORT}${server.graphqlPath}`
    );
  });
}

startServer();
