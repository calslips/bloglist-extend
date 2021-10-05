import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { setNotice } from '../reducers/noticeReducer';

const BlogDeletion = ({ blog, removeBlog, forceLogout }) => {
  const dispatch = useDispatch();
  const deleteBlog = async () => {
    try {
      if (window.confirm(`Remove blog '${blog.title}' by ${blog.author}`)) {
        await removeBlog(blog.id);
        dispatch(setNotice(`Removed blog '${blog.title}' by ${blog.author}`, 5, 'success'));
      }
    } catch (exception) {
      if (JSON.stringify(exception).includes('401')) {
        forceLogout();
        dispatch(setNotice('Session timed out: Log back in to complete operation', 5, 'fail'));
      }
    }
  };

  return (
    <button onClick={deleteBlog}>remove</button>
  );
};

BlogDeletion.propTypes = {
  blog: PropTypes.object.isRequired,
  removeBlog: PropTypes.func,
  forceLogout: PropTypes.func
};

export default BlogDeletion;
