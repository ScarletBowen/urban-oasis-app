const bcrypt = require("bcrypt");
const {
  AuthenticationError,
  UserInputError,
} = require("apollo-server-express");

const models = require("../models");
const Place = require("../models/Place");
const { generateToken } = require("../utils/auth");

const resolvers = {
  Query: {
    getUser: async (root, args, { user }) => {
      try {
        if (!user) throw new AuthenticationError("You are not authenticated!");
        return user;
      } catch (error) {
        throw new AuthenticationError(error.message);
      }
    },
    getOtherUser: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("friends")
        .populate("posts");
    },
    searchPlace: async (root, { name }, context) => {
      try {
        if (name === "") {
          return [];
        }
        const places = await Place.find({
          name: { $regex: new RegExp(name, "i") },
        });
        return places;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    findAllParks: async (root, args) => {
      try {
        const allParks = await Place.find();
        return allParks;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },

    getPlaceDetails: async (root, { place_id }) => {
      try {
        const place = await Place.findOne({ _id: place_id });
        if (!place) {
          throw new Error("Place not found");
        }
        return place;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    getFavoritePlaces: async (root, args, { user }) => {
      try {
        const places = await Place.find({ _id: { $in: user.savedPlaces } });
        if (!places) {
          throw new Error("Places not found");
        }
        return places;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  },

  Mutation: {
    register: async (root, { username, fullname, email, password }) => {
      try {
        const oldUser = await models.User.findOne({ username });
        if (oldUser) {
          throw new AuthenticationError("Username already exists");
        }
        const user = await models.User.create({
          username,
          fullname,
          email,
          password: await bcrypt.hash(password, 10),
        });
        const token = generateToken(user._id, user.username);

        return {
          token,
          user: {
            user_id: user._id,
            username: user.username,
          },
          message: "Registration successful",
        };
      } catch (error) {
        throw error;
      }
    },

    login: async (_, { username, password }) => {
      try {
        const user = await models.User.findOne({ username });
        if (!user) {
          throw new UserInputError("No user with that username");
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          throw new AuthenticationError("Incorrect password");
        }

        // return jwt
        const token = generateToken(user._id, user.username);

        return {
          token,
          user: {
            user_id: user._id,
            username: user.username,
          },
        };
      } catch (error) {
        console.error(error);
        throw error;
      }
    },

    addFriend: async (parent, { friendId }, { user }) => {
      try {
        if (!user) {
          throw new AuthenticationError("You need to be logged in");
        }

        const updatedUser = await models.User.findOneAndUpdate(
          { _id: user._id },
          { $addToSet: { friends: friendId } },
          { new: true, runValidators: true }
        );

        if (!updatedUser) {
          throw new AuthenticationError(
            "Unable to update user",
            "DATABASE_ERROR"
          );
        }

        return updatedUser;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },

    removeFriend: async (parent, { friendId }, { user }) => {
      try {
        if (!user) {
          throw new AuthenticationError("You need to be logged in");
        }

        const updatedUser = await models.User.findOneAndUpdate(
          { _id: user._id },
          { $pull: { friends: friendId } },
          { new: true }
        );

        if (!updatedUser) {
          throw new AuthenticationError(
            "Unable to update user",
            "DATABASE_ERROR"
          );
        }

        return updatedUser;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },

    savePlace: async (parent, { placeId }, { user }) => {
      try {
        if (!user) {
          throw new AuthenticationError("You need to be logged in");
        }

        const updatedUser = await models.User.findOneAndUpdate(
          { _id: user._id },
          { $addToSet: { savedPlaces: placeId } },
          { new: true, runValidators: true }
        );

        if (!updatedUser) {
          throw new AuthenticationError(
            "Unable to update user",
            "DATABASE_ERROR"
          );
        }

        return updatedUser;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },

    removePlace: async (parent, { placeId }, { user }) => {
      try {
        if (!user) {
          throw new AuthenticationError("You need to be logged in");
        }

        const updatedUser = await models.User.findOneAndUpdate(
          { _id: user._id },
          { $pull: { savedPlaces: placeId } },
          { new: true }
        );

        if (!updatedUser) {
          throw new AuthenticationError(
            "Unable to update user",
            "DATABASE_ERROR"
          );
        }

        return updatedUser;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  },
};

module.exports = resolvers;
