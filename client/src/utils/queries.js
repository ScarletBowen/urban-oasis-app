import { gql } from '@apollo/client';

export const GET_ME = gql`
    {
        getMe {
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
            fullname
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