import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import blogService from './services/blogs';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from './reducers/blogReducer';
import { setNotice } from './reducers/noticeReducer';
import { login, maintainLogin, logout } from './reducers/loginReducer';
import store from './store';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  let user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser');
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);
      dispatch(maintainLogin(user));
      blogService.setToken(user.token);
    }
  }, []);

  const setupUser = async () => {
    return store.getState().user;
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await dispatch(login({ username, password }));

      user = await setupUser();

      blogService.setToken(user.token);
      localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      );
      dispatch(setNotice(`${user.name} logged in successfully`, 5, 'success'));
    } catch (exception) {
      dispatch(setNotice('Invalid username or password', 5, 'fail'));
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser');
    dispatch(logout());
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
          <form onSubmit={handleLogin}>
            <div>
              username
              <input
                id='username'
                type='text'
                value={username}
                name='Username'
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              password
              <input
                id='password'
                type='password'
                value={password}
                name='Password'
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button type='submit'>login</button>
          </form>
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
