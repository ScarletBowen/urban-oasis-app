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
      friend_id
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
        getOtherUser(username: $username) {
            _id
            username
            bio
            avatar
            friend_id
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

export const GET_FRIENDS = gql`
  query GetFriends {
    getFriends {
      _id
      username
      avatar
      bio
      friend_id
    }
  }
`;