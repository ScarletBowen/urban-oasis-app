import React from "react";
import { setContext } from "@apollo/client/link/context";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  createBrowserRouter,
} from "react-router-dom";

// import pages and components
import {
  Error,
  Home,
  Signin,
  Signup,
  Profile,
  UserProfile,
  PlaceDetails,
  FavoritePlaces,
} from "./pages";

import Nav from "./components/Nav";
import Footer from "./components/Footer";

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const AuthenticationRoute = () => {
  // Perform authentication checks here
  // Example: Check if the user is authenticated based on localStorage.getItem("id_token")

  if (localStorage.getItem("id_token")) {
    // User is authenticated
    return <p>Authenticated</p>;
  } else {
    // User is not authenticated
    return <p>Unauthenticated</p>;
  }
};

// Routes
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Nav />
        <Home />
        <Footer />
      </>
    ),
    errorElement: <Error />,
  },
  {
    path: "signin",
    element: (
      <>
        <Nav />
        <Signin />
        <Footer />
      </>
    ),
  },
  {
    path: "signup",
    element: (
      <>
        <Nav />
        <Signup />
        <Footer />
      </>
    ),
  },
  {
    path: "profile",
    element: (
      <>
        <Nav />
        <Profile />
        <Footer />
      </>
    ),
  },
  {
    path: "userprofile/:username",
    element: (
      <>
        <Nav />
        <UserProfile />
        <Footer />
      </>
    ),
  },
  {
    path: "placedetails",
    element: (
      <>
        <Nav />
        <PlaceDetails />
        <Footer />
      </>
    ),
  },
  {
    path: "favoriteplaces",
    element: (
      <>
        <Nav />
        <FavoritePlaces />
        <Footer />
      </>
    ),
  },
  {
    // Add the separate authentication route
    path: "auth",
    element: <AuthenticationRoute />,
  },
]);

export default router;
