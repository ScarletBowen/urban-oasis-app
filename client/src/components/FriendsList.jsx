import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { GET_FRIENDS } from "../graphql/queries";

export default function FriendsList() {
  const query = useQuery(GET_FRIENDS);

  if (query.loading) return "Loading...";
  if (query.error) {
    console.error(query.error);
    return `Error! ${query.error.message}`;
  }

  const friends = query.data.getFriends;

  return (
    <div>
      <h1 className="w-full text-center text-5xl">Friends</h1>
      <div className="p-8 ">
      <div className="mt-4 mx-auto w-[95%] divide-y">
          {friends.map(friend => (
            <ul className="w-auto py-3 px-4 transition-all ease-in duration-300 hover:opacity-80">
              <li key={friend.friend_id}>
                <div className="flex flex-row items-center text-sm">
                  <img
                    src={friend.avatar}
                    alt={friend.username}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="ml-2 w-full flex flex-col">
                    <Link to={`/userprofile/${friend.username}`} className="font-medium hover:text-teal-400">{friend.username}</Link>
                    <p className="text-gray-400 text-xs">{friend.description}</p>
                  </div>
                </div>
              </li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
