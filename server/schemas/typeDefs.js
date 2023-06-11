const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: String!
    user_id: String!
    username: String!
    fullname: String!
    email: String!
    bio: String
    gender: String
    avatar: String
    password: String!
    savedPlaces: [String!]
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Location {
    lat: Float!
    lng: Float!
  }

  type Viewport {
    northeast: Location!
    southwest: Location!
  }

  type Geometry {
    location: Location!
    viewport: Viewport!
  }

  type Photo {
    height: Int!
    html_attributions: [String]!
    photo_reference: String!
    width: Int!
  }

  type PlusCode {
    compound_code: String!
    global_code: String!
  }

  type Place {
    _id: String
    business_status: String!
    formatted_address: String!
    geometry: Geometry!
    icon: String!
    icon_background_color: String!
    icon_mask_base_uri: String!
    name: String!
    opening_hours: OpeningHours!
    photos: [Photo]!
    place_id: String!
    plus_code: PlusCode!
    rating: Float!
    reference: String!
    types: [String]!
    user_ratings_total: Int!
  }

  type OpeningHours {
    open_now: Boolean!
  }

  type Comment {
    _id: ID!
    commentBody: String!
    username: String!
    createdAt: String
    place_id: String
    author: [User]!
  }

  input PlaceInput {
    business_status: String!
    formatted_address: String!
    geometry: GeometryInput!
    icon: String!
    icon_background_color: String!
    icon_mask_base_uri: String!
    name: String!
    opening_hours: OpeningHoursInput!
    photos: [PhotoInput]!
    place_id: String!
    plus_code: PlusCodeInput!
    rating: Float!
    reference: String!
    types: [String]!
    user_ratings_total: Int!
  }

  input LocationInput {
    lat: Float!
    lng: Float!
  }

  input ViewportInput {
    northeast: LocationInput!
    southwest: LocationInput!
  }

  input GeometryInput {
    location: LocationInput!
    viewport: ViewportInput!
  }

  input PhotoInput {
    height: Int!
    html_attributions: [String]!
    photo_reference: String!
    width: Int!
  }

  input PlusCodeInput {
    compound_code: String!
    global_code: String!
  }

  input OpeningHoursInput {
    open_now: Boolean!
  }

  type Query {
    getUser: User
  }
  type Mutation {
    register(
      username: String!
      fullname: String!
      email: String!
      password: String!
    ): AuthPayload!
    login(username: String!, password: String!): AuthPayload!
  }

  type Query {
    searchPlace(name: String!): [Place]
    findAllParks: [Place]
    getPlaceDetails(place_id: String!): Place
    getFavoritePlaces: [Place]
  }
  type Mutation {
    savePlace(placeId: String!): User
    removePlace(placeId: String!): User
  }

  type Mutation {
    addComment(commentBody: String!, place_id: String!): User
    removeComment(commentId: ID!): User
  }
`;
module.exports = typeDefs;
