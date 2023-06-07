import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// import pages and components
import Home from './pages/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Error from './pages/Error';



const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    // <MapContainer
    //   center={[51.505, -0.09]}
    //   zoom={13}
    //   style={{ height: '100vh', width: '100%' }}
    // >
    //   <TileLayer
    //     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    //     attribution="Map data © <a href=&quot;https://openstreetmap.org&quot;>OpenStreetMap</a> contributors"
    //   />
    //   <Marker position={[51.505, -0.09]} />
    // </MapContainer>
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Routes>
            <Route
              path= "/"
              element= {<Home />}
              errorElement= {<Error />}
            />
            <Route
              path= "/signin"
              element= {<Signin />}
            />
            <Route
              path= "/signup"
              element= {<Signup />}
            />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
