const models = require("../models");
var jwt = require("jsonwebtoken");
const Place = require('../models/Place');

const bcrypt = require("bcrypt");
const { AuthenticationError, UserInputError, ApolloError } = require('apollo-server-express');
const { GraphQLError } = require("graphql");


const resolvers = {
  Query: {
    getUser: async (root, args, { user }) => {
      try {
        if (!user) throw new AuthenticationError("You are not authenticated!");
        // TODO: update later
        if (!user) throw new Error("You are not authenticated!");
        return await models.User.findAll({ username: "abc" });
      } catch (error) {
        throw new AuthenticationError("AUTHENTICATION_ERROR");
      }
    },
    searchPlace: async (root, args, { name }) => {
      try {
        const places = await Place.find({ 
          name: { $regex: new RegExp(name, "i") }
        });
        return places;
      } catch (error) {
        throw new AuthenticationError("AUTHENTICATION_ERROR");
      }
    },
    searchPlace: async (root, args, { name }) => {
      try {
        const places = await Place.find({ 
          name: { $regex: new RegExp(name, "i") }
        });
        return places;
      } catch (error) {
        throw new Error(error.message);
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
        const token = jwt.sign(
          { user_id: user._id, username: user.username },
          process.env.JWT_SECRET || "mysecretsshhhhh",
          { expiresIn: "1y" }
        );
        let createdUser = {
          user_id: user._id,
          username: user.username,
        };

        return {
          token,
          user: createdUser,
          message: "Registration successful",
        };
      } catch (error) {
        const errorMessage = "An authentication error occurred.";
        throw new AuthenticationError(errorMessage);
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
        const token = jwt.sign(
          { user_id: user._id, username: user.username },
          process.env.JWT_SECRET || "mysecretsshhhhh",
          { expiresIn: "1d" }
        );

        return {
          token,
          user: {
            user_id: user._id,
            username: user.username,
          },
        };
      } catch (error) {
        throw new AuthenticationError("LOGIN_ERROR");
      }
    },

    // savePlace: async (parent, { input }, context) => {
    //   if (context.user) {
    //     const updatedUser = await User.findOneAndUpdate(
    //       { _id: context.user._id },
    //       { $addToSet: { savedPlaces: input } },
    //       { new: true, runValidators: true }
    //     );
    //     if (!updatedUser) {
    //       throw new GraphQLError(error.message, {
    //         extensions: {
    //           code: error.code,
    //         },
    //       });
    //     }
    //     return updatedUser;
    //   }
    //   throw new AuthenticationError('You need to be logged in');
    // },
    savePlace: async (parent, { input }, context) => {
      try {
        if (!context.user) {
          throw new AuthenticationError("You need to be logged in");
        }
        
        const updatedUser = await models.User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedPlaces: input } },
          { new: true, runValidators: true }
        );
        
        if (!updatedUser) {
          throw new AuthenticationError("Unable to update user", "DATABASE_ERROR");
        }

        return updatedUser;
      } catch (error) {
        throw new AuthenticationError("SAVE_PLACE_ERROR");
      }
    },

  //   removePlace: async (parent, { placeId }, context) => {
  //     if (context.user) {
  //       const updatedUser = await User.findOneAndUpdate(
  //         { _id: context.user._id },
  //         { $pull: { savedPlaces: { place_id: placeId } } },
  //         { new: true }
  //       );
  //       if (!updatedUser) {
  //         throw new GraphQLError(error.message, {
  //           extensions: {
  //             code: error.code,
  //           },
  //         });
  //       }
  //       return updatedUser;
  //     }
  //     throw new AuthenticationError('You need to be logged in');
  //   }
  // },

  removePlace: async (parent, { placeId }, context) => {
    try {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in");
      }
  
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedPlaces: { place_id: placeId } } },
        { new: true }
      );
  
      if (!updatedUser) {
        throw new AuthenticationError("Unable to update user", "DATABASE_ERROR");
      }
  
      return updatedUser;
    } catch (error) {
      throw new AuthenticationError("REMOVE_PLACE_ERROR");
    }
  },
  },
};


module.exports = resolvers;