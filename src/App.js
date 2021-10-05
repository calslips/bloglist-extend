import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
// import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import blogService from './services/blogs';
import { useDispatch } from 'react-redux';

// import { initializeBlogs } from './reducers/blogReducer';
import { setNotice } from './reducers/noticeReducer';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  // const blogs = useSelector((state) => {
  //   return state.blogs;
  // });
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(initializeBlogs());
  // }, []);

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

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser');
    setUser(null);
  };

  const userLogout = () => {
    handleLogout();
    dispatch(setNotice(`${user.name} logged out successfully`, 5, 'success'));
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
            addBlog={addBlog}
            forceLogout={handleLogout}
          />
          {/* <BlogList /> */}
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) =>
              <Blog
                key={blog.id}
                blog={blog}
                updates={updates}
                user={user}
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
