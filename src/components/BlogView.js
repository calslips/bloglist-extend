import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Likes from './Likes';
import BlogDeletion from './BlogDeletion';

const BlogView = ({ forceLogout }) => {
  const id = useParams().id;
  const user = useSelector((state) => state.user);
  const blog = useSelector((state) => state.blogs)
    .find((blog) => blog.id === id);

  if (!(blog && user)) {
    return null;
  }

  return (
    <div>
      <h2>{blog.title} - {blog.author}</h2>
      <a href={`${blog.url}`}>{blog.url}</a>
      <Likes blog={blog} />
      <p>added by {blog.user.name}</p>
      {(user.name === blog.user.name &&
        <BlogDeletion
          blog={blog}
          forceLogout={forceLogout}
        />
      )}
    </div>
  );
};

export default BlogView;