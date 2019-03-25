import React, { Component } from 'react';
import { connect } from 'react-redux';
import Project from './Project';

class Projects extends Component {
  render() {
    let renderProject = [];

    if (this.props.displayFavorites) {
      const projects = this.props.projects.filter(project => project.favorites === true);
      renderProject = projects.map((project, i) => {
        return <Project key={i} project={project} />
      })
    } else {
      renderProject = this.props.projects.map((project, i) => {
        return <Project key={i} project={project} />
      })
    }

    return (
      <>
        {renderProject}
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    displayFavorites: state.project.displayFavorites
  }
}

export default connect(
  mapStateToProps,
  null
)(Projects);
