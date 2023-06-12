import { gql } from "@apollo/client";

export const GET_ME = gql`
  query GetUser {
    getUser {
      _id
      username
      fullname
      email
      savedPlaces
      bio
      avatar
      gender
      friendCount
      friends {
        _id
        username
        bio
        avatar
      }
    }
  }
`;

export const GET_OTHER_USER = gql`
  query getOtherUser($username: String!) {
    user(username: $username) {
      _id
      username
      bio
      avatar
      friendCount
      friends {
        _id
        username
        location
        description
        avatar
      }
    }
  }
`;

export const FINDALLPARKS = gql`
  query FindAllParks {
    findAllParks {
      _id
      name
      geometry {
        location {
          lat
          lng
        }
      }
      business_status
      formatted_address
      rating
      types
      photos {
        photo_reference
      }
      user_ratings_total
    }
  }
`;

export const GET_PLACE_DETAILS = gql`
  query GetPlaceDetails($id: String!) {
    getPlaceDetails(place_id: $id) {
      _id
      name
      formatted_address
      photos {
        photo_reference
      }
      rating
      user_ratings_total
      business_status
      types
    }
  }
`;

export const GET_FAVORITE_PLACES = gql`
  query GetFavoritePlaces {
    getFavoritePlaces {
      _id
      name
      formatted_address
      rating
      user_ratings_total
      business_status
      types
    }
  }
`;

export const CHECKOUT = gql`
  query getCheckout {
    checkout {
      session
    }
  }
`;