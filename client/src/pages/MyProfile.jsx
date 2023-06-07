// import dependencies
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Navigate } from 'react-router-dom';

// import queries and mutations
import { GET_ME } from '../utils/queries';


// import components
import Nav from '../components/Nav';
// import Footer from '../components/Footer'; 
import MyProfileCard from '../components/MyProfileCard';


const MyProfile = () => {
    // get logged-in user data
    // const { loading, data } = useQuery(GET_ME);
    // const user = data?.currentUser || {};

    // if user is logged in, render MyProfileCard component
    return (
        <div>
            My Profile Page
        </div>
    );
}

export default MyProfile;
