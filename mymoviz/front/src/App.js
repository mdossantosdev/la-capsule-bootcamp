import React, { Component } from 'react';
import {
  Container,
  Row,
  Navbar,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  Button,
  Popover,
  PopoverHeader,
  PopoverBody,
} from 'reactstrap';
import './App.css';
import Movie from './components/Movie';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenNavbar: false,
      isOpenPopover: false,
      showLiked: false
    };
  }

  toggleNavbar = () => {
    this.setState({
      isOpenNavbar: !this.state.isOpenNavbar,
    });
  }

  togglePopover = () => {
    this.setState({
      isOpenPopover: !this.state.isOpenPopover,
    });
  }

  toggleMovies = (e) => {
    if (e.target.name === 'favorites') {
      this.setState({
        showLiked: true
      });
    } else {
      this.setState({
        showLiked: false
      });
    }
  }

  render() {
    // Fake database
    const moviesDB = [
      {
        name: 'Life of Pi',
        description:
          "The story of an Indian boy named Pi, a zookeeper's son who finds himself in the company of a hyena, zebra, orangutan, and a Bengal tiger ...",
        image: '/pi.jpg',
      },
      {
        name: 'Maleficent',
        description:
          'A beautiful, pure-hearted young woman, Maleficent has an idyllic life growing up in a peaceable forest kingdom, until one day when an invading army ...',
        image: '/maleficent.jpg',
      },
      {
        name: 'The Adventures of Tintin',
        description:
          'Intrepid young reporter, Tintin, and his loyal dog, Snowy, are thrust into a world of high adventure when they discover a ship carrying an explosive ...',
        image: '/tintin.jpg',
      },
    ];

    const movieList = moviesDB.map((movie, i) => {
      return (
        <Movie
          key={i}
          image={movie.image}
          title={movie.name}
          description={movie.description}
          showLiked={this.state.showLiked}
        />
      );
    });

    const likedMovies = [];

    const likedCount = likedMovies.length;

    let moviesLast = likedMovies.slice(-3);

    if (likedCount === 0) {
      moviesLast = 'No movies selected';
    } else if (likedCount > 3) {
      moviesLast = moviesLast.join(', ') + '...';
    } else {
      moviesLast = moviesLast.join(', ') + '.';
    }

    return (
      <div>
        <div style={{ marginBottom: 90 }}>
          <Navbar dark color='dark' expand='md' fixed='top'>
            <span className='navbar-brand'>
              <img
                src='./logo.png'
                width='30'
                height='30'
                className='d-inline-block align-top'
                alt='Logo My Moviz'
              />
            </span>
            <NavbarToggler onClick={this.toggleNavbar} />
            <Collapse isOpen={this.state.isOpenNavBar} navbar>
              <Nav className='mr-auto' navbar>
                <NavItem>
                  <NavLink
                    href='#'
                    style={{ color: '#ffffff' }}
                    onClick={this.toggleMovies}
                  >
                    Last Releases
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    href='#'
                    style={{ color: '#ffffff', marginRight: 10 }}
                    name='favorites'
                    onClick={this.toggleMovies}
                  >
                    Favorites
                  </NavLink>
                </NavItem>
                <Button
                  id='Popover'
                  color='secondary'
                  onClick={this.togglePopover}
                >
                  {likedCount}
                  {likedCount > 1 ? ' movies' : ' movie'}
                </Button>
                <Popover
                  placement='bottom'
                  isOpen={this.state.isOpenPopover}
                  target='Popover'
                  toggle={this.togglePopover}
                >
                  <PopoverHeader>Last Movies</PopoverHeader>
                  <PopoverBody>{moviesLast}</PopoverBody>
                </Popover>
              </Nav>
            </Collapse>
          </Navbar>
        </div>

        <Container>
          <Row>{movieList}</Row>
        </Container>
      </div>
    );
  }
}

export default App;
