const models = require("../models");
var jwt = require("jsonwebtoken");
const { signToken } = require('../utils/auth');
const Place = require('../models/Place');

const bcrypt = require("bcrypt");
const { AuthenticationError, UserInputError, ApolloError } = require('apollo-server-express');
const { GraphQLError } = require("graphql");


const resolvers = {
  Query: {
    getMe: async (parent, args, context) => {
      if (context.user) {
          const userData = await User.findOne({ _id: context.user._id })
              .select('-__v -password')

          return userData;
      }
      throw new AuthenticationError('Not logged in');
  },
    getUser: async (parent, args, { user }) => {
      // try {
      //   if (!user) throw new AuthenticationError("You are not authenticated!");
      //   // TODO: update later
      //   if (!user) throw new Error("You are not authenticated!");
      //   return await models.User.findAll({ username: "abc" });
      // } catch (error) {
      //   throw new AuthenticationError(error.message);
      // }
      try {
        if (user) throw new AuthenticationError("You are not authenticated!");
        return await models.User.findOne({ username: args.username });
      } catch (error) {
        throw new ApolloError(error.message, "QUERY_ERROR");
      }
    },
    getAllUsers: async (root, args, { user }) => {
      try {
        if (!user) throw new AuthenticationError("You are not authenticated!");
        return await models.User.find({});
      } catch (error) {
        throw new AuthenticationError(error.message);
      }
    },
    searchPlace: async (root, args, { name }) => {
      try {
        const places = await Place.find({ 
          name: { $regex: new RegExp(name, "i") }
        });
        return places;
      } catch (error) {
        throw new AuthenticationError(error.message);
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
    findAllParks: async (root, args) => {
      const allParks = await Place.find();
      return allParks;
    }
  },
  

  Mutation: {
    register: async (parent, { username, fullname, email, password }) => {
      try {
        const oldUser = await models.User.findOne({ username });
        if (oldUser) {
          throw new AuthenticationError("Username already exists");
        }
        // const user = await models.User.create({
        //   username,
        //   fullname,
        //   email,
        //   password: await bcrypt.hash(password, 10),
        // });
        // const token = jwt.sign(
        //   { _id: user._id, username: user.username },
        //   process.env.JWT_SECRET || "mysecretsshhhhh",
        //   { expiresIn: "1y" }
        // );

        const user = await models.User.create(args);
        const token = signToken(user);

        // let createdUser = {
        //   _id: user._id,
        //   username: user.username,
        // };

        return {
          token,
          user,
          message: "Registration successful",
        };
      } catch (error) {
        throw new Error("This value already exists. Please provide a unique value.");
      }
    },

    login: async (_, { username, password }) => {
      try {
        const user = await models.User.findOne({ username });
        if (!user) {
          throw new AuthenticationError("Incorrect Credentials");
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          throw new AuthenticationError("Incorrect password");
        }

        // return jwt
        // const token = jwt.sign(
        //   { _id: user._id, username: user.username },
        //   process.env.JWT_SECRET || "mysecretsshhhhh",
        //   { expiresIn: "1d" }
        // );


        // return {
        //   token,
        //   user: {
        //     _id: user._id,
        //     username: user.username,
        //   },
        // };

      const token = signToken(user);

      return { token, user }
      } catch (error) {
        throw new AuthenticationError(error.message);
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