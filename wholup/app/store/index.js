import { createStore, combineReducers } from 'redux';

// Import reducers
import contact from '../reducers/contact';
import user from '../reducers/user';

// Combine reducers
const rootReducer = combineReducers({
  contact,
  user
});

// Create store
const store = createStore(rootReducer);

export default store;
