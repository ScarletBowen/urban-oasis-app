import React from 'react';

const CommentDisplay = ({ comment }) => {
  if (!comment) {
    return <p>No comments yet.</p>;
  }

  return (
    <div>
        <h3>Comments:</h3>
      <p>{comment.text}</p>
      <p>Posted by: {comment.username}</p>
      <p>Posted at: {comment.createdAt}</p>
    </div>
  );
};

export default CommentDisplay;