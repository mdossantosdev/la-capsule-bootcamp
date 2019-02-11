import React, { Component } from 'react';
import {
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText
} from 'reactstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLike: false
    };
  }

  componentDidMount = () => {
    this.setState({
      isLike: this.props.isLiked
    })
  }

  handleClick = () => {
    const isLike = !this.state.isLike;
    this.setState({ isLike });

    if (isLike) {
      axios.post('/add-favorites', {
        title: this.props.title,
        overview: this.props.description,
        poster_path: this.props.image,
        movieId: this.props.movieId
      }).catch(error => {
        console.log(error);
      })
    } else {
      axios.delete(`/favorites/${this.props.movieId}`).catch((error) => {
        console.log(error);
      });
    }
    this.props.onClick(isLike, this.props.title);
  }

  render() {
    const { image, title, description, showLiked } = this.props;

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
    if (showLiked && !this.state.isLike) {
      display = 'none';
    }

    return (
      <Col xs='12' sm='6' md='4' lg='3' style={{ display }}>
        <div style={{ marginBottom: 30 }}>
          <Card>
            <CardImg
              top
              width='100%'
              src={`https://image.tmdb.org/t/p/w500/${image}`}
              alt='Movie image'
              style={{ minHeight: 350 }}
            />
            <FontAwesomeIcon
              onClick={this.handleClick}
              size='2x'
              style={styleHeart}
              icon={faHeart}
            />
            <CardBody style={{ minHeight: 200 }}>
              <CardTitle style={{ fontWeight: 700 }}>{title}</CardTitle>
              <CardText style={{ fontSize: 14 }}>{`${description.substr(0, 100)} ...`}</CardText>
            </CardBody>
          </Card>
        </div>
      </Col>
    );
  }
}

export default Movie;
