import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateBlogLikes } from '../reducers/blogReducer';
import PropTypes from 'prop-types';

const Likes = ({ blog }) => {
  const [alreadyLiked, setAlreadyLiked] = useState(false);

  const dispatch = useDispatch();

  const handleLike = (likeStatus) => {
    if (likeStatus) {
      const updateLikes = {
        likes: blog.likes + 1
      };
      dispatch(updateBlogLikes(blog.id, blog.user, updateLikes));
      setAlreadyLiked(likeStatus);
    } else {
      const updateLikes = {
        likes: blog.likes - 1
      };
      dispatch(updateBlogLikes(blog.id, blog.user, updateLikes));
      setAlreadyLiked(likeStatus);
    }
  };

  return (
    <>
      {alreadyLiked
        ? <p className='likes'>
          {blog.likes} likes <button onClick={() => {handleLike(false);}}>unlike</button>
        </p>
        : <p className='likes'>
          {blog.likes} likes <button onClick={() => {handleLike(true);}}>like</button>
        </p>
      }
    </>
  );
};

Likes.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Likes;
