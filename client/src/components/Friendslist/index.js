import React from 'react';
import { Link } from 'react-router-dom';

const FriendsList = ({ username, friends, friendCount }) => {
    return (
        <div>
            <h1>Friends List</h1>

            {friends.map((friend) => (
                <ul>
                    <li key={friend._id}>
                        <div>
                            <Link to={`/profile/${friend.username}`}>{friend.username}</Link>
                        </div>
                    </li>
                </ul>
            ))}
        </div>
    );
};