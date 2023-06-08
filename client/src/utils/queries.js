import { gql } from '@apollo/client';

export const GET_ME = gql`
    {
        currentUser {
            _id
            username
            email
            biography
            profileImage
            friendCount
            friends {
                _id
                username
                profileImage
            }
        }
    }
`;

export const GET_USER = gql`
    query user($username: String!) {
        user(username: $username) {
            _id
            username
            email
            biography
            profileImage
    }
`;