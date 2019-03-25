import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    return (
      <div style={styles.text}>
        Created after a 10 weeks Bootcamp @La Capsule Academy
      </div>
    );
  }
}

const styles = {
  text: {
    textAlign: 'center',
    color: 'grey',
    marginBottom: '20px'
  },
};
