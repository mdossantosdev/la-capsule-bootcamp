import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import NavBar from './NavBar';
import Jumbotron from './Jumbotron';
import Project from './Project';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
    }
  }

  componentDidMount = () => {
    fetch('http://localhost:5000/projects')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ projects: data.projects });
      })
      .catch((error) => {
        console.log('Request failed', error);
      });
  }

  render() {
    let renderProjects = this.state.projects.map((project, i) => {
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
