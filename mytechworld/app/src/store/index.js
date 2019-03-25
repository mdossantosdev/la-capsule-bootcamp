import { createStore, combineReducers } from 'redux';
import project from '../reducers/project';

const rootReducers = combineReducers({
  project
});

const store = createStore(rootReducers);

export default store;
