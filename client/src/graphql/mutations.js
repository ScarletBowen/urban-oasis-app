import { gql } from "@apollo/client";


export const LOGIN_USER = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        user_id
        username
      }
    }
  }
`;

export const REGISTER_USER = gql`
  mutation Register(
    $username: String!
    $fullname: String!
    $email: String!
    $password: String!
  ) {
    register(
      username: $username
      fullname: $fullname
      email: $email
      password: $password
    ) {
      token
      user {
        user_id
        friend_id
        username
      }
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation addFriend($friendId: String!) {
    addFriend(friendId: $friendId) {
      friend_id
      username
    }
  }
`;

export const REMOVE_FRIEND = gql`
  mutation removeFriend($friendId: String!) {
    removeFriend(friendId: $friendId) {
      friend_id
      username
    }
  }
`;

export const SAVE_PLACE_MUTATION = gql`
  mutation SavePlace($placeId: String!) {
    savePlace(placeId: $placeId) {
      username
    }
  }
`;

export const REMOVE_PLACE_MUTATION = gql`
  mutation RemovePlace($placeId: String!) {
    removePlace(placeId: $placeId) {
      username
    }
  }
`;

export const SEARCH_PLACE = gql`
  mutation SearchPlace($name: String!) {
    searchPlace(name: $name) {
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
