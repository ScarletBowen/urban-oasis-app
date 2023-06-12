import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";

import {
  ADD_FRIEND,
  REMOVE_FRIEND,
} from "../graphql/mutations";

export default function FriendBtn({ friendId, isFriend }) {
  const [addFriend] = useMutation(ADD_FRIEND);
  const [removeFriend] = useMutation(REMOVE_FRIEND);

  return (
    <div className="flex space-x-4">
      {!isFriend ? (
        <button
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-white transition-colors"
          onClick={() => {
            
            addFriend({ variables: { friendId } });
            
            // window.location.reload();
          }}
        >
          Follow
        </button>
      ) : (
        <button
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-white transition-colors"
          onClick={() => {
            removeFriend({ variables: { friendId } });
            // window.location.reload();
          }}
        >
          Remove from Follow List
        </button>
      )}
    </div>
  );
}
