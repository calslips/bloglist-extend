import React from 'react';
import PropTypes from 'prop-types';

const BlogDeletion = ({ blog, notification, removeBlog, forceLogout }) => {
  const deleteBlog = async () => {
    try {
      if (window.confirm(`Remove blog '${blog.title}' by ${blog.author}`)) {
        await removeBlog(blog.id);
        notification(`Removed blog '${blog.title}' by ${blog.author}`);
      }
    } catch (exception) {
      if (JSON.stringify(exception).includes('401')) {
        forceLogout();
        notification('Session timed out: Log back in to complete operation', true);
      }
    }
  };

  return (
    <button onClick={deleteBlog}>remove</button>
  );
};

BlogDeletion.propTypes = {
  blog: PropTypes.object.isRequired,
  notification: PropTypes.func,
  removeBlog: PropTypes.func,
  forceLogout: PropTypes.func
};

export default BlogDeletion;
