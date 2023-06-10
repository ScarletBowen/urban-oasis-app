// import dependencies
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Navigate } from 'react-router-dom';

// import queries and mutations
import { GET_ME } from '../utils/queries';


// import components
// import Footer from '../components/Footer'; 
// import MyProfileCard from '../components/MyProfileCard';


const Profile = () => {
    const { loading, error, data } = useQuery(GET_ME);
  
    if (loading) {
      return <p>Loading...</p>;
    }
  
    if (error) {
      return <p>Error: {error.message}</p>;
    }
  
    const { username, fullname, email } = data.user;
  
    return (
      <div>
        <h2>Profile Page</h2>
        <p>Username: {username}</p>
        <p>Full Name: {fullname}</p>
        <p>Email: {email}</p>
      </div>
    );
  };
  
  export default Profile;
