import React, { Component } from 'react';
import {
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLike: false
    };
  }

  handleClick = () => {
    this.setState({
      isLike: !this.state.isLike
    });
  }

  render() {
    const { image, title, description } = this.props;

    const styleHeart = {
      color: '#f7f7f7',
      position: 'absolute',
      top: '5%',
      left: '80%',
      cursor: 'pointer',
    };

    if (this.state.isLike) {
      styleHeart.color = '#fc6861';
    }

    let display = null;
    if (this.props.showLiked && !this.state.isLike) {
      display = 'none';
    }

    return (
      <Col xs='12' sm='6' md='4' lg='3' style={{ display }}>
        <div style={{ marginBottom: 30 }}>
          <Card>
            <CardImg top width='100%' src={image} alt='Movie image' />
            <FontAwesomeIcon
              onClick={this.handleClick}
              size='2x'
              style={styleHeart}
              icon={faHeart}
            />
            <CardBody style={{ height: 250 }}>
              <CardTitle>{title}</CardTitle>
              <CardText>{description}</CardText>
            </CardBody>
          </Card>
        </div>
      </Col>
    );
  }
}

export default Movie;
