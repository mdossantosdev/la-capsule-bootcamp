import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import NavBar from './NavBar';
import Jumbotron from './Jumbotron';
import Projects from './Projects';
import Footer from './Footer';

class Home extends Component {
  componentDidMount = () => {
    this.getProjects();
    this.getFavorites();
  };

  getProjects = () => {
    axios
      .get('http://localhost:5000/projects')
      .then((response) => {
        this.props.getProjects(response.data.projects);
      })
      .catch((error) => {
        console.log('Request failed', error);
      });
  };

  getFavorites = () => {
    axios
      .get('http://localhost:5000/myprojects')
      .then((response) => {
        const favorites = response.data.projects;

        favorites.forEach(item => {
          this.props.addFavorites(item.id_project)
        })
      })
      .catch((error) => {
        console.log('Request failed', error);
      })
  };

  render() {
    return (
      <div>
        <NavBar />
        <Jumbotron />
        <Container>
          <Row>
            <Projects projects={this.props.projects} />
          </Row>
        </Container>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    projects: state.project.projects,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProjects: (projects) => {
      dispatch({
        type: 'GET_PROJECTS',
        payload: projects
      })
    },
    addFavorites: (projectId) => {
      dispatch({
        type: 'ADD_FAVORITES',
        payload: projectId
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
