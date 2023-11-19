const {
  createUser,
  getUserByUsernameAndPassword,
  generateAccessToken,
} = require("../controller/userController.js");
const {
  addNote,
  getNotesByUserId,
  deleteNoteById,
} = require("../controller/noteController.js");

const userResolver = {
  Query: {
    login: async (_, { username, password }) => {
      const user = await getUserByUsernameAndPassword(username, password);

      if (user === undefined) {
        throw new Error("Invalid username and password, try again.");
      }

      const accessToken = generateAccessToken(user);
      return {
        userId: user.userId,
        username: user.username,
        accessToken,
      };
    },
    getNotes: async (_, __, { user, res }) => {
      if (!user) {
        throw new Error("Authentication required");
      }
      const notes = await getNotesByUserId(user.userId, res);
      return notes;
    },
  },
  Mutation: {
    createUser: async (_, { username, password }) => {
      const user = await createUser(username, password);
      const accessToken = generateAccessToken(user);
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
      const newNote = await addNote(user.userId, note, noteId);
      return {
        noteId: newNote.noteId,
        note: newNote.note,
      };
    },
    deleteNote: async (_, { noteId }, { user }) => {
      if (!user) {
        throw new Error("Authentication required");
      }
      const success = await deleteNoteById(noteId, user.userId);
      return success;
    },
  },
};

module.exports = userResolver;
