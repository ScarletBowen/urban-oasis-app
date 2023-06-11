import React from "react";
import { RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import "leaflet/dist/leaflet.css";

import "./index.css";

import router from "./App";

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql",
  cache: new InMemoryCache(),
});

// entry point for the app
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <RouterProvider router={router} />
  </ApolloProvider>
);
