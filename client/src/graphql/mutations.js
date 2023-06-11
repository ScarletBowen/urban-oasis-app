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
        username
      }
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation addFriend($friendId: ID!) {
    addFriend(friendId: $friendId) {
      _id
      username
      friendCount
      friends {
        _id
        username
        profileImage
      }
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
