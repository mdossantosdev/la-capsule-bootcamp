import { createStore, combineReducers } from 'redux';

// Import reducers
import contact from '../reducers/contact';

// Combine reducers
const rootReducer = combineReducers({
  contact
});

// Create store
const store = createStore(rootReducer);

export default store;
