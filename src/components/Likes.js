import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Likes = ({ blog, updates }) => {
  const [likes, setLikes] = useState(blog.likes);
  const [alreadyLiked, setAlreadyLiked] = useState(false);

  const likeBlog = async (likeStatus) => {
    if (likeStatus) {
      const updateLikes = {
        likes: likes + 1
      };
      updates(blog.id, updateLikes);
      setLikes(updateLikes.likes);
      setAlreadyLiked(likeStatus);
    } else {
      const updateLikes = {
        likes: likes - 1
      };
      updates(blog.id, updateLikes);
      setLikes(updateLikes.likes);
      setAlreadyLiked(likeStatus);
    }
  };

  return (
    <>
      {alreadyLiked
        ? <p className='likes'>
          likes {likes} <button onClick={() => {likeBlog(false);}}>unlike</button>
        </p>
        : <p className='likes'>
          likes {likes} <button onClick={() => {likeBlog(true);}}>like</button>
        </p>
      }
    </>
  );
};

Likes.propTypes = {
  blog: PropTypes.object.isRequired,
  updates: PropTypes.func
};

export default Likes;
