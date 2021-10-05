import React from 'react';
import { useSelector } from 'react-redux';
import Blog from './Blog';

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);

  return (
    <div>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) =>
          <Blog
            key={blog.id}
            blog={blog}
            // updates={updates}
            user={blog.user}
            // removeBlog={removeBlog}
            // logout={handleLogout}
          />)
      }
    </div>
  );
};

export default BlogList;