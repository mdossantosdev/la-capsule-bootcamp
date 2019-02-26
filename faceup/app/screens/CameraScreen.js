import React, { Component } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { Camera, Permissions } from 'expo';
import { API_URL } from '../config';

export default class CameraScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permision: null,
      type: Camera.Constants.Type.back,
    };
  }

  componentDidMount = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    const permision = status === 'granted' ? true : false;
    this.setState({ permision });
  };

  onPictureSaved = async (photo) => {
    const data = new FormData();

    data.append('photo', {
      uri: photo.uri,
      type: 'image/jpeg',
      name: 'image',
    });

    await fetch(`${API_URL}/upload`, {
      method: 'POST',
      body: data,
    }).then((res) => {
      console.log(res);
    });
  };

  render() {
    if (this.state.permision === null) {
      return (
        <View style={styles.container}></View>
      )
    } else if (this.state.permision === false) {
      return (
        <View style={styles.container}>
          <Text>No access to camera</Text>
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1 }}
            type={this.state.type}
            ref={(ref) => {
              this.camera = ref;
            }}
          ></Camera>
          <Button
            title='SNAPSHOT'
            color='#841584'
            onPress={() => {
              if (this.camera) {
                this.camera.takePictureAsync({
                  onPictureSaved: this.onPictureSaved,
                  quality: 0.7,
                  base64: true,
                  exif: true,
                });
              }
            }}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
