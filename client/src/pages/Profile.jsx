// import dependencies
import React from "react";
import { useQuery } from "@apollo/client";
import profileBackground from "../assets/profileBackground.jpg";
import userPlaceholder from "../assets/userplaceholder.png";


// import queries and mutations
import { GET_ME } from "../graphql/queries";
import FriendsList from "../components/FriendsList";


const Profile = () => {
  // get logged-in user data
  const getMeQuery = useQuery(GET_ME);

  
  if (getMeQuery.loading) return "Loading...";
  if (getMeQuery.error) {
    console.log("error")
    console.log(getMeQuery.error.message)
    console.error(getMeQuery.error);
    return `Error! ${getMeQuery.error.message}`;
  }

  const user = getMeQuery.data.getUser;

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
        
        className="mt-20 w-full p-3 flex flex-col items-center">

      <div className="p-3 flex flex-col items-center border bg-white rounded">

      
      <h1 className="text-4xl tracking-wide text-center font-light mb-4">My Profile</h1>

      <img src={userPlaceholder} alt="[Placeholder]" className="w-50 h-60 drop-shadow-lg m-2 rounded" />

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
                <div className="px-4 py-2">{user.username}</div>
              </div>

              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Full Name</div>
                <div className="px-4 py-2">{user.fullname}</div>
              </div>

              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Email</div>
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
      
          </div>
        </div>

      </div>
      
      </div>

      {/* <FriendsList friends={user.friends} /> */}
    </div>
    
  );
};

export default Profile;
