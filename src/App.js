import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import blogService from './services/blogs';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from './reducers/blogReducer';
import { setNotice } from './reducers/noticeReducer';

const App = () => {
  const [user, setUser] = useState(null);

  const blogs = useSelector((state) => state.blogs);

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
          <div>
            {blogs
              .sort((a, b) => b.likes - a.likes)
              .map((blog) =>
                <Blog
                  key={blog.id}
                  blog={blog}
                  user={user}
                />
              )}
          </div>
        </>
      }
    </div>
  );
};

export default App;
