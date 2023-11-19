const { gql } = require("apollo-server-express");

const userTypeDefs = gql`
  type User {
    userId: String!
    username: String!
    accessToken: String
    notes: [Note]
  }

  type Note {
    noteId: String!
    note: String
  }

  type Query {
    getUser(userId: String!): User!
    login(username: String!, password: String!): User
    getNotes: [Note]
  }

  type Mutation {
    createUser(username: String!, password: String!): User
    addNote(note: String, noteId: String): Note
    deleteNote(noteId: String): Boolean!
  }
`;

module.exports = userTypeDefs;
