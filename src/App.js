import React, { useState, useEffect } from 'react';
import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import blogService from './services/blogs';
import { useDispatch } from 'react-redux';
import { initializeBlogs } from './reducers/blogReducer';
import { setNotice } from './reducers/noticeReducer';

const App = () => {
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
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

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser');
    setUser(null);
  };

  const userLogout = () => {
    handleLogout();
    dispatch(setNotice(`${user.name} logged out successfully`, 5, 'success'));
  };

  // const updates = async (blogId, updateObject) => {
  //   await blogService.update(blogId, updateObject);
  //   const blogToUpdate = blogs.find((blog) => blog.id === blogId);
  //   setBlogs(blogs.map((blog) => blog.id === blogId
  //     ? { ...blogToUpdate, ...updateObject }
  //     : blog
  //   ));
  // };

  // const removeBlog = async (blogId) => {
  //   await blogService.remove(blogId);
  //   setBlogs(blogs.filter((blog) => blog.id !== blogId));
  // };

  return (
    <div>
      <Notification />
      {user === null
        ? <>
          <h2>log in to application</h2>
          <LoginForm
            login={establishUser}
          />
        </>
        : <>
          <h2>blogs</h2>
          <p>{user.name} logged in <button onClick={userLogout}>logout</button></p>
          <BlogForm
            forceLogout={handleLogout}
          />
          <BlogList />
        </>
      }
    </div>
  );
};

export default App;
