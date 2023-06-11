import React, { useState, useEffect } from "react";
import { useMap } from "react-leaflet";
import { useGeolocation } from "@uidotdev/usehooks";
import { useMutation } from "@apollo/client";

import { getDistanceInKm } from "../utils/distance";
import { SEARCH_PLACE } from "../graphql/mutations";

export default function SearchBox({ setPosition, refsPopup }) {
  const parentMap = useMap();
  const { latitude, longitude } = useGeolocation();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [callSearch, { loading, error }] = useMutation(SEARCH_PLACE, {
    variables: { name: searchQuery },
    onCompleted({ searchPlace }) {
      if (searchPlace) {
        var datas = searchPlace.map((place) => {
          return {
            ...place,
            distance: getDistanceInKm(
              latitude,
              longitude,
              place.geometry.location.lat,
              place.geometry.location.lng
            ),
          };
        });
        datas.sort((a, b) => a.distance - b.distance);
        setSearchResults(datas);
      }
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    callSearch();
  }

  if (loading) return "Loading...";
  if (error) {
    console.error(error);
    return `Error! ${error.message}`;
  }

  return (
    <div className="leaflet-top leaflet-left mt-16">
      <form
        className="flex items-center relative w-full leaflet-control leaflet-bar"
        onSubmit={handleSubmit}
      >
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="simple-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {!!searchResults ? (
            <div className="absolute z-10 w-full border divide-y shadow max-h-72 overflow-y-auto bg-white">
              {searchResults.map((place) => (
                <div
                  className="flex flex-row hover:bg-indigo-50 justify-between text-base p-2 w-full"
                  key={place._id}
                  onClick={() => {
                    const location = [
                      place.geometry.location.lat + 0.01,
                      place.geometry.location.lng,
                    ];
                    setPosition(location);
                    parentMap.flyTo(location, 14);
                    const marker = refsPopup[place._id];
                    if (marker) {
                      marker.openPopup();
                    }
                  }}
                >
                  <div className="grow inline">{place.name}</div>
                  <div className="inline">
                    <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-lime-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-lime-700">
                      {place.distance.toFixed(2)}km
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </form>
    </div>
  );
}
