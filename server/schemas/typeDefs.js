const { gql } = require('apollo-server-express');

const typeDefs = gql`

type User {
    user_id: String!
    username: String!
    fullname: String!
    password: String!
  }
  
  type AuthPayload {
    token: String!
    user: User!
  }
  
  type Query {
    getUser: [User]
  }
  
  type Mutation {
    register(
      username: String!
      fullname: String!
      password: String!
    ): AuthPayload!
    login(username: String!, password: String!): AuthPayload!
  }

  type Comment {
    _id: ID!
    commentBody: String!
    username: String!
    createdAt: String
    place_id: String
    author: [User]!
    }

    type Place {
        placeId: String
        placeName: String
        description: String
        rating: String
        tags: String
        thumbnail_url: String
    }

    input PlaceInput {
        placeId: String
        placeName: String
        description: String
        rating: String
        tags: String
        thumbnail_url: String
    }

    type Mutation {
        savePlace(input: PlaceInput!): User
        removePlace(placeId: String!): User
        addComment(commentBody: String!, place_id: String!): User
        removeComment(commentId: ID!): User
    }
`;
module.exports = typeDefs;