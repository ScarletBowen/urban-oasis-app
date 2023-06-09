const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: String!
    user_id: String
    username: String!
    fullname: String!
    email: String!
    bio: String
    gender: String
    avatar: String
    password: String!
    friend_id: String!
    friendCount: Int
    friends: [User]
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
    comments: [Comment!]!
  }

  type OpeningHours {
    open_now: Boolean!
  }

  type Comment {
    _id: String!
    text: String
    username: String
    createdAt: String!
    createdBy: User!
    place_id: String!
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
    getOtherUser(username: String!): User
    findAllParks: [Place]
    getPlaceDetails(place_id: String!): Place
    getFavoritePlaces: [Place]
    getFriends: [User]
  }


  type Mutation {
    register(
      username: String!
      fullname: String!
      email: String!
      password: String!
    ): AuthPayload!
    login(username: String!, password: String!): AuthPayload!
    addFriend(friendId: String!): User
    removeFriend(friendId: String!): User
    searchPlace(name: String!): [Place]
    savePlace(placeId: String!): User
    removePlace(placeId: String!): User
    addComment(text: String!, placeId: String!): Comment!
    removeComment(commentId: String!): User
  }

`;
module.exports = typeDefs;
