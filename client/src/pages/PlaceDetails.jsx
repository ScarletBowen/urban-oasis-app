import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";


import { GET_PLACE_DETAILS, GET_ME } from "../graphql/queries.js";
import { ADD_COMMENT } from "../graphql/mutations.js";
import FavoriteBtn from "../components/FavoriteBtn";
import * as useUrlQuery from "../hooks/useQuery";
import RatingStar from "../components/RatingStar.jsx";
import CommentDisplay from "../components/CommentDisplay.jsx";
import Footer from "../components/Footer.jsx";

function PlaceDetails() {
  const placeId = useUrlQuery.default().get("placeId");
  const [commentText, setCommentText] = useState("");

  const getMeQuery = useQuery(GET_ME);
  const getPlaceDetailsQuery = useQuery(GET_PLACE_DETAILS, {
    variables: { id: placeId },
  });

  const [addCommentMutation, { loading, error }] = useMutation(ADD_COMMENT, {
    onError: (error) => {
      console.error("Error saving comment:", error);
    },
    onCompleted: () => {
      console.log("Comment saved successfully");
      setCommentText(""); // Clear the comment input field after saving
      window.location.reload();
    },
  });

  if (getPlaceDetailsQuery.loading) return "Loading...";
  if (getPlaceDetailsQuery.error) {
    console.error(getPlaceDetailsQuery.error);
    return `Error! ${getPlaceDetailsQuery.error.message}`;
  }

  
  const place = getPlaceDetailsQuery.data.getPlaceDetails;
  const rating = Math.round(place.rating);

  var user;
  if (!getMeQuery.error) {
    user = getMeQuery.data.getUser;
  }
 
  const handleCommentTextChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleSaveComment = () => {
    if (commentText.trim() === '') {
      // Handle empty comment text
      return;
    }

    console.log(place._id, commentText)
    addCommentMutation({
      variables: {
        placeId: place._id,
        text: commentText,
      },
    });
  };
  
  return (
    <div className="flex flex-col items-center bg-white pt-20">
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
          <span
            key={type}
            className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >
            #{type}
          </span>
        ))}
      </div>

      {user ? (
        <FavoriteBtn
          placeId={place._id}
          isFavorited={user.savedPlaces.includes(place._id)}
          // Pass setIsFavorited if you want to update favorite status from inside FavoriteBtn
        />
      ) : null}

      {/* comment field */}
        <div className="flex flex-col p-3 items-center">
          <textarea
            value={commentText}
            onChange={handleCommentTextChange}
            placeholder="Add a comment..."
            className="comment-input h-[10vh] mb-4 shadow-md rounded-md w-96 border"
          />
          <button onClick={handleSaveComment} className="block px-3 py-2 mt-0 text-sm font-semibold text-white bg-teal-500 rounded-lg hover:bg-teal-700 focus:bg-teal-700 focus:outline-none focus:shadow-outline-indigo">
            Post Comment
          </button>
        </div>

      {/* comment display */}
      <div>
        <CommentDisplay comments={place.comments} />
      </div>
     
    </div>
    
  );
}

export default PlaceDetails;
