import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import NavBar from './NavBar';
import Jumbotron from './Jumbotron';
import Projects from './Projects';

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

        const projectSort = (array, id) => {
          const projects = array.map((project) => {
            if (project.id_project === id) {
              return { ...project, favorites: true }
            } else {
              return project
            }
          });
          this.props.addFavorites(projects)
        }

        favorites.forEach(item => {
          projectSort(this.props.projects, item.id_project)
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
    addFavorites: (projects) => {
      dispatch({
        type: 'ADD_FAVORITES',
        payload: projects
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
