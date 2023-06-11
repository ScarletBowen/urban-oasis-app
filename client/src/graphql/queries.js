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
