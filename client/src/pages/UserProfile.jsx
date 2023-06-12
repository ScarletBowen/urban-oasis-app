// import dependencies
import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Navigate, Link, useParams } from "react-router-dom";
import Auth from "../utils/auth";
import profileBackground from "../assets/profileBackground.jpg";

// import queries and mutations
import { GET_ME, GET_OTHER_USER } from "../graphql/queries";
import { ADD_FRIEND, REMOVE_FRIEND } from "../graphql/mutations";

import FriendBtn from "../components/FriendBtn";


const UserProfile = () => {
  const { username } = useParams();
  
  const getMeQuery = useQuery(GET_ME);
  const getOtherUserQuery = useQuery(GET_OTHER_USER, {
    variables: { username },
  });
  

  const { loading, error, data } = getOtherUserQuery;

  if (loading) return "Loading...";
  if (error) {
    console.error(error);
    return `Error! ${error.message}`;
  }

  const user = getMeQuery.data.getUser;

  const otherUser = getOtherUserQuery.data.getOtherUser;
  console.log(otherUser);
  console.log(user);
  
  


  // if user is logged in, render Profile page
  return (
<div 
style={{
  backgroundImage: `url(${profileBackground})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  padding: "30px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}} 
className="mt-16 w-full p-3 flex flex-col items-center">
  <h1 className="text-4xl tracking-wide text-center font-light mb-4">Profile</h1>

  <img src={otherUser.avatar} alt="placeholder" className="w-50 h-60 drop-shadow-lg m-2 rounded-full" />

  <div className="bg-white p-3 m-3 shadow-lg rounded-sm bg-emerald-50">
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
      <div className="grid md:grid-cols-1 text-sm">

        <div className="grid grid-cols-2">
          <div className="px-4 py-2 font-semibold">Username</div>
          <div className="px-4 py-2">{otherUser.username}</div>
        </div>


        <div className="grid grid-cols-2">
          <div className="px-4 py-2 font-semibold">Bio</div>
          <div className="px-4 py-2">{otherUser.bio}</div>
        </div>
      </div>
    </div>
  </div>
  {/* {user ? (
        <FriendBtn
          friendId={otherUser.friend_id}
          isFriend={user.friends.includes(otherUser.friend_id)}
        />
      ) : null} */}
</div>
    
  );
};

export default UserProfile;
