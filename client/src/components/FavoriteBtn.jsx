import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";

import {
  REMOVE_PLACE_MUTATION,
  SAVE_PLACE_MUTATION,
} from "../graphql/mutations";

export default function FavoriteBtn({ placeId, isFavorited }) {
  const [savePlace] = useMutation(SAVE_PLACE_MUTATION);
  const [removePlace] = useMutation(REMOVE_PLACE_MUTATION);
  console.log(placeId)
  return (
    <div className="flex space-x-4">
      {!isFavorited ? (
        <button
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-white transition-colors"
          onClick={() => {
            savePlace({ variables: { placeId } });
            // window.location.reload();
          }}
        >
          Add to Favorites
        </button>
      ) : (
        <button
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-white transition-colors"
          onClick={() => {
            removePlace({ variables: { placeId } });
            // window.location.reload();
          }}
        >
          Remove from Favorites
        </button>
      )}
    </div>
  );
}
