import React, { useState } from 'react';
import Likes from './Likes';
import BlogDeletion from './BlogDeletion';
import PropTypes from 'prop-types';

const Blog = ({ blog, user, logout }) => {
  const [showAllInfo, setShowAllInfo] = useState(false);

  const minBlogInfo = { display: showAllInfo ? 'none' : '' };
  const maxBlogInfo = { display: showAllInfo ? '' : 'none' };

  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    borderRadius: 3,
    marginBottom: 5
  };

  return (
    <div className='blog' style={blogStyle}>
      <div className='moreInfo' style={maxBlogInfo}>
        <p>{blog.title} - {blog.author}
          <button onClick={() => setShowAllInfo(false)}>hide</button>
        </p>
        <p>{blog.url}</p>
        <Likes blog={blog} />
        <p>{blog.user.name}</p>
        {(user.name === blog.user.name &&
          <BlogDeletion
            blog={blog}
            forceLogout={logout}
          />
        )}
      </div>
      <div className='lessInfo' style={minBlogInfo}>
        <p>{blog.title} - {blog.author}
          <button onClick={() => setShowAllInfo(true)}>view</button>
        </p>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  logout: PropTypes.func
};

export default Blog;
