import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";


// const client = new ApolloClient({
//   uri: "http://localhost:3001/graphql",
//   cache: new InMemoryCache(),
// });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <ApolloProvider client={client}>
  //   <RouterProvider router={router} />
  // </ApolloProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
