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
  DonationPage,
  Error,
  Home,
  Signin,
  Signup,
  AboutUs,
  MyProfile,
  UserProfile,
  PlaceDetails,
  FavoritePlaces,
} from "./pages";

import Nav from "./components/Nav";
import DonationForm from "./components/DonationForm";
import Footer from "./components/footer";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import DonationForm from "./components/donationForm";
// import { StripeProvider } from "./utils/StripeProvider";

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
    path: "aboutus",
    element: (
      <>
        <Nav />
        <AboutUs />
        <Footer />
      </>
    ),
  },
  {
    path: "myprofile",
    element: (
      <>
        <Nav />
        <MyProfile />
        <Footer />
      </>
    ),
  },
  {
    path: "userprofile",
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
    path: "donationpage",
    element: (
      <>
        <Nav />
        <DonationPage />
        <Footer />
      </>
    ),
  },
]);

export default router;
