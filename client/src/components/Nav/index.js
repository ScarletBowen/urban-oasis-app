import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const data = require("../../data/parks.json");

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(Math.abs(lat2 - lat1)); // deg2rad below
  var dLon = deg2rad(Math.abs(lon2 - lon1));
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function useGeolocation(options = {}) {
  const [state, setState] = React.useState({
    loading: true,
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude: null,
    longitude: null,
    speed: null,
    timestamp: null,
    error: null,
  });

  const optionsRef = React.useRef(options);

  React.useEffect(() => {
    const onEvent = ({ coords, timestamp }) => {
      setState({
        loading: false,
        timestamp,
        latitude: coords.latitude,
        longitude: coords.longitude,
        altitude: coords.altitude,
        accuracy: coords.accuracy,
        altitudeAccuracy: coords.altitudeAccuracy,
        heading: coords.heading,
        speed: coords.speed,
      });
    };

    const onEventError = (error) => {
      setState((s) => ({
        ...s,
        loading: false,
        error,
      }));
    };

    navigator.geolocation.getCurrentPosition(
      onEvent,
      onEventError,
      optionsRef.current
    );

    const watchId = navigator.geolocation.watchPosition(
      onEvent,
      onEventError,
      optionsRef.current
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return state;
}

function Nav() {
  
  
  
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const locationState = useGeolocation();

  async function handleSearchQuery(e) {
    e.preventDefault();
    if (searchQuery === "") {
      setSearchResults([]);
      return;
    }

    var datas = data.features
      .filter((e) =>
        e.properties
          .toLocaleLowerCase()
          .includes(searchQuery.toLocaleLowerCase())
      )
      .map((e) => {
        e.distance = getDistanceFromLatLonInKm(
          locationState.latitude,
          locationState.longitude,
          e.geometry.coordinates[0],
          e.geometry.coordinates[1]
        );
        return e;
      });
    datas.sort((a, b) => a.distance - b.distance);
    setSearchResults(datas);
  }

  return (

      <div className="min-h-screen bg-gray-100 text-gray-900">
        <header className="bg-white shadow-sm">
          <nav className="container mx-auto px-6 py-3">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <div className="flex justify-between items-center">
                <div>
                  <Link to="/" className="text-2xl font-bold text-gray-800 dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300">
                    Urban Oasis Locator
                  </Link>
                </div>
    
                {/* Mobile Menu Button */}
                <div className="flex md:hidden">
                  <button type="button" className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600" aria-label="toggle menu">
                    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                      <path fillRule="evenodd" d="M4 5a1 1 0 011-1h14a1 1 0 110 2H5a1 1 0 01-1-1zm0 6a1 1 0 011-1h14a1 1 0 110 2H5a1 1 0 01-1-1zm1 6a1 1 0 100 2h14a1 1 0 100-2H5z" clipRule="evenodd"></path>
                    </svg>
                  </button>
                </div>
              </div>
    
              {/* Desktop Menu */}
              <div className="md:flex hidden">
                <Link to="/aboutus" className="px-6 py-2 text-sm text-gray-700 dark:text-gray-200 hover:text-indigo-500">
                  About us
                </Link>
                <Link to="/myprofile" className="px-6 py-2 text-sm text-gray-700 dark:text-gray-200 hover:text-indigo-500">
                  My Profile
                </Link>
                <Link to="/favoriteplaces" className="px-6 py-2 text-sm text-gray-700 dark:text-gray-200 hover:text-indigo-500">
                  My Favorite Places
                </Link>
                <Link to="/signin" className="px-6 py-3 text-sm font-medium text-white bg-indigo-500 rounded-full hover:bg-indigo-400">
                  Sign In
                </Link>
              </div>
            </div>
          </nav>
        </header>
    
        {/* Mobile Menu */}
        <div className="md:hidden">
          <Link to="/aboutus" className="block px-4 py-2 mt-2 text-sm font-semibold text-gray-700 bg-transparent rounded-lg hover:bg-gray-200 focus:bg-indigo-400 focus:outline-none focus:shadow-outline-indigo">
            About us
          </Link>
          <Link to="/myprofile" className="block px-4 py-2 mt-2 text-sm font-semibold text-gray-700 bg-transparent rounded-lg hover:bg-gray-200 focus:bg-indigo-400 focus:outline-none focus:shadow-outline-indigo">
            My Profile
          </Link>
          <Link to="/favoriteplaces" className="block px-4 py-2 mt-2 text-sm font-semibold text-gray-700 bg-transparent rounded-lg hover:bg-gray-200 focus:bg-indigo-400 focus:outline-none focus:shadow-outline-indigo">
            My Favorite Places
          </Link>       
       <Link to="/signin" className="block px-4 py-2 mt-2 text-sm font-semibold text-white bg-indigo-500 rounded-lg hover:bg-indigo-400 focus:bg-indigo-400 focus:outline-none focus:shadow-outline-indigo">
        Sign In
      </Link>
    </div>
  </div>
); 
}

export default Nav;
