import React, { Component } from 'react';
import NavBar from './NavBar';
import Jumbotron from './Jumbotron';

export default class Home extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Jumbotron />
      </div>
    )
  }
}
