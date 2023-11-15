const express = require('express');

const { ApolloServer } = require('apollo-server-express');

const userTypeDefs = require('./src/type/userTypeDefs.js');

const userResolver = require('./src/resolver/userResolver.js');

const server = new ApolloServer({ typeDefs: [userTypeDefs], resolvers: [userResolver] });

async function startServer() {
  await server.start();

  const app = express();

  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer();