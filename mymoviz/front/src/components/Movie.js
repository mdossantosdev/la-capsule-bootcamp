import React from 'react';
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

const Movie = ({image, title, description}) => {

    const styleHeart = {
      color: '#fc6861',
      position: 'absolute',
      top: '5%',
      left: '80%',
      cursor: 'pointer'
    };

    return (
      <Col xs='12' sm='6' md='4' lg='3'>
        <div style={{ marginBottom: 30 }}>
          <Card>
            <CardImg top width='100%' src={image} alt='Movie image' />
            <FontAwesomeIcon size='2x' style={styleHeart} icon={faHeart} />
            <CardBody style={{ height: 250 }}>
              <CardTitle>{title}</CardTitle>
              <CardText>{description}</CardText>
            </CardBody>
          </Card>
        </div>
      </Col>
    );
}

export default Movie;
