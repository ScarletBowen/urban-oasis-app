import React from 'react';
import moment from 'moment';

const CommentDisplay = ({ comments }) => {
  console.log(comments);

  if (!comments || comments.length === 0) {
    return <p className="w-full p-3 my-2 justify-center items-start">No comments yet.</p>;
  }

  return (
    <div className="w-full p-4 my-3 max-w-screen-md flex flex-col justify-center items-center border shadow-md">
      <h3>Comments:</h3>
      <div className="w-full p-3 my-2 justify-center items-start">
      {comments.map((comment) => {
          const createdAt = new Date(Number(comment.createdAt));
          return (
            <div className="w-full p-3 my-3 max-w-screen-md flex flex-col justify-center items-start text-lg" key={comment._id}>
              <p>{comment.text}</p>
              <p className="text-xs">Posted at: {moment(createdAt).format('MMMM DD, YYYY, hh:mm:ss A')}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommentDisplay;