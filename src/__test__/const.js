const express = require('express');

const { ApolloServer } = require('apollo-server-express');

const userTypeDefs = require('../../src/type/userTypeDefs.js');
const userResolver = require('../../src/resolver/userResolver.js');
const { getUserByToken } = require('../../src/authentication.js');



const createApolloServer = async (listenOptions = { port: 4000 }) => {
  const server = new ApolloServer({ 
    typeDefs: [userTypeDefs], 
    resolvers: [userResolver],
    context: async ({ req }) => {
    const token = req.headers.authorization || '';
    const user = await getUserByToken(token);

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


module.exports = { createApolloServer }