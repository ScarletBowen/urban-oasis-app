import React from "react";
import { Link } from "react-router-dom";

const FriendsList = ({ friends }) => {
    return (
        <>
            <div className="mt-16 w-full p-3 flex flex-col items-center">
                <h1>Friends List</h1>
                {friends.map(friend => (
                    <ul className="w-auto py-3 px-4 transition-all ease-in duration-300 hover:opacity-80">
                        <li key={friend._id}>
                            <div className="flex flex-row items-center text-sm">
                                <img
                                    src={friend.avatar}
                                    alt={friend.username}
                                    className="w-12 h-12 rounded-full"
                                />
                                <div className="ml-2 w-full flex flex-col">
                                    <Link to={`/profile/${friend.username}`} className="font-medium hover:text-teal-400">{friend.username}</Link>
                                    <p className="text-gray-400 text-xs">{friend.description}</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                ))}
            </div>
        </>
    );
};

export default FriendsList;