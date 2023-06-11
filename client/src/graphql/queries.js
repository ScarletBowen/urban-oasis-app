import { gql } from "@apollo/client";

export const GET_ME = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
    }
  }
`;

export const GET_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
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
