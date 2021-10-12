import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Likes from './Likes';
import BlogDeletion from './BlogDeletion';
import { createComment } from '../reducers/blogReducer';
import { setNotice } from '../reducers/noticeReducer';

const BlogView = ({ forceLogout }) => {
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();
  const id = useParams().id;
  const user = useSelector((state) => state.user);
  const blog = useSelector((state) => state.blogs)
    .find((blog) => blog.id === id);

  if (!(blog && user)) {
    return null;
  }

  const addComment = async (event) => {
    event.preventDefault();

    try {
      await dispatch(createComment(id, { comment }, blog.user));
      setComment('');
    } catch (exception) {
      dispatch(setNotice('Comments need content', 5, 'fail'));
    }
  };

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
      <h3>comments</h3>
      <form onSubmit={addComment}>
        <input
          id='comment'
          value={comment}
          name='Comment'
          onChange={({ target }) => setComment(target.value)}
        />
        <button>add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment, i) =>
          <li key={i}>{comment}</li>
        )}
      </ul>
    </div>
  );
};

export default BlogView;