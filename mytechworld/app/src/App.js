import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Home from './components/Home';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    )
  }
}
