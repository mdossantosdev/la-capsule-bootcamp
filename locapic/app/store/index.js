import { createStore, combineReducers } from 'redux';

// Import reducers
import user from '../reducers/user';

// Combine reducers
const rootReducer = combineReducers({
  user,
});

// Create store
const store = createStore(rootReducer);

export default store;
