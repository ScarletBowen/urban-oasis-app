import React from "react";
import { 
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} 
from "react-router-dom";
import ReactDOM from "react-dom/client";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import "./index.css";
import router from "./App";
import Nav from "./components/Nav";


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
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
);
