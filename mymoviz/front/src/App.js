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
import axios from 'axios';
import './App.css';
import Movie from './components/Movie';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenNavbar: false,
      isOpenPopover: false,
      showLiked: false,
      movies: [],
      likedMovies: [],
      likedCount: 0,
      likedTitleList: []
    };
  }

  componentDidMount = () => {
    this.getMovies();
    this.getFavorites();
  }

  getMovies = () => {
    axios.get('/movies')
      .then(response => {
        this.setState({
          movies: response.data.movies
        });
      })
      .catch(error => {
        console.log(error);
      })
  }

  getFavorites = () => {
    axios.get('/favorites')
      .then(response => {
        const likedTitle = response.data.movies.map(movie => {
          return movie.title;
        })

        this.setState({
          likedMovies: response.data.movies,
          likedCount: response.data.movies.length,
          likedTitleList: likedTitle
        })
      })
      .catch(error => {
        console.log(error);
      })
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
        showLiked: true,
      });
    } else {
      this.setState({
        showLiked: false,
      });
    }
  }

  handleClick = (isLike, name) => {
    const movies = [...this.state.likedTitleList];

    if (isLike) {
      movies.push(name);
      this.setState({
        likedCount: this.state.likedCount + 1,
        likedTitleList: movies
      });
    } else {
      const index = movies.indexOf(name);
      movies.splice(index, 1);
      this.setState({
        likedCount: this.state.likedCount - 1,
        likedTitleList: movies
      });
    }
  }

  render() {
    const {
      isOpenNavbar,
      isOpenPopover,
      showLiked,
      movies,
      likedMovies,
      likedCount,
      likedTitleList,
    } = this.state;

    const movieList = movies.map((movie, i) => {
      let isLiked = false;
      for (const liked of likedMovies) {
        if (movie.id === liked.movieId) {
          isLiked = true;
        }
      }

      return (
        <Movie
          key={i}
          image={movie.poster_path}
          title={movie.title}
          description={movie.overview}
          movieId={movie.id}
          showLiked={showLiked}
          isLiked={isLiked}
          onClick={this.handleClick}
        />
      );
    })

    let moviesLast = likedTitleList.slice(-3);

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
            <Collapse isOpen={isOpenNavbar} navbar>
              <Nav className='mr-auto' navbar>
                <NavItem>
                  <NavLink
                    href='#'
                    style={{ color: '#ffffff', marginRight: 10 }}
                    onClick={this.toggleMovies}
                  >
                    Last Releases
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    href='#'
                    style={{ color: '#ffffff', marginRight: 20 }}
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
                  {likedCount > 1
                    ? `${likedCount} movies`
                    : `${likedCount} movie`}
                </Button>
                <Popover
                  placement='bottom'
                  isOpen={isOpenPopover}
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
