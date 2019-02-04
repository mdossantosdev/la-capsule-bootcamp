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
      isOpenNavBar: false,
      isOpenPopOver: false
    };
  }

  toggleNavBar = () => {
    this.setState({
      isOpenNavBar: !this.state.isOpenNavBar,
    });
  }

  togglePopOver = () => {
    this.setState({
      isOpenPopOver: !this.state.isOpenPopOver,
    });
  }

  render() {
    let movieList = [];

    for (let i = 0; i < 20; i++) {
      movieList.push(<Movie key={i} />);
    };

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
            <NavbarToggler onClick={this.toggleNavBar} />
            <Collapse isOpen={this.state.isOpenNavBar} navbar>
              <Nav className='' navbar>
                <NavItem>
                  <NavLink href='#' style={{ color: '#FFFFFF' }}>
                    Last Releases
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    href='#'
                    style={{ color: '#FFFFFF', marginRight: 10 }}
                  >
                    Favorites
                  </NavLink>
                </NavItem>
                <Button
                  id='Popover1'
                  onClick={this.togglePopOver}
                  color='secondary'
                >
                  11 movies
                </Button>
                <Popover
                  placement='bottom'
                  isOpen={this.state.isOpenPopOver}
                  target='Popover1'
                  toggle={this.togglePopOver}
                >
                  <PopoverHeader>Last Movies</PopoverHeader>
                  <PopoverBody>Last liked</PopoverBody>
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
