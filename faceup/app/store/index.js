import { createStore, combineReducers } from 'redux';

import image from '../reducers/image';

const rootReducer = combineReducers({
  image,
});

const store = createStore(rootReducer);

export default store;
