import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import blogService from './services/blogs';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(blogs);
    });
  }, []);

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser');
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const establishUser = async (userLoggingIn) => {
    blogService.setToken(userLoggingIn.token);
    setUser(userLoggingIn);
  };

  const noticeContent = ( message, error=false ) => {
    setNotice({ message, error });
    setTimeout(() => {
      setNotice(null);
    }, 5000);
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser');
    setUser(null);
  };

  const userLogout = () => {
    handleLogout();
    noticeContent(`${user.name} logged out successfully`);
  };

  const addBlog = async (newBlog) => {
    const createdBlog = await blogService.create(newBlog);
    setBlogs(blogs.concat(createdBlog));
  };

  const updates = async (blogId, updateObject) => {
    await blogService.update(blogId, updateObject);
    const blogToUpdate = blogs.find((blog) => blog.id === blogId);
    setBlogs(blogs.map((blog) => blog.id === blogId
      ? { ...blogToUpdate, ...updateObject }
      : blog
    ));
  };

  const removeBlog = async (blogId) => {
    await blogService.remove(blogId);
    setBlogs(blogs.filter((blog) => blog.id !== blogId));
  };

  return (
    <div>
      {user === null
        ? <>
          <h2>log in to application</h2>
          <Notification notice={notice} />
          <LoginForm
            notification={noticeContent}
            login={establishUser}
          />
        </>
        : <>
          <h2>blogs</h2>
          <Notification notice={notice} />
          <p>{user.name} logged in <button onClick={userLogout}>logout</button></p>
          <BlogForm
            notification={noticeContent}
            addBlog={addBlog}
            forceLogout={handleLogout}
          />
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) =>
              <Blog
                key={blog.id}
                blog={blog}
                updates={updates}
                user={user}
                notification={noticeContent}
                removeBlog={removeBlog}
                logout={handleLogout}
              />)
          }
        </>
      }
    </div>
  );
};

export default App;
