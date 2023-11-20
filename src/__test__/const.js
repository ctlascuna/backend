const express = require("express");

const { ApolloServer } = require("apollo-server-express");

const typeDefs = require("../../src/type/typeDefs.js");
const resolver = require("../../src/resolver/resolver.js");
const authentication = require("../../src/authentication.js");

const createApolloServer = async (listenOptions = { port: 4000 }) => {
  const server = new ApolloServer({
    typeDefs: [typeDefs],
    resolvers: [resolver],
    context: async ({ req }) => {
      const token = req.headers.authorization || "";
      const user = await authentication.getUserByToken(token);

      return { user };
    },
  });

  await server.start();

  const app = express();

  server.applyMiddleware({ app });

  const PORT = listenOptions.port;

  app.listen(PORT, () => {});

  return { server };
};

module.exports = { createApolloServer };
