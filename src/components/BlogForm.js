import React, { useState } from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({ notification, addBlog, forceLogout }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [createBlogFormVisible, setCreateBlogFormVisible] = useState(false);

  const hideWhenVisible = { display: createBlogFormVisible ? 'none' : '' };
  const showWhenVisible = { display: createBlogFormVisible ? '' : 'none' };

  const createBlog = async (event) => {
    event.preventDefault();

    try {
      const blogObject = {
        title,
        author,
        url
      };

      await addBlog(blogObject);
      notification(`A new blog '${blogObject.title}' by ${blogObject.author} added`);
      setTitle('');
      setAuthor('');
      setUrl('');
      setCreateBlogFormVisible(false);
    } catch (exception) {
      if (JSON.stringify(exception).includes('401')) {
        forceLogout();
        notification('Session timed out: Log back in to complete operation', true);
      } else if (JSON.stringify(exception).includes('400')) {
        notification('Title and url are required to add new blog', true);
      }
    }
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => setCreateBlogFormVisible(true)}>create new blog</button>
      </div>
      <div style={showWhenVisible}>
        <h2>create new</h2>
        <form onSubmit={createBlog}>
          <div>
            title:
            <input
              id='title'
              type='text'
              value={title}
              name='Title'
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author:
            <input
              id='author'
              type='text'
              value={author}
              name='Author'
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url:
            <input
              id='url'
              type='text'
              value={url}
              name='Url'
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type='submit'>create</button>
        </form>
        <button onClick={() => setCreateBlogFormVisible(false)}>cancel</button>
      </div>
    </div>
  );
};

BlogForm.propTypes = {
  notification: PropTypes.func,
  addBlog: PropTypes.func,
  forceLogout: PropTypes.func
};

export default BlogForm;
