import React, { Component } from 'react';
import Project from './Project';

export default class Projects extends Component {
  render() {
    const renderProject = this.props.projects.map((project, i) => {
      return (
        <Project key={i} project={project} />
      )
    })

    return (
      <>
        {renderProject}
      </>
    )
  }
}
