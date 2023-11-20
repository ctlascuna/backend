const userController = require("../controller/userController.js");
const noteController = require("../controller/noteController.js");
const authentication = require("../authentication.js");

const resolver = {
  Query: {
    login: async (_, { username, password }) => {
      const user = await userController.getUserByUsernameAndPassword(
        username,
        password
      );

      if (user === undefined || user === null) {
        throw new Error("Invalid username and password, try again.");
      }

      const accessToken = authentication.generateAccessToken(user);
      return {
        userId: user.userId,
        username: user.username,
        accessToken,
      };
    },
    getNotes: async (_, __, { user }) => {
      if (!user) {
        throw new Error("Authentication required");
      }
      const notes = await noteController.getNotesByUserId(user.userId);
      return notes;
    },
    generateMyNotesPdf: async (_, __, { user }) => {
      if (!user) {
        throw new Error("Authentication required");
      }
      await noteController.generateMyNotesPdf(user.userId);
      return true;
    },
  },
  Mutation: {
    createUser: async (_, { username, password }) => {
      const user = await userController.createUser(username, password);
      const accessToken = authentication.generateAccessToken(user);
      return {
        userId: user.userId,
        username: user.username,
        accessToken,
      };
    },
    addNote: async (_, { note, noteId }, { user }) => {
      if (!user) {
        throw new Error("Authentication required");
      }
      const newNote = await noteController.addNote(user.userId, note, noteId);
      return {
        noteId: newNote.noteId,
        note: newNote.note,
      };
    },
    deleteNote: async (_, { noteId }, { user }) => {
      if (!user) {
        throw new Error("Authentication required");
      }
      const success = await noteController.deleteNoteById(noteId, user.userId);
      return success;
    },
  },
};

module.exports = resolver;
