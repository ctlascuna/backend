const { gql } = require('apollo-server-express');

const userTypeDefs = gql`
  type User {
    user_id: String!
    username: String!
    email: String!
  }

  type Query {
    getUser(user_id: ID!): User!
     login(username: String!, password: String!): User!
  }

  type Mutation {
    createUser(username: String!, password: String!, email: String!): User!
  }
`;

module.exports = userTypeDefs;