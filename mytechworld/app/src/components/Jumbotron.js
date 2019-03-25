import React, { Component } from 'react';
import { Jumbotron, Container, Button } from 'reactstrap';
import { connect } from 'react-redux';

class HeroImage extends Component {
  render() {
    return (
      <div>
        <Jumbotron style={styles.hero} fluid>
          <Container fluid>
            <h1 className='display-3' style={{ fontWeight: 600 }}>
              My Tech World
            </h1>
            <p className='lead'>10 weeks to change my life</p>
            <br />
            <p>8 Fullstack projects to learn how to code</p>
            <p className='lead'>
              <Button color='dark' onClick={() => this.props.displayFavorites(true)}>Discover my projects</Button>
            </p>
          </Container>
        </Jumbotron>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    displayFavorites: (isDisplay) => {
      dispatch({
        type: 'DISPLAY_FAVORITES',
        payload: isDisplay
      })
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(HeroImage);

const styles = {
  hero: {
    height: '60vh',
    backgroundColor: 'grey',
    backgroundImage: 'url(./jumbotron.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    textAlign: 'center',
    color: 'rgb(255, 255, 255)',
  },
};
