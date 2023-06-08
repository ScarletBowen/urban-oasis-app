import { gql } from '@apollo/client';

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