import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import blogs from './reducers/blogReducer';
import notification from './reducers/noticeReducer';
import user from './reducers/loginReducer';

const reducer = combineReducers({ blogs, notification, user });

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;