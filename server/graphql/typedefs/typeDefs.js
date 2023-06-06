const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        email: String!
        location: String
        description: String
        friendCount: Int
        friends: [User]
        savedPlaces: [Place]
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
    }
`;

module.exports = typeDefs;
