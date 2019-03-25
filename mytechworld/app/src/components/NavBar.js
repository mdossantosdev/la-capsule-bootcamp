import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    return (
      <div>
        <Navbar color='light' light expand='md'>
          <NavbarBrand href='/' style={styles.brand}>
            My Tech World
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar>
              <NavItem style={{ cursor: 'pointer' }}>
                <NavLink onClick={() => this.props.displayFavorites(false)}>
                  The projects
                </NavLink>
              </NavItem>
              <NavItem style={{ cursor: 'pointer' }}>
                <NavLink onClick={() => this.props.displayFavorites(true)}>
                  TOP 3
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
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
)(NavBar);

const styles = {
  brand: {
    color: 'rgb(255, 103, 93)',
    fontWeight: 700,
  },
};
