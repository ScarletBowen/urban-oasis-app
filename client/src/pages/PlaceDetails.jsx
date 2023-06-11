import React, { useState } from "react";
import { useQuery } from "@apollo/client";

import { GET_PLACE_DETAILS, GET_ME } from "../graphql/queries.js";
import FavoriteBtn from "../components/FavoriteBtn";
import * as useUrlQuery from "../hooks/useQuery";
import RatingStar from "../components/RatingStar.jsx";

function PlaceDetails() {
  const query = useUrlQuery.default();
  const placeId = query.get("placeId");

  const getMeQuery = useQuery(GET_ME);
  const getPlaceDetailsQuery = useQuery(GET_PLACE_DETAILS, {
    variables: { id: placeId },
  });

  if (getMeQuery.loading) return "Loading...";
  if (getMeQuery.error) {
    console.error(getMeQuery.error);
    return `Error! ${getMeQuery.error.message}`;
  }

  if (getPlaceDetailsQuery.loading) return "Loading...";
  if (getPlaceDetailsQuery.error) {
    console.error(getPlaceDetailsQuery.error);
    return `Error! ${getPlaceDetailsQuery.error.message}`;
  }

  const place = getPlaceDetailsQuery.data.getPlaceDetails;
  const user = getMeQuery.data.getUser;
  const rating = Math.round(place.rating);

  return (
    <div className="flex flex-col items-center bg-gray-100 h-screen pt-20">
      <h1 className="text-4xl font-bold text-center mb-4">{place.name}</h1>

      <img
        src="https://goparkplay.com/wp-content/uploads/2021/05/batch_IMG_6959-800x600.jpg"
        alt={place.name}
        className="rounded-lg shadow-md w-96 h-96"
      />

      <div className="flex flex-row mt-2 text-md">
        <RatingStar rating={rating} />
        <span className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white">
          ({place.user_ratings_total} ratings)
        </span>
      </div>

      <div className="flex flex-row mt-4 text-lg">
        <div>Address:</div>
        <div>{place.formatted_address}</div>
      </div>

      <div className="px-6 pt-1 pb-2">
        {place.types?.map((type) => (
          <span className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #{type}
          </span>
        ))}
      </div>

      <FavoriteBtn
        placeId={place._id}
        isFavorited={user.savedPlaces.includes(place._id)}
        // Pass setIsFavorited if you want to update favorite status from inside FavoriteBtn
      />
    </div>
  );
}

export default PlaceDetails;
