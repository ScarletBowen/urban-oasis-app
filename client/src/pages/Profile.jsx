// import dependencies
import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Navigate, Link, useParams } from "react-router-dom";
import useToken from "../hooks/useToken";
import Auth from "../utils/auth";

// import queries and mutations
import { GET_ME, GET_OTHER_USER } from "../graphql/queries";
import { ADD_FRIEND, REMOVE_FRIEND } from "../graphql/mutations";
import FriendsList from "../components/FriendsList";


const Profile = () => {
  const [me, setMe] = useState(false);
  const [token, setToken] = useToken();

  // get logged-in user data
  const getMeQuery = useQuery(GET_ME);

  if (getMeQuery.loading) return "Loading...";
  if (getMeQuery.error) {
    console.error(getMeQuery.error);
    return `Error! ${getMeQuery.error.message}`;
  }

  const user = getMeQuery.data.getUser;
  

  //add friend
  // const [addFriend] = useMutation(ADD_FRIEND);
  // const [following, setFollowing] = useState(false);
  // const handleAddFriend = async () => {
  //   try {
  //     await addFriend({
  //       variables: { id: user._id }
  //     });
  //     setFollowing(true);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  //remove friend
  // const [removeFriend] = useMutation(REMOVE_FRIEND);
  // const handleRemoveFriend = async () => {
  //   try {
  //     await removeFriend({
  //       variables: { id: user._id }
  //     });
  //     setFollowing(false);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  // if user is logged in, render Profile page
  return (
    <div className="mt-16 w-full p-3 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center mb-4">Profile</h1>

      <img src={user.avatar} alt="placeholder" className="h-60" />

      <div className="bg-white p-3 shadow-sm rounded-sm">
        <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
          <span className="text-green-500">
            <svg
              className="h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </span>
          <span className="tracking-wide">About</span>
        </div>


        <div className="text-gray-700">
          <div className="grid md:grid-cols-2 text-sm">
          {/* if logged in */}
          {!!token ? (
            <>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Username</div>
                <div className="px-4 py-2">{user.username}</div>
              </div>

              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Full Name</div>
                <div className="px-4 py-2">{user.fullname}</div>
              </div>

              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Email.</div>
                <div className="px-4 py-2">
                  <a className="text-blue-800" href={`mailto:${user.email}`}>
                    {user.email}
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Bio</div>
                <div className="px-4 py-2">{user.bio}</div>
              </div>

              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Gender</div>
                <div className="px-4 py-2">{user.gender}</div>
              </div>
            </>
          ) : null}

          {/* if not logged in */}
          {!!!token ? (
            <>

              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Username</div>
                <div className="px-4 py-2">{user.username}</div>
              </div>

              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Bio</div>
                <div className="px-4 py-2">{user.bio}</div>
              </div>

            </>
            ) : null}

          </div>
        </div>


      </div>

      <FriendsList friends={user.friends} />
    </div>
    
  );
};

export default Profile;