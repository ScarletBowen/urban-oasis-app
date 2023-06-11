import { useQuery, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import {
  REMOVE_PLACE_MUTATION,
  SAVE_PLACE_MUTATION,
} from "../graphql/mutations";
import { GET_ME } from "../graphql/queries";

export default function FavoriteBtn({ placeId, isFavorited }) {
  const { data } = useQuery(GET_ME);
  const userData = data?.me || {};

  const [savePlace] = useMutation(SAVE_PLACE_MUTATION);
  const [removePlace] = useMutation(REMOVE_PLACE_MUTATION);

  const handleAddToFavorites = () => {
    savePlace({ variables: { input: { placeId } } });
  };

  const handleRemoveFromFavorites = async () => {
    try {
      await removePlace({
        variables: { placeId },
        update: (cache) => {
          const existingData = cache.readQuery({ query: GET_ME });
          // create updated array of places
          const updatedPlaces = existingData.me.savedPlaces.filter(
            (place) => place.place_id !== placeId
          );
          // write updated array to cache
          cache.writeQuery({
            query: GET_ME,
            data: { me: { ...existingData.me, savedPlaces: updatedPlaces } },
          });
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex space-x-4">
      {!isFavorited ? (
        <button
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-white transition-colors"
          onClick={handleAddToFavorites}
          disabled={isFavorited}
        >
          Add to Favorites
        </button>
      ) : (
        <button
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-white transition-colors"
          onClick={handleRemoveFromFavorites}
        >
          Remove from Favorites
        </button>
      )}
    </div>
  );
}
