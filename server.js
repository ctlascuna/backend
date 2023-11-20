const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const typeDefs = require("./src/type/typeDefs.js");
const resolver = require("./src/resolver/resolver.js");
const authentication = require("./src/authentication.js");

const server = new ApolloServer({
  typeDefs: [typeDefs],
  resolvers: [resolver],
  context: async ({ req }) => {
    const token = req.headers.authorization || "";
    const user = await authentication.getUserByToken(token);

    return { user };
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
