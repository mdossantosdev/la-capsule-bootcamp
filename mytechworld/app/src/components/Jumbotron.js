import React, { Component } from 'react';
import { Jumbotron, Container, Button } from 'reactstrap';

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
              <Button color='dark'>Discover my projects</Button>
            </p>
          </Container>
        </Jumbotron>
      </div>
    )
  }
}

export default HeroImage;

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
