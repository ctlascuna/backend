const { gql } = require("apollo-server-express");

const typeDefs = gql`
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
    generateMyNotesPdf: Boolean
  }

  type Mutation {
    createUser(username: String!, password: String!): User
    addNote(note: String, noteId: String): Note
    deleteNote(noteId: String): Boolean!
  }
`;

module.exports = typeDefs;
