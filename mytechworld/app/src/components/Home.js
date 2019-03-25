import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import NavBar from './NavBar';
import Jumbotron from './Jumbotron';
import Project from './Project';

class Home extends Component {

  componentDidMount = () => {
    this.getProjects();
  }

  getProjects = () => {
    axios.get('http://localhost:5000/projects')
      .then((response) => {
        this.props.getProjects(response.data.projects);
      })
      .catch((error) => {
        console.log('Request failed', error);
      })
  }

  render() {
    let renderProjects = this.props.projects.map((project, i) => {
      return (
        <Project
          key={i}
          name={project.name}
          description={project.desc}
          picture={project.pic_url}
          stackFront={project.stack_front}
          stackBack={project.stack_back}
          daysSpent={project.days_spent}
        />
      );
    });

    return (
      <div>
        <NavBar />
        <Jumbotron />
        <Container>
          <Row>
            {renderProjects}
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    projects: state.project.projects
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProjects: (projects) => {
      dispatch({
        type: 'GET_PROJECTS',
        payload: projects
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
