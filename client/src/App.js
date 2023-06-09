
import React from "react";
import { setContext } from "@apollo/client/link/context";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";

// import pages and components
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import AboutUs from "./pages/AboutUs";
import MyProfile from "./pages/MyProfile";
import UserProfile from "./pages/UserProfile.jsx";
import PlaceDetails from "./pages/PlaceDetails";
import FavoritePlaces from "./pages/FavoritePlaces";
import Error from "./pages/Error";
import Nav from "./components/Nav";


const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});


// Routes
const router =  createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Nav />
          <Home />
        </>
      ),
      errorElement: <Error />
    },
    {
      path: "signin",
      element: (
        <>
          <Nav />
          <Signin />
        </>
      ),
    },
    {
      path: "signup",
      element: (
        <>
          <Nav />
          <Signup />
        </>
      ),
    },
    {
      path: "aboutus",
      element: (
        <>
          <Nav />
          <AboutUs />
        </>
      ),
    },
    {
      path: "myprofile",
      element: (
        <>
          <Nav />
          <MyProfile />
        </>
      ),
    },
    {
      path: "userprofile",
      element: (
        <>
          <Nav />
          <UserProfile />
        </>
      ),
    },
    {
      path: "placedetails",
      element: (
        <>
          <Nav />
          <PlaceDetails />
        </>
      ),
    },
    {
      path: "favoriteplaces",
      element: (
        <>
          <Nav />
          <FavoritePlaces />
        </>
      ),
    },
  ]);
 

export default router;
