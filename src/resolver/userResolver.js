const { createUser, getUserByUsernameAndPassword } = require('../controller/userController.js');

const userResolver = {
  Query: {
    getUser: (_, { id }) => getUserById(id),
    login: (_, { username, password }) => getUserByUsernameAndPassword(username, password),
  },
  Mutation: {
    createUser: (_, { username, password, email }) => createUser(username, password, email),
  
  },
};

module.exports = userResolver;
