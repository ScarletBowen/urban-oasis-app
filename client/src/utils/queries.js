import { gql } from '@apollo/client';

export const GET_ME = gql`
    {
        currentUser {
            _id
            username
            fullname
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
      name
      geometry {
        location {
          lat
          lng
        }
      }
    }
  }
`;

export const GET_PLACE_DETAILS = gql`
  query GetPlaceDetails($id: ID!) {
    place(id: $id) {
      name
      formatted_address
      photos {
        photo_reference
      }
      rating
      user_ratings_total
    }
  }
`;

