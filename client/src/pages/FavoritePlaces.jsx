import React from "react";
import { useQuery } from "@apollo/client";

import { GET_FAVORITE_PLACES } from "../graphql/queries";
import PlaceCard from "../components/PlaceCard";

export default function FavoritePlaces() {
  const query = useQuery(GET_FAVORITE_PLACES);

  if (query.loading) return "Loading...";
  if (query.error) {
    console.error(query.error);
    return `Error! ${query.error.message}`;
  }

  const places = query.data.getFavoritePlaces;

  return (
    <div>
      <h1 className="w-full text-center text-5xl">Favorite Places</h1>
      <div className="p-8 ">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:grid-cols-4">
          {places.map((place) => (
            <PlaceCard place={place} />
          ))}
        </div>
      </div>
    </div>
  );
}
