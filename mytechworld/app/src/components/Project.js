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
import axios from 'axios';

class Project extends Component {

  addToFavorites = () => {
    const project = {
      id_project: this.props.projectId,
      name: this.props.name,
      description: this.props.description,
      picture: this.props.picture,
      stack_front: this.props.stackFront,
      stack_back: this.props.stackBack,
      days_spent: this.props.daysSpent,
    };

    axios
      .post('http://localhost:5000/myprojects', project)
      .then((response) => {
        console.log(response.data.project);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    const stackFront = this.props.stackFront.map((item, i) => {
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

    const stackBack = this.props.stackBack.map((item, i) => {
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
            src={this.props.picture}
            alt='Project logo'
            style={styles.img}
          />
          <CardBody>
            <CardTitle style={styles.name}>{this.props.name}</CardTitle>
            <CardText style={styles.description}>
              {this.props.description}
            </CardText>

            <CardSubtitle style={styles.stackTitle}>Stack Front</CardSubtitle>
            <div style={styles.badgeContainer}>{stackFront}</div>

            {this.props.stackBack.length !== 0 ? (
              <CardSubtitle style={styles.stackTitle}>Stack Back</CardSubtitle>
            ) : null}
            <div style={styles.badgeContainer}>{stackBack}</div>

            <CardText style={styles.days}>
              {this.props.daysSpent}/5 days spent
            </CardText>
            <Progress
              color='secondary'
              max={5}
              value={this.props.daysSpent}
              style={styles.progress}
            />

            <Row className='d-flex justify-content-center flex-wrap'>
              <Button
                outline
                style={styles.btn}
                onClick={() => this.addToFavorites()}
              >
                + Favorite
              </Button>
            </Row>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default Project;

const styles = {
  card: {
    minHeight: '800px',
    minWidth: '300px',
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
