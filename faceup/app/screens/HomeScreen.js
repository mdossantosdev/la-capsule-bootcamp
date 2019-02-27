import React, { Component } from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import { Text, Button, Divider } from 'react-native-elements';
import { connect } from 'react-redux';
import { API_URL } from '../config';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    this.getImages();
  };

  getImages = () => {
    fetch(`${API_URL}/images`)
      .then((res) => {
        return res.json();
      })
      .then((image) => {
        const images = image.data.map((el) => {
          return {
            imageUrl: el.url,
            imageName: el.name,
            imageAge: el.age,
            imageGender: el.gender,
          };
        });

        this.props.handleImages(images);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <ImageBackground
        style={{ flex: 1 }}
        source={require('../assets/background.jpg')}
      >
        <View style={styles.container}>
          <Text h1 style={styles.text}>
            FaceUp
          </Text>
          <Divider style={{ height: 10 }} />
          <Text h3 style={styles.text}>
            Artificial Intelligence
          </Text>
          <Text h3 style={styles.text}>
            at your service
          </Text>
          <Divider style={{ height: 30 }} />
          <Button
            title='Discover now'
            style={{ width: 200 }}
            backgroundColor='#022f40'
            color='#ffffff'
            onPress={() => this.props.navigation.navigate('Camera')}
          />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#ffffff',
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    handleImages: (images) => {
      dispatch({
        type: 'GET_IMAGES',
        images: images,
      });
    },
  };
};

export default connect(
  null,
  mapDispatchToProps
)(HomeScreen);
