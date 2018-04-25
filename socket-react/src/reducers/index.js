import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import ChatReducer from './ChatReducer';

// Combine the reducers
const reducers = combineReducers({
  chats: ChatReducer
});

// Create middleware
// Thunk middleware allows to write action creators that return a function instead of an action
const middleware = applyMiddleware(thunk);

// Create the store object
const store = createStore(reducers, middleware);

export default store;