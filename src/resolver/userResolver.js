const { createUser, getUserByUsernameAndPassword, generateAccessToken } = require('../controller/userController.js');

const userResolver = {
  Query: {
    getUser: (_, { id }) => getUserById(id),
    login: async (_, { username, password }) => {
      const user = await getUserByUsernameAndPassword(username, password);

      if (user === undefined) {
        throw new Error('Invalid username and password, try again.');
      }

      const accessToken = generateAccessToken(user);
      return {
        user_id: user.user_id,
        username: user.username,
        accessToken
      }
    }
  },
  Mutation: {
    createUser: async (_, { username, password }) => {
      const user = await createUser(username, password);
      const accessToken = generateAccessToken(user);
        return {
        user_id: user.user_id,
        username: user.username,
        accessToken
      }
    },
  
  },
};

module.exports = userResolver;
