const { UserQuery, UserMutation } = require("./User");
const { PlaceMutation } = require("./Place");

const resolvers = {
  Query: {
    ...UserQuery,
  },
  Mutation: {
    ...UserMutation,
    ...PlaceMutation,
  },
};

module.exports = resolvers;
