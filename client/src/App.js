
import React from "react";
import { RouterProvider } from "react-router-dom";
import { setContext } from "@apollo/client/link/context";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
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
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import DonationForm from "./components/donationForm";
import { StripeProvider } from "./utils/StripeProvider";


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

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} errorElement={<Error />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/myprofile" element={<MyProfile />} />
            <Route path="/userprofile" element={<UserProfile />} />
            <Route path="/placedetails" element={<PlaceDetails />} />
            <Route path="/favoriteplaces" element={<FavoritePlaces />} />
          </Routes>
          <Elements stripe={StripeProvider}></Elements>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
