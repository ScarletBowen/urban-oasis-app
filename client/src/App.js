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
]);

export default router;
