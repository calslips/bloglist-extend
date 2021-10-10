import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import blogs from './reducers/blogReducer';
import notification from './reducers/noticeReducer';
import login from './reducers/loginReducer';
import users from './reducers/usersReducer';

const reducer = combineReducers({ blogs, notification, login, users });

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;