<<<<<<< HEAD
import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { StripeProvider } from './StripeProvider';
import DonationForm from './DonationForm';

function App() {
  return (
    <div>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        style={{ height: '50vh', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="Map data © <a href=&quot;https://openstreetmap.org&quot;>OpenStreetMap</a> contributors"
        />
        <Marker position={[51.505, -0.09]} />
      </MapContainer>
      <StripeProvider>
        <div className="App">
          <h1>Donation</h1>
          <DonationForm />
        </div>
      </StripeProvider>
    </div>
=======

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
          <StripeProvider>
          <div className="App">
            <h1>Donation</h1>
            <DonationForm />
          </div>
        </StripeProvider>
        </div>
      </Router>
    </ApolloProvider>
>>>>>>> 7fdb154632e21e1a08f8e0bc5083ab814495306b
  );
}

export default App;
