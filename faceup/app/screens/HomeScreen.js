import React, { Component } from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import { Text, Button, Divider } from 'react-native-elements';

export default class HomeScreen extends Component {
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
          ></Button>
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
