const { UserQuery, UserMutation } = require("./User");

const resolvers = {
  Query: {
    ...UserQuery,
  },
  Mutation: {
    ...UserMutation,
  },
};

module.exports = resolvers;
