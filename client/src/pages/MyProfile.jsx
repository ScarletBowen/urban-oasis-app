// import dependencies
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Navigate } from 'react-router-dom';

// import queries and mutations
import { GET_ME } from '../utils/queries';


// import components
import Nav from '../components/Nav';
// import Footer from '../components/Footer'; 
// import MyProfileCard from '../components/MyProfileCard';


const MyProfile = () => {
    // get logged-in user data
    // const { loading, data } = useQuery(GET_ME);
    // const user = data?.currentUser || {};

    // if user is logged in, render MyProfileCard component
    return (
        <div className="w-full p-3 flex flex-col items-center">
            <h1>My Profile</h1>
            
            <img src="https://via.placeholder.com/150" alt="placeholder" />

            <div>
                <h3>Username: username</h3>
                <h3>Full Name: fullname</h3>
                <h3>Email: email</h3>

                <h2>Bio</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
            </div>
        
            <div>Friend List component</div>

        </div>
    );
}

export default MyProfile;
