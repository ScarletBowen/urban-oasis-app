import React from "react";
import { useQuery } from "@apollo/client";

import { GET_FAVORITE_PLACES } from "../graphql/queries";
import PlaceCard from "../components/PlaceCard";
import favoritePlaceBkg from "../assets/faveplacesbackground.jpg";

export default function FavoritePlaces() {
  const query = useQuery(GET_FAVORITE_PLACES);

  if (query.loading) return "Loading...";
  if (query.error) {
    console.error(query.error);
    return `Error! ${query.error.message}`;
  }

  const places = query.data.getFavoritePlaces;

  return (
    <div style={{
      backgroundImage: `url(${favoritePlaceBkg})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      padding: "30px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      
    }}className="mt-20 w-full p-3 flex flex-col items-center">
      

      
        <h1 className="text-5xl tracking-wide text-center font-light mb-4">Favorite Places</h1>

        <div className="p-3 flex flex-col items-center border bg-white bg-opacity-90 rounded" >
        <div className="p-8 ">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:grid-cols-4">
            {places.map((place) => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
