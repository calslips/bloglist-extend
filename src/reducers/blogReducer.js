import blogService from '../services/blogs';

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    });
  };
};

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    const createdBlog = await blogService.create(newBlog);
    dispatch({
      type: 'CREATE_BLOG',
      data: createdBlog
    });
  };
};

const blogReducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT_BLOGS':
    return action.data;
  case 'CREATE_BLOG':
    return [...state, action.data];
  default:
    return state;
  }
};

export default blogReducer;