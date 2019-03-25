import React, { Component } from 'react';
import {
  Col,
  Row,
  Card,
  Button,
  CardImg,
  CardTitle,
  CardText,
  Badge,
  CardSubtitle,
  CardBody,
  Progress,
} from 'reactstrap';
import { connect } from 'react-redux';
import axios from 'axios';

class Project extends Component {

  addToFavorites = () => {
    const project = {
      id_project: this.props.project.id_project,
      name: this.props.project.name,
      description: this.props.project.desc,
      picture: this.props.project.pic_url,
      stack_front: this.props.project.stack_front,
      stack_back: this.props.project.stack_back,
      days_spent: this.props.project.days_spent,
    };

    axios
      .post('http://localhost:5000/myprojects', project)
      .then((response) => {
        const projectId = response.data.project.id_project;
        this.props.addFavorites(projectId);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    const stackFront = this.props.project.stack_front.map((item, i) => {
      return (
        <Badge
          key={i}
          color='secondary'
          style={styles.badge}
        >
          {item}
        </Badge>
      )
    });

    const stackBack = this.props.project.stack_back.map((item, i) => {
      return (
        <Badge
          key={i}
          color='secondary'
          style={styles.badge}
        >
          {item}
        </Badge>)
    });

    return (
      <Col xs='12' sm='6' md='4' lg='4'>
        <Card style={styles.card}>
          <CardImg
            width='100%'
            src={this.props.project.pic_url}
            alt='Project logo'
            style={styles.img}
          />
          <CardBody>
            <CardTitle style={styles.name}>{this.props.project.name}</CardTitle>
            <CardText style={styles.description}>
              {this.props.project.desc}
            </CardText>

            <CardSubtitle style={styles.stackTitle}>Stack Front</CardSubtitle>
            <div style={styles.badgeContainer}>{stackFront}</div>

            {this.props.project.stack_back.length !== 0 ? (
              <CardSubtitle style={styles.stackTitle}>Stack Back</CardSubtitle>
            ) : null}
            <div style={styles.badgeContainer}>{stackBack}</div>

            <CardText style={styles.days}>
              {this.props.project.days_spent}/5 days spent
            </CardText>
            <Progress
              color='secondary'
              max={5}
              value={this.props.project.days_spent}
              style={styles.progress}
            />

            <Row className='d-flex justify-content-center flex-wrap'>
              {this.props.project.favorites ? (
                <Button
                  color='secondary'
                  style={styles.btn}
                >
                  - Favorite
                </Button>
              ) : (
                <Button
                  outline
                  color='secondary'
                  style={styles.btn}
                  onClick={() => this.addToFavorites()}
                >
                  + Favorite
                </Button>
              )}
            </Row>
          </CardBody>
        </Card>
      </Col>
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
)(Project);

const styles = {
  card: {
    minHeight: '800px',
    marginBottom: '20px',
  },
  img: {
    backgroundColor: 'rgb(255, 103, 93)',
    padding: '100px',
  },
  name: {
    fontSize: '20px',
    fontWeight: '700',
  },
  description: {
    marginBottom: '20px',
  },
  stackTitle: {
    fontWeight: '600',
  },
  badgeContainer: {
    marginBottom: '20px',
  },
  badge: {
    marginRight: 8,
    marginBottom: 5,
  },
  days: {
    fontWeight: '600',
  },
  progress: {
    height: 15,
    width: '100%',
    marginBottom: 10,
  },
  btn: {
    position: 'absolute',
    bottom: '20px',
  },
};
