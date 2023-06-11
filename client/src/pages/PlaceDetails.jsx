import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PLACE_DETAILS } from '../graphql/queries.js';
import FavoriteBtn from '../components/FavoriteBtn';
import { useState } from 'react';

function PlaceDetails({ match }) {
const [isFavorited] = useState(false);
  const { loading, error, data } = useQuery(GET_PLACE_DETAILS, {
    variables: { id: match.params.id },
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const { place } = data;

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 h-screen">
      <h1 className="text-4xl font-bold text-center mb-4">{place.name}</h1>
      <img src={place.photos ? place.photos[0].photo_reference : ""} alt={place.name} className="rounded-lg shadow-md"/>
      <p className="mt-4 text-lg">{place.formatted_address}</p>
      <p className="mt-2 text-md">Rating: {place.rating} ({place.user_ratings_total} ratings)</p>
    
    
      <FavoriteBtn 
        placeId={place._id} 
        isFavorited={isFavorited} 
        // Pass setIsFavorited if you want to update favorite status from inside FavoriteBtn
      />
    </div>

  );
}


export default PlaceDetails;